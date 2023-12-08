import React, { useEffect, useRef, useState } from 'react';
import { StMap } from '../style/KakaomapStyled';
import { useDispatch, useSelector } from 'react-redux';
import { setPlace } from '../redux/slices/placeSlice';
import defaultMarker from '../assets/marker/defaultMarker.png';
import styled from 'styled-components';

function Kakaomap({
  searchPlace,
  searchBtnToggle,
  entireLocationToggle,
  setEntireLocationToggle,
  currentLocationToggle,
  setCurrentLocationToggle,
  setIsOpneDetailBar,
  isOpenDetailBar
}) {
  const { kakao } = window;

  const dispatch = useDispatch();
  const place = useSelector((state) => state.place.place);

  const mapRef = useRef(null);
  const infowindow = useRef(new kakao.maps.InfoWindow({ zIndex: 1 }));
  const contentNodeRef = useRef(null);
  const ps = new kakao.maps.services.Places(mapRef.current);

  const [latlng, setLatlng] = useState([37.566826, 126.9786567]); //위도 lat , 경도 lng

  // ------useEffect-------

  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(latlng[0], latlng[1]),
      level: 7
    };
    const initialMap = new kakao.maps.Map(container, options);
    mapRef.current = initialMap;

    // 현재 지도 위치
    kakao.maps.event.addListener(initialMap, 'dragend', function () {
      let center = initialMap.getCenter();
      setLatlng([center.getLat(), center.getLng()]);
    });

    // Geolocation API를 이용하여 사용자의 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLatLng = new kakao.maps.LatLng(latitude, longitude);
          initialMap.setCenter(userLatLng);

          let marker = new kakao.maps.Marker({
            map: mapRef.current,
            position: new kakao.maps.LatLng(latitude, longitude)
          });

          infowindow.current.open(mapRef.current, marker);

          infowindow.current.setContent(
            '<div style="font-size:12px; padding:5px">' +
              '현재 여기 근처에 계시네요!'
          );
          kakao.maps.event.addListener(marker, 'mouseover', function () {
            infowindow.current.open(mapRef.current, marker);
          });

          kakao.maps.event.addListener(marker, 'mouseout', function () {
            infowindow.current.close();
          });

          kakao.maps.event.addListener(mapRef.current, 'drag', function () {
            infowindow.current.close();
            marker.setMap(null);
          });

          if (currentLocationToggle === true) {
            if (!searchPlace) return alert('검색어를 입력해주세요!');
            marker.setMap(null);
            infowindow.current.close();
            handleCurrentSearch(searchPlace);
            setCurrentLocationToggle(false);
          } else if (entireLocationToggle === true) {
            if (!searchPlace) return alert('검색어를 입력해주세요!');
            marker.setMap(null);
            infowindow.current.close();
            handleSearch(searchPlace);
            setEntireLocationToggle(false);
          }
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }

    const contentNode = document.createElement('div');
    contentNodeRef.current = contentNode;
    contentNode.className = 'placeinfo_wrap';

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [searchBtnToggle]);

  // ------useEffect-------

  const handleResize = () => {
    const map = mapRef.current;
    if (map) {
      setTimeout(() => {
        kakao.maps.event.trigger(map, 'resize');
      }, 100);
    }
  };

  const handleSearch = (keyword) => {
    const searchOption = {
      category_group_code: 'FD6',
      radius: 10000,
      size: 15
    };

    ps.keywordSearch(keyword, placesSearchCB, searchOption);
  };

  const handleCurrentSearch = (keyword) => {
    const searchOption = {
      category_group_code: 'FD6', //키워드 필터링을 위한 카테고리 코드 / FD6 음식점, CE7 카페
      radius: 10000, // 미터(m) 단위. 기본값은 5000, 0~20000까지 가능
      size: 15, // 기본값은 15, 1~15까지 가능
      // location: currentPosRef.current, // 중심 좌표. 특정 지역을 기준으로 검색한다.
      // sort: kakao.maps.services.SortBy.DISTANCE // 정렬 옵션. DISTANCE 일 경우 지정한 좌표값에 기반하여 동작함. 기본값은 ACCURACY (정확도 순)
      useMapCenter: true,
      location: new kakao.maps.LatLng(latlng[0], latlng[1])
    };

    ps.keywordSearch(keyword, placesSearchCB, searchOption);
  };

  // 여기에 data 배열 추출!

  const placesSearchCB = (data, status) => {
    if (status === kakao.maps.services.Status.OK) {
      let bounds = new kakao.maps.LatLngBounds();
      const newPlaces = [];

      for (let i = 0; i < data.length; i++) {
        displayMarker(data[i]);
        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        newPlaces.push({
          id: data[i].id,
          category_name: data[i].category_name,
          place_name: data[i].place_name,
          address_name: data[i].address_name,
          road_address_name: data[i].road_address_name,
          position: {
            La: new window.kakao.maps.LatLng(data[i].y, data[i].x).La,
            Ma: new window.kakao.maps.LatLng(data[i].y, data[i].x).Ma
          },
          phone: data[i].phone,
          place_url: data[i].place_url
        });
      }
      dispatch(setPlace(newPlaces));
      mapRef.current.setBounds(bounds);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 존재하지 않습니다.');
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert('검색 결과 중 오류가 발생했습니다.');
    }
  };

  const displayMarker = (place) => {
    console.log('place : ', place);
    let marker = new kakao.maps.Marker({
      map: mapRef.current,
      position: new kakao.maps.LatLng(place.y, place.x)
    });

    let content = ` <div  class="placeinfo">   <a class="title" href="${place.place_url}" target="_blank" title="${place.place_name}">${place.place_name}</a>`;

    if (place.road_address_name) {
      content +=
        '    <span title="' +
        place.road_address_name +
        '">' +
        place.road_address_name +
        '</span>' +
        '  <span class="jibun" title="' +
        place.address_name +
        '">(지번 : ' +
        place.address_name +
        ')</span>';
    } else {
      content +=
        '    <span title="' +
        place.address_name +
        '">' +
        place.address_name +
        '</span>';
    }
    content +=
      '    <span class="tel">' +
      place.phone +
      '</span>' +
      '</div>' +
      '<div class="after"></div>';

    const customOverlay = new kakao.maps.CustomOverlay({
      map: mapRef.current,
      clickable: true,
      content,
      position: new kakao.maps.LatLng(place.y, place.x),
      xAnchor: 0.5,
      yAnchor: 1,
      zIndex: 3
    });

    customOverlay.setMap(null);

    kakao.maps.event.addListener(marker, 'click', function () {
      customOverlay.setMap(mapRef.current);
      setIsOpneDetailBar((isOpenDetailBar) => !isOpenDetailBar);

      kakao.maps.event.addListener(mapRef.current, 'click', function () {
        customOverlay.setMap(null);
      });
    });
  };

  // places 데이터 확인
  useEffect(() => {
    // console.log('place : ', place);
  }, [place]);

  useEffect(() => {
    // console.log('latlng : ', latlng[0], latlng[1]);
  }, [latlng]);

  return (
    <StContainer>
      <StMap id="myMap"></StMap>
    </StContainer>
  );
}

export default Kakaomap;

const StContainer = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid blue;

  #myMap {
    width: 100%;
    height: 100vh;
    position: absolute;
    overflow: hidden;
  }

  &,
  & * {
    margin: 0;
    padding: 0;
    font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;
    font-size: 12px;
  }
  & {
    position: relative;
    width: 100%;
    height: 350px;
  }
  #category {
    position: absolute;
    top: 10px;
    left: 10px;
    border-radius: 5px;
    border: 1px solid #909090;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
    background: #fff;
    overflow: hidden;
    z-index: 2;
  }
  #category li {
    float: left;
    list-style: none;
    width: 50px;
    border-right: 1px solid #acacac;
    padding: 6px 0;
    text-align: center;
    cursor: pointer;
  }
  #category li.on {
    background: #eee;
  }
  #category li:hover {
    background: #ffe6e6;
    border-left: 1px solid #acacac;
    margin-left: -1px;
  }
  #category li:last-child {
    margin-right: 0;
    border-right: 0;
  }
  #category li span {
    display: block;
    margin: 0 auto 3px;
    width: 27px;
    height: 28px;
  }
  #category li .category_bg {
    background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png')
      no-repeat;
  }
  #category li .bank {
    background-position: -10px 0;
  }
  #category li .mart {
    background-position: -10px -36px;
  }
  #category li .pharmacy {
    background-position: -10px -72px;
  }
  #category li .oil {
    background-position: -10px -108px;
  }
  #category li .cafe {
    background-position: -10px -144px;
  }
  #category li .store {
    background-position: -10px -180px;
  }
  #category li.on .category_bg {
    background-position-x: -46px;
  }
  .placeinfo_wrap {
    position: absolute;
    bottom: 28px;
    left: -150px;
    width: 300px;
  }
  .placeinfo {
    position: relative;
    width: 100%;
    border-radius: 6px;
    border: 1px solid #ccc;
    border-bottom: 2px solid #ddd;
    padding-bottom: 10px;
    background: #fff;
  }
  .placeinfo:nth-of-type(n) {
    border: 0;
    box-shadow: 0px 1px 2px #888;
  }
  .placeinfo_wrap .after {
    content: '';
    position: relative;
    margin-left: -12px;
    left: 50%;
    width: 22px;
    height: 12px;
    background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png');
  }
  .placeinfo a,
  .placeinfo a:hover,
  .placeinfo a:active {
    color: #fff;
    text-decoration: none;
  }
  .placeinfo a,
  .placeinfo span {
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .placeinfo span {
    margin: 5px 5px 0 5px;
    cursor: default;
    font-size: 13px;
  }
  .placeinfo .title {
    font-weight: bold;
    font-size: 14px;
    border-radius: 6px 6px 0 0;
    margin: -1px -1px 0 -1px;
    padding: 10px;
    color: #fff;
    background: #d95050;
    background: #d95050
      url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png')
      no-repeat right 14px center;
  }
  .placeinfo .tel {
    color: #0f7833;
  }
  .placeinfo .jibun {
    color: #999;
    font-size: 11px;
    margin-top: 0;
  }
`;

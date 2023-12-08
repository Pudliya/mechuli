import React, { useEffect, useRef, useState } from 'react';
import { StMap } from '../style/KakaomapStyled';
import { useDispatch, useSelector } from 'react-redux';
import { setPlace } from '../redux/slices/placeSlice';

function Kakaomap({
  searchPlace,
  searchBtnToggle,
  entireLocationToggle,
  setEntireLocationToggle,
  currentLocationToggle,
  setCurrentLocationToggle
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
            handleCurrentSearch(searchPlace);
            setCurrentLocationToggle(false);
          } else if (entireLocationToggle === true) {
            if (!searchPlace) return alert('검색어를 입력해주세요!');
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
    addEventHandle(contentNode, 'mousedown', kakao.maps.event.preventMap);
    addEventHandle(contentNode, 'touchstart', kakao.maps.event.preventMap);

    infowindow.current.setContent(contentNode);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [searchBtnToggle]);

  // ------useEffect-------

  function addEventHandle(target, type, callback) {
    if (target.addEventListener) {
      target.addEventListener(type, callback);
    } else {
      target.attachEvent('on' + type, callback);
    }
  }

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
        // =======================
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
    let marker = new kakao.maps.Marker({
      map: mapRef.current,
      position: new kakao.maps.LatLng(place.y, place.x)
    });

    kakao.maps.event.addListener(marker, 'click', function () {
      infowindow.current.setContent(
        '<div style="font-size:12px; padding:5px">' +
          place.place_name +
          '<br/>' +
          place.address_name +
          '</div>'
      );

      kakao.maps.event.addListener(mapRef.current, 'click', function () {
        infowindow.current.close();
      });

      infowindow.current.open(mapRef.current, marker);
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
    <>
      <StMap id="myMap"></StMap>
    </>
  );
}

export default Kakaomap;

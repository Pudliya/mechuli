import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setmarkerId } from '../../redux/slices/markerSlice';
import { setPlace } from '../../redux/slices/placeSlice';
import { StMap } from '../../style/KakaomapStyled';
import { setLatlng } from '../../redux/slices/locationSlice';
import {
  setCurrentLocationToggle,
  setEntireLocationToggle
} from '../../redux/slices/searchSlice';
import defaultMarker from '../../assets/marker/defaultMarker.png';
import mechuliMarker from '../../assets/marker/mechuliMarker.png';
import { StContainer } from '../../style/LayoutStyled';
import {
  listToggleOpen,
  toggleOpen
} from '../../redux/slices/ListDetailBarSlice';

function Kakaomap({ setIsOpneDetailBar, isOpenDetailBar }) {
  const { kakao } = window;

  const dispatch = useDispatch();
  const place = useSelector((state) => state.place.place);
  const searchPlace = useSelector((state) => state.search.searchPlace);
  const searchBtnToggle = useSelector((state) => state.search.searchBtnToggle);
  const entireLocationToggle = useSelector(
    (state) => state.search.entireLocationToggle
  );
  const currentLocationToggle = useSelector(
    (state) => state.search.currentLocationToggle
  );
  const listToggle = useSelector((state) => state.listDetail.listToggle);
  const latlng = useSelector((state) => state.location.latlng);
  const mapRef = useRef(null);
  const ps = new kakao.maps.services.Places(mapRef.current);

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
      dispatch(setLatlng([center.getLat(), center.getLng()]));
    });

    // Geolocation API를 이용하여 사용자의 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLatLng = new kakao.maps.LatLng(latitude, longitude);
          initialMap.setCenter(userLatLng);

          const imageSrc = mechuliMarker;
          const imageSize = new kakao.maps.Size(55, 55);
          const imageOption = { offset: new kakao.maps.Point(19, 30) };

          const markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption
          );

          let marker = new kakao.maps.Marker({
            map: mapRef.current,
            position: new kakao.maps.LatLng(latitude, longitude),
            zIndex: 4,
            image: markerImage
          });

          let content = `<div class="placeinfo current">현재 여기 근처에 계시네요</div>`;

          const customOverlay = new kakao.maps.CustomOverlay({
            map: mapRef.current,
            clickable: true,
            content,
            position: new kakao.maps.LatLng(latitude, longitude),
            xAnchor: 0.5,
            yAnchor: 1.9,
            zIndex: 3
          });

          // 마커 위 커스텀오버레이 기능 : mouseover and mouseout
          // kakao.maps.event.addListener(marker, 'mouseover', function () {
          //   customOverlay.setMap(mapRef.current);
          // });

          // kakao.maps.event.addListener(marker, 'mouseout', function () {
          //   customOverlay.setMap(null);
          // });

          kakao.maps.event.addListener(mapRef.current, 'drag', function () {
            marker.setMap(null);
            customOverlay.setMap(null);
          });

          if (currentLocationToggle === true) {
            if (!searchPlace) return alert('검색어를 입력해주세요!');
            marker.setMap(null);
            customOverlay.setMap(null);
            handleCurrentSearch(searchPlace);
            dispatch(setCurrentLocationToggle(false));
          } else if (entireLocationToggle === true) {
            if (!searchPlace) return alert('검색어를 입력해주세요!');
            marker.setMap(null);
            customOverlay.setMap(null);
            handleSearch(searchPlace);
            dispatch(setEntireLocationToggle(false));
          }
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }

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

  let currentOverlay = null; // 현재 열린 오버레이를 저장할 변수

  const displayMarker = (place) => {
    const imageSrc = defaultMarker;
    const imageSize = new kakao.maps.Size(40, 40);
    const imageOption = { offset: new kakao.maps.Point(19, 39) };

    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    let marker = new kakao.maps.Marker({
      map: mapRef.current,
      position: new kakao.maps.LatLng(place.y, place.x),
      image: markerImage,
      zIndex: 3
    });

    let content = ` <div  class="placeinfo">   <a class="title" href="${place.place_url}" target="_blank" title="${place.place_name}">${place.place_name}</a>`;

    if (place.road_address_name) {
      content += `<span title="${place.road_address_name}"></span>
       <span class="jibun" title=" ${place.address_name}">(지번 : ${place.address_name} )</span>`;
    } else {
      content += `<span title=" ${place.address_name} ">
      ${place.address_name} </span>`;
    }
    content += `  <span class="tel">
    ${place.phone} </span></div><div class="after"></div>`;

    const customOverlay = new kakao.maps.CustomOverlay({
      map: mapRef.current,
      clickable: true,
      content,
      position: new kakao.maps.LatLng(place.y, place.x),
      xAnchor: 0.5,
      yAnchor: 1.65,
      zIndex: 3
    });

    customOverlay.setMap(null); // 초기에는 오버레이를 닫아둠

    kakao.maps.event.addListener(marker, 'click', function () {
      dispatch(setmarkerId(place.id));

      // 클릭한 마커에 대한 오버레이 표시 및 상태 업데이트
      if (currentOverlay) {
        currentOverlay.setMap(null); // 이전 오버레이 닫기
      }
      customOverlay.setMap(mapRef.current);
      dispatch(toggleOpen(true));
      console.log('listToggle : ', listToggle);
      if (listToggle === true) {
        dispatch(listToggleOpen(false));
      }

      currentOverlay = customOverlay;

      kakao.maps.event.addListener(mapRef.current, 'click', function () {
        customOverlay.setMap(null); // 지도 클릭 시 오버레이 닫기
        currentOverlay = null; // 현재 오버레이 초기화
      });
    });
  };

  return (
    <StContainer>
      <StMap id="myMap"></StMap>
    </StContainer>
  );
}

export default Kakaomap;

import React, { useEffect, useRef, useState } from 'react';
import { StMap } from '../../style/KakaomapStyled';
import styled from 'styled-components';

// 최광희 Geolocation API를 사용하기 Start---------------------

function Kakaomap({ searchPlace }) {
  const { kakao } = window;
  const mapRef = useRef(null);
  const currentPosRef = useRef(null);
  const infowindow = useRef(new kakao.maps.InfoWindow({ zIndex: 1 }));
  const ps = new kakao.maps.services.Places(mapRef.current);
  const [places, setPlaces] = useState([]);

  // ------useEffect-------

  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(37.5575, 126.9248),
      level: 5
    };
    const map = new kakao.maps.Map(container, options);
    mapRef.current = map;

    // Geolocation API를 이용하여 사용자의 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLatLng = new kakao.maps.LatLng(latitude, longitude);
          map.setCenter(userLatLng);
          handleSearch(searchPlace);
        },
        (error) => {
          console.error('Error getting user location:', error);
          handleSearch(searchPlace);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      handleSearch(searchPlace);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [searchPlace]);

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
      category_group_code: 'FD6', //키워드 필터링을 위한 카테고리 코드 / FD6 음식점, CE7 카페
      radius: 3000, // 미터(m) 단위. 기본값은 5000, 0~20000까지 가능
      size: 15 // 기본값은 15, 1~15까지 가능
      // location: currentPosRef.current, // 중심 좌표. 특정 지역을 기준으로 검색한다.
      // sort: kakao.maps.services.SortBy.DISTANCE // 정렬 옵션. DISTANCE 일 경우 지정한 좌표값에 기반하여 동작함. 기본값은 ACCURACY (정확도 순)
      // useMapCenter: true
    };

    ps.keywordSearch(keyword, placesSearchCB, searchOption);
  };

  // 여기에 data 배열 추출!
  const placesSearchCB = (data, status, pagination) => {
    // console.log('data : ', data);

    if (status === kakao.maps.services.Status.OK) {
      let bounds = new kakao.maps.LatLngBounds();
      const newPlaces = [];

      for (let i = 0; i < data.length; i++) {
        displayMarker(data[i]);
        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        newPlaces.push({
          id: data[i].id,
          place_name: data[i].place_name,
          address_name: data[i].address_name,
          road_address_name: data[i].road_address_name,
          position: new window.kakao.maps.LatLng(data[i].y, data[i].x),
          phone: data[i].phone,
          place_url: data[i].place_url
        });
      }
      setPlaces(newPlaces);
      mapRef.current.setBounds(bounds);
      mapRef.current.setLevel(4, {
        animate: {
          duration: 1000
        }
      });
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 존재하지 않습니다.');
      return;
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert('검색 결과 중 오류가 발생했습니다.');
      return;
    }
  };

  const displayMarker = (place) => {
    let marker = new kakao.maps.Marker({
      map: mapRef.current,
      position: new kakao.maps.LatLng(place.y, place.x)
    });

    // infowindow
    //   kakao.maps.event.addListener(marker, 'click', function () {
    //     console.log('place.address_name : ', place.address_name);
    //     infowindow.current.setContent(
    //       '<div style="font-size:12px; padding:5px">' +
    //         place.place_name +
    //         '<br/>' +
    //         place.address_name +
    //         '</div>'
    //     );
    //     infowindow.current.open(mapRef.current, marker);
    //   });

    // customOverlay
    const content =
      '<div class="wrap">' +
      '    <div class="info">' +
      '        <div class="title">' +
      '            서울역' +
      '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' +
      '        </div>' +
      '        <div class="body">' +
      '            <div class="img">' +
      '                <img src="https://cfile181.uf.daum.net/image/250649365602043421936D" width="73" height="70">' +
      '           </div>' +
      '            <div class="desc">' +
      '                <div class="ellipsis">서울특별시 용산구 동자동 43-205</div>' +
      '                <div class="jibun ellipsis"> 서울역은 서울특별시 용산구와 중구에 </div>' +
      '                <div class="jibun ellipsis"> 위치한 민자역사 철도역이다. </div>' +
      '            </div>' +
      '        </div>' +
      '    </div>' +
      '</div>';

    // 마커 위에 커스텀오버레이를 표시합니다
    // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
    var overlay = new kakao.maps.CustomOverlay({
      content: content,
      map: mapRef.current,
      position: marker.getPosition()
    });

    // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
    kakao.maps.event.addListener(marker, 'click', function () {
      overlay.setMap(mapRef.current);
    });

    // 맵을 클릭했을 때 커스텀 오버레이를 닫습니다.
    kakao.maps.event.addListener(mapRef.current, 'click', function () {
      overlay.setMap(null);
    });
  };

  // places 데이터 확인
  useEffect(() => {
    console.log('places : ', places);
  }, [places]);

  return (
    <>
      <StMap id="myMap"></StMap>
    </>
  );
}

export default Kakaomap;

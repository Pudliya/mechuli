import React, { useEffect, useRef, useState } from 'react';
import { StMap } from '../../style/KakaomapStyled';

function Kakaomap({ searchPlace }) {
  const { kakao } = window;

  const mapRef = useRef(null);
  const infowindow = useRef(new kakao.maps.InfoWindow({ zIndex: 1 }));
  const ps = new kakao.maps.services.Places(mapRef.current);

  const [places, setPlaces] = useState([]); // placesSearch data
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
      var latlng = initialMap.getCenter();
      setLatlng([latlng.getLat(), latlng.getLng()]);
    });

    // Geolocation API를 이용하여 사용자의 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLatLng = new kakao.maps.LatLng(latitude, longitude);
          initialMap.setCenter(userLatLng);
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
  }, [latlng]);

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
      radius: 5000, // 미터(m) 단위. 기본값은 5000, 0~20000까지 가능
      size: 15, // 기본값은 15, 1~15까지 가능
      // location: currentPosRef.current, // 중심 좌표. 특정 지역을 기준으로 검색한다.
      // sort: kakao.maps.services.SortBy.DISTANCE // 정렬 옵션. DISTANCE 일 경우 지정한 좌표값에 기반하여 동작함. 기본값은 ACCURACY (정확도 순)
      // useMapCenter: true
      location: new kakao.maps.LatLng(latlng[0], latlng[1])
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
      mapRef.current.setLevel(5, {
        animate: {
          duration: 0
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

    kakao.maps.event.addListener(marker, 'click', function () {
      infowindow.current.setContent(
        '<div style="font-size:12px; padding:5px">' +
          place.place_name +
          '<br/>' +
          place.address_name +
          '</div>'
      );
      infowindow.current.open(mapRef.current, marker);
    });
  };

  // places 데이터 확인
  useEffect(() => {
    console.log('places : ', places);
  }, [places]);

  useEffect(() => {
    console.log('latlng : ', latlng[0], latlng[1]);
  }, [latlng]);

  return (
    <>
      <StMap id="myMap"></StMap>
    </>
  );
}

export default Kakaomap;

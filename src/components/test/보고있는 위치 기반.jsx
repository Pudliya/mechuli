import React, { useEffect, useRef } from 'react';
import { StMap } from '../../style/KakaomapStyled';

// 최광희 Geolocation API를 사용하기 Start---------------------

function Kakaomap({ searchPlace }) {
  const { kakao } = window;
  const mapRef = useRef(null);
  const currentPosRef = useRef(null);
  const infowindow = useRef(new kakao.maps.InfoWindow({ zIndex: 1 }));

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

  const handleResize = () => {
    const map = mapRef.current;
    if (map) {
      setTimeout(() => {
        kakao.maps.event.trigger(map, 'resize');
      }, 100);
    }
  };

  // ------useEffect-------

  const getCurrentPosBtn = () => {
    const map = mapRef.current;
    navigator.geolocation.getCurrentPosition(
      locationLoadSuccess,
      locationLoadError
    );

    function locationLoadSuccess(pos) {
      // 현재 위치 받아오기
      var currentPos = new kakao.maps.LatLng(
        pos.coords.latitude,
        pos.coords.longitude
      );
      currentPosRef.current = currentPos;
      console.log(currentPos);

      // 마커 생성
      var marker = new kakao.maps.Marker({
        position: currentPos
      });

      // 기존에 마커가 있다면 제거
      marker.setMap(null);
      marker.setMap(map);
    }

    function locationLoadError(pos) {
      alert('위치 정보를 가져오는데 실패했습니다.');
    }
  };

  const handleSearch = (keyword) => {
    const ps = new kakao.maps.services.Places(mapRef.current);
    // ---
    // let coords;
    // let currentPos;

    // const geocoder = new kakao.maps.services.Geocoder();
    // geocoder.addressSearch(keyword, function (result, status) {
    //   if (status === kakao.maps.services.Status.OK) {
    //     coords = new kakao.maps.LatLng(result[0].y, result[0].x);
    //     currentPos = coords;
    //   }
    // });

    const searchOption = {
      location: currentPosRef.current, //currentPos
      radius: 3000,
      size: 15
    };
    // ---

    ps.keywordSearch(keyword, placesSearchCB, searchOption);
  };

  // 여기에 data 배열 추출!
  const placesSearchCB = (data, status, pagination) => {
    console.log('data : ', data);

    if (status === kakao.maps.services.Status.OK) {
      let bounds = new kakao.maps.LatLngBounds();
      for (let i = 0; i < data.length; i++) {
        displayMarker(data[i]);
        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
      }
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

    kakao.maps.event.addListener(marker, 'click', function () {
      infowindow.current.setContent(
        '<div style="padding:5px;font-size:12px;">' +
          place.place_name +
          '</div>'
      );
      infowindow.current.open(mapRef.current, marker);
    });
  };

  return (
    <>
      <button onClick={getCurrentPosBtn}>현재위치</button>
      <StMap id="myMap"></StMap>
    </>
  );
}

// 최광희 Geolocation API를 사용하기---------------------

// -------------------------------테스트중---------------------------------------------
// useEffect(() => {
//   var mapContainer = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
//   var mapOption = {
//     //지도를 생성할 때 필요한 기본 옵션
//     // center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
//     center: new kakao.maps.LatLng(37.5575, 126.9248), //지도의 중심좌표. // 홍대입구역
//     level: 3 //지도의 레벨(확대, 축소 정도)
//   };

//   // 지도를 생성합니다
//   var map = new kakao.maps.Map(mapContainer, mapOption); //지도 생성 및 객체 리턴

//   // 마커를 담을 배열입니다
//   var markers = [];

//   var mapContainer = document.getElementById('map'), // 지도를 표시할 div
//     mapOption = {
//       center: new kakao.maps.LatLng(37.5575, 126.9248), // 지도의 중심좌표
//       level: 3 // 지도의 확대 레벨
//     };

//   // 마커가 표시될 위치입니다
//   var markerPosition = new kakao.maps.LatLng(37.5575, 126.9248);

//   // 마커를 생성합니다
//   var marker = new kakao.maps.Marker({
//     position: markerPosition
//   });

//   // 마커가 지도 위에 표시되도록 설정합니다
//   marker.setMap(map);

//   // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
//   // marker.setMap(null);
// }, []);

// // ------------------------------------------------------------------------------------------

//   // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
//   var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

// // 키워드로 장소를 검색합니다
// searchPlaces();

// // 키워드 검색을 요청하는 함수입니다
// function searchPlaces() {
//   var keyword = document.getElementById('keyword').value;

//   if (!keyword.replace(/^\s+|\s+$/g, '')) {
//     alert('키워드를 입력해주세요!');
//     return false;
//   }

//   // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
//   ps.keywordSearch(keyword, placesSearchCB);
// }

// // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
// function placesSearchCB(data, status, pagination) {
//   if (status === kakao.maps.services.Status.OK) {
//     // 정상적으로 검색이 완료됐으면
//     // 검색 목록과 마커를 표출합니다
//     displayPlaces(data);

//     // 페이지 번호를 표출합니다
//     displayPagination(pagination);
//   } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
//     alert('검색 결과가 존재하지 않습니다.');
//     return;
//   } else if (status === kakao.maps.services.Status.ERROR) {
//     alert('검색 결과 중 오류가 발생했습니다.');
//     return;
//   }
// }

// // 검색 결과 목록과 마커를 표출하는 함수입니다
// function displayPlaces(places) {
//   var listEl = document.getElementById('placesList'),
//     menuEl = document.getElementById('menu_wrap'),
//     fragment = document.createDocumentFragment(),
//     bounds = new kakao.maps.LatLngBounds(),
//     listStr = '';

//   // 검색 결과 목록에 추가된 항목들을 제거합니다
//   removeAllChildNods(listEl);

//   // 지도에 표시되고 있는 마커를 제거합니다
//   removeMarker();

//   for (var i = 0; i < places.length; i++) {
//     // 마커를 생성하고 지도에 표시합니다
//     var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
//       marker = addMarker(placePosition, i),
//       itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

//     // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
//     // LatLngBounds 객체에 좌표를 추가합니다
//     bounds.extend(placePosition);

//     // 마커와 검색결과 항목에 mouseover 했을때
//     // 해당 장소에 인포윈도우에 장소명을 표시합니다
//     // mouseout 했을 때는 인포윈도우를 닫습니다
//     (function (marker, title) {
//       kakao.maps.event.addListener(marker, 'mouseover', function () {
//         displayInfowindow(marker, title);
//       });

//       kakao.maps.event.addListener(marker, 'mouseout', function () {
//         infowindow.close();
//       });

//       itemEl.onmouseover = function () {
//         displayInfowindow(marker, title);
//       };

//       itemEl.onmouseout = function () {
//         infowindow.close();
//       };
//     })(marker, places[i].place_name);

//     fragment.appendChild(itemEl);
//   }

//   // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
//   listEl.appendChild(fragment);
//   menuEl.scrollTop = 0;

//   // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
//   map.setBounds(bounds);
// }

// // 검색결과 항목을 Element로 반환하는 함수입니다
// function getListItem(index, places) {
//   var el = document.createElement('li'),
//     itemStr =
//       '<span class="markerbg marker_' +
//       (index + 1) +
//       '"></span>' +
//       '<div class="info">' +
//       '   <h5>' +
//       places.place_name +
//       '</h5>';

//   if (places.road_address_name) {
//     itemStr +=
//       '    <span>' +
//       places.road_address_name +
//       '</span>' +
//       '   <span class="jibun gray">' +
//       places.address_name +
//       '</span>';
//   } else {
//     itemStr += '    <span>' + places.address_name + '</span>';
//   }

//   itemStr += '  <span class="tel">' + places.phone + '</span>' + '</div>';

//   el.innerHTML = itemStr;
//   el.className = 'item';

//   return el;
// }

// // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
// function addMarker(position, idx, title) {
//   var imageSrc =
//       'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
//     imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
//     imgOptions = {
//       spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
//       spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
//       offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
//     },
//     markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
//     marker = new kakao.maps.Marker({
//       position: position, // 마커의 위치
//       image: markerImage
//     });

//   marker.setMap(map); // 지도 위에 마커를 표출합니다
//   markers.push(marker); // 배열에 생성된 마커를 추가합니다

//   return marker;
// }

// // 지도 위에 표시되고 있는 마커를 모두 제거합니다
// function removeMarker() {
//   for (var i = 0; i < markers.length; i++) {
//     markers[i].setMap(null);
//   }
//   markers = [];
// }

// // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
// function displayPagination(pagination) {
//   var paginationEl = document.getElementById('pagination'),
//     fragment = document.createDocumentFragment(),
//     i;

//   // 기존에 추가된 페이지번호를 삭제합니다
//   while (paginationEl.hasChildNodes()) {
//     paginationEl.removeChild(paginationEl.lastChild);
//   }

//   for (i = 1; i <= pagination.last; i++) {
//     var el = document.createElement('a');
//     el.href = '#';
//     el.innerHTML = i;

//     if (i === pagination.current) {
//       el.className = 'on';
//     } else {
//       el.onclick = (function (i) {
//         return function () {
//           pagination.gotoPage(i);
//         };
//       })(i);
//     }

//     fragment.appendChild(el);
//   }
//   paginationEl.appendChild(fragment);
// }

// // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// // 인포윈도우에 장소명을 표시합니다
// function displayInfowindow(marker, title) {
//   var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

//   infowindow.setContent(content);
//   infowindow.open(map, marker);
// }

// // 검색결과 목록의 자식 Element를 제거하는 함수입니다
// function removeAllChildNods(el) {
//   while (el.hasChildNodes()) {
//     el.removeChild(el.lastChild);
//   }
// }
// }
// ------------------------------------테스트중------------------------------------------------------

export default Kakaomap;

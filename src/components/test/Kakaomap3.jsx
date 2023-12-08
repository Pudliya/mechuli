import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

function Kakaomap() {
  const { kakao } = window;

  let mapRef = useRef(null);
  let contentNodeRef = useRef(null);
  let currCategoryRef = useRef(null);
  let infowindow = new kakao.maps.CustomOverlay({ zIndex: 1 });
  let ps = new kakao.maps.services.Places(mapRef.current);

  const [latlng, setLatlng] = useState([37.566826, 126.9786567]); //위도 lat , 경도 lng

  let markers = [];

  // ------useEffect-------

  useEffect(() => {
    const contentNode = document.createElement('div');
    contentNodeRef.current = contentNode;

    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new kakao.maps.LatLng(latlng[0], latlng[1]),
      level: 7
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);
    mapRef.current = map;
    kakao.maps.event.addListener(mapRef.current, 'idle', searchPlaces);

    // 현재 지도 위치
    kakao.maps.event.addListener(map, 'dragend', function () {
      var latlng = map.getCenter();
      setLatlng([latlng.getLat(), latlng.getLng()]);
    });

    contentNode.className = 'placeinfo_wrap';
    addEventHandle(contentNode, 'mousedown', kakao.maps.event.preventMap);
    addEventHandle(contentNode, 'touchstart', kakao.maps.event.preventMap);

    infowindow.setContent(contentNode);
    addCategoryClickEvent();
    console.log(latlng);
  }, [latlng]);

  // ------useEffect-------

  function addEventHandle(target, type, callback) {
    if (target.addEventListener) {
      target.addEventListener(type, callback);
    } else {
      target.attachEvent('on' + type, callback);
    }
  }

  function addCategoryClickEvent() {
    var category = document.getElementById('category'),
      children = category.children;

    for (var i = 0; i < children.length; i++) {
      children[i].onclick = onClickCategory;
    }
  }

  function onClickCategory() {
    var id = this.id,
      className = this.className;

    infowindow.setMap(null);

    if (className === 'on') {
      currCategoryRef.current = '';
      changeCategoryClass();
      removeMarker();
    } else {
      currCategoryRef.current = id;
      changeCategoryClass(this);
      searchPlaces();
    }
  }

  function changeCategoryClass(el) {
    var category = document.getElementById('category'),
      children = category.children,
      i;

    for (i = 0; i < children.length; i++) {
      children[i].className = '';
    }

    if (el) {
      el.className = 'on';
    }
  }

  function removeMarker() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
  }

  function searchPlaces() {
    if (!currCategoryRef.current) {
      return;
    }
    infowindow.setMap(null);
    removeMarker();

    ps.categorySearch(currCategoryRef.current, placesSearchCB, {
      useMapBounds: true
    });
  }

  function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
      displayPlaces(data);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
    } else if (status === kakao.maps.services.Status.ERROR) {
    }
  }

  function displayPlaces(places) {
    var order = document
      .getElementById(currCategoryRef.current)
      .getAttribute('data-order');

    for (var i = 0; i < places.length; i++) {
      var marker = addMarker(
        new kakao.maps.LatLng(places[i].y, places[i].x),
        order
      );

      (function (marker, place) {
        kakao.maps.event.addListener(marker, 'click', function () {
          displayPlaceInfo(place);
        });
      })(marker, places[i]);
    }
  }

  function addMarker(position, order) {
    var imageSrc =
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
      imageSize = new kakao.maps.Size(27, 28), // 마커 이미지의 크기
      imgOptions = {
        spriteSize: new kakao.maps.Size(72, 208), // 스프라이트 이미지의 크기
        spriteOrigin: new kakao.maps.Point(46, order * 36), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
        offset: new kakao.maps.Point(11, 28) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
      },
      markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
      marker = new kakao.maps.Marker({
        position: position, // 마커의 위치
        image: markerImage
      });

    marker.setMap(mapRef.current); // 지도 위에 마커를 표출합니다
    markers.push(marker); // 배열에 생성된 마커를 추가합니다

    return marker;
  }

  function displayPlaceInfo(place) {
    var content =
      '<div class="placeinfo">' +
      '   <a class="title" href="' +
      place.place_url +
      '" target="_blank" title="' +
      place.place_name +
      '">' +
      place.place_name +
      '</a>';

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

    contentNodeRef.current.innerHTML = content;
    infowindow.setPosition(new kakao.maps.LatLng(place.y, place.x));
    infowindow.setMap(mapRef.current);
  }

  return (
    <StContainer>
      <div className="map_wrap">
        <div id="map"></div>
        <div>
          <ul id="category">
            <li id="BK9" data-order="0">
              <span className="category_bg bank"></span>
              은행
            </li>
            <li id="MT1" data-order="1">
              <span className="category_bg mart"></span>
              마트
            </li>
            <li id="PM9" data-order="2">
              <span className="category_bg pharmacy"></span>
              약국
            </li>
            <li id="OL7" data-order="3">
              <span className="category_bg oil"></span>
              주유소
            </li>
            <li id="CE7" data-order="4">
              <span className="category_bg cafe"></span>
              카페
            </li>
            <li id="CS2" data-order="5">
              <span className="category_bg store"></span>
              편의점
            </li>
          </ul>
        </div>
      </div>
    </StContainer>
  );
}

export default Kakaomap;

const StContainer = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid blue;

  #map {
    width: 100%;
    height: 100vh;
    position: absolute;
    overflow: hidden;
  }

  .map_wrap,
  .map_wrap * {
    margin: 0;
    padding: 0;
    font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;
    font-size: 12px;
  }
  .map_wrap {
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

// const StMap2 = styled.div`
//   position: relative;
//   width: 100%;
//   height: 100%;
//   background-color: transparent;
// `;

// const StCategoryUl = styled.ul``;

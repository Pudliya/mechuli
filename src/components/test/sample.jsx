import React, { useEffect, useState } from 'react';

const App = () => {
  const [keyword, setKeyword] = useState('');
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [places, setPlaces] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src =
      '//dapi.kakao.com/v2/maps/sdk.js?appkey=88ac229e7abd107e56c0799e195683f1';
    document.head.appendChild(script);

    script.onload = () => {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3
      };

      const initialMap = new window.kakao.maps.Map(container, options);
      setMap(initialMap);
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const searchPlaces = () => {
    if (map && keyword) {
      markers.forEach((marker) => marker.setMap(null));

      const ps = new window.kakao.maps.services.Places();
      ps.keywordSearch(keyword, placesSearchCB);
    }
  };

  const placesSearchCB = (data, status, pagination) => {
    if (status === window.kakao.maps.services.Status.OK && map) {
      const bounds = new window.kakao.maps.LatLngBounds();
      const newMarkers = [];
      const newPlaces = [];

      for (let i = 0; i < data.length; i++) {
        const marker = displayMarker(data[i]);
        bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        newMarkers.push(marker);
        newPlaces.push({
          place_name: data[i].place_name,
          address_name: data[i].address_name,
          road_address_name: data[i].road_address_name,
          position: new window.kakao.maps.LatLng(data[i].y, data[i].x)
        });
      }

      setMarkers(newMarkers);
      map.setBounds(bounds);
      setPlaces(newPlaces);
      setSearchResults(newPlaces);
    }
  };

  const displayMarker = (place) => {
    if (map) {
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(place.y, place.x)
      });

      window.kakao.maps.event.addListener(marker, 'click', function () {
        searchDetailAddrFromCoords(
          marker.getPosition(),
          function (result, status) {
            if (status === window.kakao.maps.services.Status.OK) {
              const detailAddr = !!result[0].road_address
                ? result[0].road_address.address_name
                : result[0].address.address_name;

              const infowindow = new window.kakao.maps.InfoWindow({
                content:
                  '<div style="padding:5px;font-size:12px;">' +
                  place.place_name +
                  '<br/>' +
                  detailAddr +
                  '</div>'
              });

              infowindow.open(map, marker);
            }
          }
        );
      });

      return marker;
    }
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchPlaces();
      setKeyword('');
    }
  };

  const handlePlaceItemClick = (place) => {
    const center = new window.kakao.maps.LatLng(place.y, place.x);
    map.panTo(center);
  };

  const searchDetailAddrFromCoords = (coords, callback) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div>
          <input
            type="text"
            placeholder="검색어를 입력하세요."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={handleEnterKeyPress}
          />
          <button onClick={searchPlaces}>검색</button>
          <div>
            {searchResults.map((result, index) => (
              <div key={index}>
                <p>
                  {result.place_name} - {result.address_name}
                </p>
                <p>도로명 주소: {result.road_address_name}</p>
              </div>
            ))}
          </div>
        </div>
        <div
          id="map"
          style={{ width: '500px', height: '400px', marginLeft: '20px' }}
        />
      </div>
    </div>
  );
};

export default App;

import styled from 'styled-components';

export const StMap = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: transparent;

  * {
    margin: 0;
    padding: 0;
    font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;
    font-size: 12px;
  }

  .placeinfo.current {
    font-weight: bold;
    font-size: 14px;
    border-radius: 20px;
    padding: 10px 20px;
    background: #fddf62;
    color: #1d1d1d;
    box-shadow: 0px 3px 8px #464646;
    /* bottom: 55px; */
  }

  .placeinfo {
    position: relative;
    width: 100%;
    border-radius: 6px;
    border: 1px solid #ccc;
    border-bottom: 2px solid #ddd;
    padding-bottom: 10px;
    background: #fff;
    /* bottom: 80px; */
  }
  .placeinfo:nth-of-type(n) {
    border: 0;
    box-shadow: 0px 1px 2px #888;
  }
  .placeinfo a,
  .placeinfo a:hover,
  .placeinfo a:active {
    color: #f86706;
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
    color: #292929;
    background: #fddf62;
    background: #fddf62
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

export const StContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  width: 100%;
  height: 350px;
`;

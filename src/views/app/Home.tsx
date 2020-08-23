import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Helmet } from 'react-helmet';

import { State } from 'store/reducers';
import { Step } from 'utils/enums';
import { setLocation, getWeather } from 'store/app/actions';

import { Flex, Card } from 'antd-mobile';

const _ = require('lodash');
const moment = require('moment');

export default function Home() {
  const dispatch = useDispatch();

  const favicon = useSelector((state: State) => state.app.favicon);
  const title = useSelector((state: State) => state.app.title);

  const latitude  = useSelector((state: State) => state.app.latitude);
  const longitude = useSelector((state: State) => state.app.longitude);
  const condition = useSelector((state: State) => state.app.condition);

  const statusOfLoadingWeather = useSelector((state: State) => state.app.statusOfLoadingWeather);

  useEffect(() => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        dispatch(setLocation(latitude, longitude));
      }, async error => {
        console.error(error);

        // 위치 검색 허용 안 함 설정 시 서울로 지정
        const latitude  = 37.583328;
        const longitude = 127.0;

        dispatch(setLocation(latitude, longitude));
      });
    }
  }, []);

  useEffect(() => {
    const link: HTMLLinkElement = document.querySelector('link[rel*="icon"]') || document.createElement('link');

    link.type = 'image/x-icon';
    link.rel  = 'shortcut icon';
    link.href = `http://openweathermap.org/img/w/${favicon}.png`;

    document.getElementsByTagName('head')[0].appendChild(link);
  }, [favicon]);

  useEffect(() => {
    dispatch(getWeather(latitude, longitude));
  }, [latitude, longitude]);

  function showWeatherAnimation() {
    // https://openweathermap.org/weather-conditions

    switch (favicon) {
      // clear sky
      case '01d':
      case '01n':
        return (
          <img role="img" alt="sun" src="/assets/images/sun.png" />
        );

      // few clouds
      case '02d':
      case '02n':
        return (
          <Fragment>
            <img role="img" alt="cloud" src="/assets/images/cloud.png" />
            <img role="img" alt="sun" src="/assets/images/sun.png" />
          </Fragment>
        );

      // scattered clouds
      case '03d':
      case '03n':
        return (
          <Fragment>
            <img role="img" alt="cloud" src="/assets/images/cloud.png" />
            <img role="img" alt="cloud" src="/assets/images/cloud.png" />
            <img role="img" alt="cloud" src="/assets/images/cloud.png" />
          </Fragment>
        );

      // broken clouds
      case '04d':
      case '04n':
        return (
          <Fragment>
            <img role="img" alt="cloud" src="/assets/images/cloud.png" />
            <img role="img" alt="cloud" src="/assets/images/broken-cloud.png" />
            <img role="img" alt="cloud" src="/assets/images/broken-cloud.png" />
          </Fragment>
        );

      // shower rain
      case '09d':
      case '09n':
        return (
          <Fragment>
            <img role="img" alt="cloud" src="/assets/images/cloud.png" />
            <img role="img" alt="cloud" src="/assets/images/broken-cloud.png" style={{ opacity: .6 }} />
            <img role="img" alt="rain" src="/assets/images/rain.png" />
          </Fragment>
        );

      // rain
      case '10d':
      case '10n':
        return (
          <Fragment>
            <img role="img" alt="cloud" src="/assets/images/cloud.png" />
            <img role="img" alt="rain" src="/assets/images/rain.png" />
          </Fragment>
        );

      // thunderstorm
      case '11d':
      case '11n':
        return (
          <Fragment>
            <img role="img" alt="cloud" src="/assets/images/cloud.png" />
            <img role="img" alt="cloud" src="/assets/images/thunder-cloud.png" />
            <img role="img" alt="cloud" src="/assets/images/thunder-cloud.png" />
          </Fragment>
        );

      // snow
      case '13d':
      case '13n':
        return (
          <Fragment>
            <img role="img" alt="snow" src="/assets/images/snow.png" />
            <img role="img" alt="snow" src="/assets/images/snow.png" />
            <img role="img" alt="snow" src="/assets/images/snow.png" />
            <img role="img" alt="snow" src="/assets/images/snow.png" />
            <img role="img" alt="snow" src="/assets/images/snow.png" />
            <img role="img" alt="snow" src="/assets/images/snow.png" />
            <img role="img" alt="snow" src="/assets/images/snow.png" />
          </Fragment>
        );

      default:
        return (
          <div className="app-animation-loading">
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
          </div>
        );
    }
  }

  return (
    <main data-view="app">
      <div id="home">
        <Helmet title={title} />
        <div className="app-container">
          <Flex
            className="app-flexbox">
            <Flex.Item
              className="app-flexbox-item app-weather-title">
              {statusOfLoadingWeather == Step.FINISH ? condition.weather[0].description.toUpperCase() : ''}
            </Flex.Item>
            <Flex.Item
              className="app-flexbox-item app-weather-animation">
              {showWeatherAnimation()}
            </Flex.Item>
            <Flex.Item
              className="app-flexbox-item app-weather-information">
              <div data-weather="temperature">
                {statusOfLoadingWeather == Step.FINISH ? Math.round(condition.main.temp) : 0}°
              </div>
              <Card className="app-card">
                <Card.Header
                  className="app-card-header"
                  title="DETAILED" />
                <Card.Body
                  className="app-card-body"
                  data-weather="information">
                  <Fragment>
                    <div className="row">
                      <span>HUMIDITY</span>
                      <span>{statusOfLoadingWeather == Step.FINISH ? condition.main.humidity : 0}%</span>
                    </div>
                    <div className="row">
                      <span>PRESSURE</span>
                      <span>{statusOfLoadingWeather == Step.FINISH ? condition.main.pressure : 0}hPa</span>
                    </div>
                    <div className="row">
                      <span>WIND</span>
                      <span>{statusOfLoadingWeather == Step.FINISH ? condition.wind.speed : 0}m/s</span>
                    </div>
                  </Fragment>
                </Card.Body>
              </Card>
            </Flex.Item>
            <Flex.Item
              className="app-flexbox-item app-weather-day">
              {moment().format('dddd').toUpperCase()}
            </Flex.Item>
          </Flex>
        </div>
      </div>
    </main>
  );
}

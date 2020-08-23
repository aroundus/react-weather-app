import { Condition } from 'utils/types';

const REDUCER = 'App';

export const GET_LOCATION = `${REDUCER}/GET_LOCATION`;
export const SET_LOCATION = `${REDUCER}/SET_LOCATION`;

export const GET_WEATHER = `${REDUCER}/GET_WEATHER`;
export const SET_WEATHER = `${REDUCER}/SET_WEATHER`;

export const LOADING_WEATHER_SUCCESS = `${REDUCER}/LOADING_WEATHER_SUCCESS`;
export const LOADING_WEATHER_FAILURE = `${REDUCER}/LOADING_WEATHER_FAILURE`;

export function setLocation(latitude: number, longitude: number) {
  return {
    type: SET_LOCATION,
    payload: {
      latitude,
      longitude
    }
  };
}

export function getWeather(latitude: number, longitude: number) {
  return {
    type: GET_WEATHER,
    payload: {
      latitude,
      longitude
    }
  };
}

export function setWeather(condition: Condition) {
  return {
    type: SET_WEATHER,
    payload: {
      condition
    }
  };
}

export function loadingWeatherSuccess() {
  return {
    type: LOADING_WEATHER_SUCCESS
  };
}

export function loadingWeatherFailure(message: string) {
  return {
    type: LOADING_WEATHER_FAILURE,
    payload: {
      message
    }
  };
}

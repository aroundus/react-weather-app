import { AnyAction } from 'redux';
import { all, put, takeLatest } from 'redux-saga/effects';
import * as HttpStatus from 'http-status-codes';
import axios from 'utils/axios';

import {
  GET_WEATHER,
  setWeather,
  loadingWeatherSuccess,
  loadingWeatherFailure,
} from 'store/app/actions';

export function* getWeather({ payload }: AnyAction) {
  const params = {
    lat: payload.latitude,
    lon: payload.longitude
  };

  try {
    const { config, data } = yield axios.get('weather', { params });
    console.info(config.url, data);

    if (data.cod == HttpStatus.OK) {
      yield put(setWeather(data));
      yield put(loadingWeatherSuccess());
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error(error);

    const { data } = error;

    yield put(setWeather(data));
    yield put(loadingWeatherFailure(data.message));
  }
}

export default all([
  takeLatest(GET_WEATHER, getWeather)
]);

import { AnyAction } from 'redux';
import { produce } from 'immer';
import {
  SET_LOCATION,
  GET_WEATHER,
  SET_WEATHER,
  LOADING_WEATHER_FAILURE
} from 'store/app/actions';
import { Step } from 'utils/enums';
import { Condition } from 'utils/types';

const _ = require('lodash');

const initialState = {
  iOS: navigator.platform == 'iPhone',

  favicon: '',
  title: 'LOADING',

  latitude: 0,
  longitude: 0,

  condition: {} as Condition,

  statusOfLoadingWeather: Step.WAIT,

  messageOfLoadingWeather: '',

  isMobileBrowser: navigator.platform && 'win16|win32|win64|mac|macintel'.indexOf(navigator.platform.toLowerCase()) == -1,
  isKeyboardVisible: 1
};

export function app(state = initialState, action: AnyAction) {
  return produce(state, draft => {
    switch (action.type) {
      case SET_LOCATION:
        draft.latitude  = action.payload.latitude;
        draft.longitude = action.payload.longitude;
        break;

      case GET_WEATHER:
        draft.statusOfLoadingWeather = Step.PROCESS;
        draft.favicon = '';
        break;

      case SET_WEATHER:
        draft.statusOfLoadingWeather = Step.FINISH;
        draft.condition = action.payload.condition;

        const weather = draft.condition.weather;

        if (Array.isArray(weather) && _.isEmpty(weather) == false) {
          draft.favicon = weather[0].icon;
          draft.title   = weather[0].main.toUpperCase();
        }
        break;

      case LOADING_WEATHER_FAILURE:
        draft.statusOfLoadingWeather  = Step.ERROR;
        draft.messageOfLoadingWeather = action.payload.message;
        draft.favicon = '';
        break;
    }
  });
}

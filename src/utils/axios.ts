import Axios from 'axios';
import * as HttpStatus from 'http-status-codes';
import Config from 'config';
import Codes from 'constants/codes';

const _ = require('lodash');

const axios = Axios.create({
  baseURL: Config.API_URL
});

axios.interceptors.request.use(config => {
  config.params = {
    ...config.params,
    appid: Config.API_KEY,
    units: 'metric' // Celsius
  };

  return config;
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  return response;
}, async ({ response }) => {
  if (_.isUndefined(response)) {
    return Promise.reject({ message: Codes.INTERNAL_SERVER_ERROR });
  }

  const { status, data } = response;

  switch (status) {
    case HttpStatus.INTERNAL_SERVER_ERROR:
      data.message = Codes.INTERNAL_SERVER_ERROR;
      break;
  }

  return Promise.reject(response);
});

export default axios;

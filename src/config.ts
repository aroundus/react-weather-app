const _ = require('lodash');

enum Environment {
  LOCAL = 'local',
  DEVELOPMENT = 'development',
  PRODUCTION = 'production'
}

type Config = {
  NAME: string,
  API_URL: string,
  API_KEY: string,
  JWT_KEY: string
}

const defaults = {
  API_URL: 'http://api.openweathermap.org/data/2.5/',
  API_KEY: '06e0819d859d93a5a8d89c993e08d517',
  JWT_KEY: 'a5f4116e16ac6a66014d76fbf289ad20a797790a5307b1cff19994552256f943'
};

const local: Config = {
  ...defaults,
  NAME: 'local'
};

const development: Config = {
  ...defaults,
  NAME: 'development'
};

const production: Config = {
  ...defaults,
  NAME: 'production'
};

let environment: Environment = Environment.LOCAL;

switch (process.env.REACT_APP_NODE_ENV) {
  case Environment.LOCAL:
    environment = Environment.LOCAL;
    break;
  case Environment.DEVELOPMENT:
    environment = Environment.DEVELOPMENT;
    break;
  case Environment.PRODUCTION:
    environment = Environment.PRODUCTION;
    break;
}

const config = { local, development, production };
export default config[environment];

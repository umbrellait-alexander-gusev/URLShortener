import envalid from 'envalid';

envalid.cleanEnv(process.env, {
  REACT_APP_API_PREFIX: envalid.str(),
  REACT_APP_API_PORT: envalid.port(),
  REACT_APP_API_LINKS_PATH: envalid.str(),
  REACT_APP_API_HOST: envalid.host(),
});

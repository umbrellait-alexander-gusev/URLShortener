import envalid from 'envalid';

envalid.cleanEnv(process.env, {
  API_PREFIX: envalid.str(),
  SERVER_PORT: envalid.num(),
  DB_NAME: envalid.str(),
  DB_HOST: envalid.host(),
  DB_PORT: envalid.port(),
  DB_REMOVE_LINK: envalid.num(),
  DB_MAX_LENGTH_SLUG: envalid.num(),
});

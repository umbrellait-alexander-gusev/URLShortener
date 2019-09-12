const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
    path: path.resolve("./.env")
});

const env = {
    server_api_prefix: process.env.REACT_APP_SERVER_API_PREFIX,
    server_port: process.env.REACT_APP_SERVER_PORT,
    db_name: process.env.REACT_APP_DB_NAME,
    db_host: process.env.REACT_APP_DB_HOST,
    db_port: process.env.REACT_APP_DB_PORT
};

export default env
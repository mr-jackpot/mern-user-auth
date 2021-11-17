module.exports = {
  DB_USER: "mongo_owner",
  DB_PASSWORD: "h9iXvyO5z84Mvtpa",
  DB_CLUSTER: "mongo-backend.swf3y.mongodb.net",
  DB_NAME: "auth_database",

  SERVER_PORT: 4000,
  SERVER_URL: "http://localhost:",

  REACT_PORT: 3000,
  REACT_URL: "http://localhost:",

  SESSION_SECRET: require("crypto").randomBytes(16).toString('hex'),
};

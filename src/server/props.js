module.exports = {
  DB_USER: "mongo_owner",
  DB_PASSWORD: "h9iXvyO5z84Mvtpa",
  DB_CLUSTER: "mongo-backend.swf3y.mongodb.net",
  LOGIN_DB: "auth_database",
  SESSION_DB: "session_store",

  SERVER_PORT: 4000,
  SERVER_URL: "https://fircohard-open-source.nw.r.appspot.com",
  SERVER_NAME: "[server.js]",

  REACT_PORT: 3000,
  REACT_URL: "https://fircohard-open-source.nw.r.appspot.com",

  SESSION_SECRET: require("crypto").randomBytes(16).toString('hex'),
};

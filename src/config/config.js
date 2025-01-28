// src/config.js
// LOCALHOST
const apiUrl = process.env.REACT_APP_BACKEND_URL;
const apiUrlFile = process.env.REACT_APP_BACKEND_URL_FILE;
// const apiUrl = "http://192.168.100.67:4000";
// const apiUrlFile = "http://192.168.100.67:4000";
// TETS DEMO
// const apiUrl = process.env.REACT_APP_BACKEND_URL_DEMO;
// const apiUrlFile = process.env.REACT_APP_BACKEND_URL_FILE_DEMO;
// PRODUCTION LIVE
// const apiUrl = process.env.REACT_APP_BACKEND_URL_PRODUCTION;
// const apiUrlFile = process.env.REACT_APP_BACKEND_URL_FILE_PRODUCTION;
const debug = process.env.REACT_APP_DEBUG === "true";
const Cluster = process.env.REACT_APP_CLUSTER;
const SecretKey = process.env.REACT_APP_SECURITY_KEY;
const storageBucket = process.env.REACT_APP_STORAGE_BUCKET;
export const config = {
  apiUrl,
  debug,
  Cluster,
  SecretKey,
  storageBucket,
  apiUrlFile,
};

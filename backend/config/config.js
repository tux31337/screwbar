const dotenv = require('dotenv');
dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

const config = {
  //jwt
  jwt: {
<<<<<<< HEAD
    secretKey: required('JWT_SECRET'),
    expiresInSec: required('JWT_EXPIRES_SEC', 86400),
  },
  //db
  db: {
    host: required('DB_HOST'),
    user: required('DB_USER'),
    database: required('DB_DATABASE'),
    password: required('DB_PASSWORD'),
  },
  host: {
    port: required('HOST_PORT', 8090),
=======
    secretKey: required("JWT_SECRET"),
    expiresInSec: required("JWT_EXPIRES_SEC", 86400),
  },
  //db
  db: {
    host: required("DB_HOST"),
    user: required("DB_USER"),
    database: required("DB_DATABASE"),
    password: required("DB_PASSWORD"),
  },
  host: {
    port: required("HOST_PORT", 8080),
>>>>>>> 4e5abc219e926cbad0a048140dc5c496166d4504
  },
  //암호화
  bcrypt: {
    saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 12)),
  },
  // 문자 메시지 인증관리
  sens: {
<<<<<<< HEAD
    accessKey: required('SENS_ACCESS'),
    secretKey: required('SENS_SECRET'),
    serviceId: required('SENS_ID'),
    callNumber: required('SENS_NUMBER'),
  },
};

module.exports = config;
=======
    accessKey: required("SENS_ACCESS"),
    secretKey: required("SENS_SECRET"),
    serviceId: required("SENS_ID"),
    callNumber: required("SENS_NUMBER"),
  },
};

module.exports = config;
>>>>>>> 4e5abc219e926cbad0a048140dc5c496166d4504
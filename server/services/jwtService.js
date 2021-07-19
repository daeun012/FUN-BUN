let jwt = require('jsonwebtoken');

const PRIVATE_KEY = 'a5f0f80f2a0012236be249d8351d5fd913ff7e666f70d5704940f0a02a39ab4989fd1cd69b3f5bcb04bc5eedc1a803c43bd87f90e9f3f3e3fb7cd0cbb0b912c5';

module.exports = {
  tokenGenerator: (userData) => {
    //console.log(userData);
    let jwt_token = jwt.sign(
      {
        id: userData[0],
        userId: userData[1],
      },
      PRIVATE_KEY,
      {
        expiresIn: '24h',
      }
    );
    return jwt_token;
  },

  parseAuthorization: (authorization) => {
    return authorization != null ? authorization.replace('Bearer ', '') : null;
  },

  getUid: (authorization) => {
    let uid = -1;
    let token = module.exports.parseAuthorization(authorization);
    if (token != null) {
      try {
        let jwtToken = jwt.verify(token, PRIVATE_KEY);
        if (jwtToken != null) userId = jwtToken.id;
      } catch (err) {}
    }
    return uid;
  },

  verifyToken: (token) => {
    if (token != null) {
      let jwtToken = jwt.verify(token, PRIVATE_KEY);
      //console.log(jwtToken);
      if (jwtToken != null) return jwtToken;
      else return null;
    }
  },
};

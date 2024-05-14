const jsonwebtoken = require("jsonwebtoken");

// Secret key to sign Cookie
const secretKeyForCookie = "DUMMYKEY";
// Secret key to sign and verify JWTs
const secretKeyForToken = "mySecretKey";
//expiresIn
//const authTokenExpireTime = 24 * 60 * 60 * 1000;//One day
const authTokenExpireTime = '1m'; //1 minute

//Cookie tag
const cookieTag = "myCustomCookie";
//Session name key
const SESSION_NAME_TAG = "myCustomSessionCookieName";
//Secret key for session
const SESSION_SECRET = "thisismysecrctekey";

function isAuthorizedUser(authToken) {
  try {
    if (!authToken || authToken === null) {
      return false;
    }
    // Verify the JWT token with the secret key
    const decodedToken = jsonwebtoken.verify(authToken, secretKeyForToken);
    console.log(
      "isAuthorizedUser >> decodedToken " + JSON.stringify(decodedToken)
    );
    console.log("isAuthorizedUser >> decodedToken exp:" + decodedToken.exp*1000 + " Now:" + Date.now());
    const isExpired = Date.now() >= decodedToken.exp * 1000;
    console.log("isAuthorizedUser >> isExpired:" + isExpired);
    if (isExpired) {
      return false;
    }
    return true;
  } catch (err) {
    console.log("isAuthorizedUser >> Err:" + err.message);
    return false;
  }
}

module.exports = {
  SESSION_SECRET,
  SESSION_NAME_TAG,
  secretKeyForCookie,
  secretKeyForToken,
  cookieTag,
  authTokenExpireTime,
  isAuthorizedUser,
};

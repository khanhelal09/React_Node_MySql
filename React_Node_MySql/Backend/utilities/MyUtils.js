// Secret key to sign Cookie
const secretKeyForCookie = "DUMMYKEY";
// Secret key to sign and verify JWTs
const secretKeyForToken = "mySecretKey";
//Cookie tag
const cookieTag = "myCustomCookie";
//Session name key 
const SESSION_NAME_TAG = "myCustomSessionCookieName";
//Secret key for session
const SESSION_SECRET = "thisismysecrctekey";

module.exports = {SESSION_SECRET, SESSION_NAME_TAG, secretKeyForCookie, secretKeyForToken, cookieTag};
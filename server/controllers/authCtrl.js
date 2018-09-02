const Auth0Strategy = require("passport-auth0");
const { AUTH_CLIENT_ID, AUTH_CLIENT_SECRET, AUTH_DOMAIN,AUTH_CALLBACK,FRONT_END_URL} = process.env;

const strat = new Auth0Strategy(
  {
    clientID: AUTH_CLIENT_ID,
    clientSecret: AUTH_CLIENT_SECRET,
    domain: AUTH_DOMAIN,
    scope: "openid profile",
    callbackURL: AUTH_CALLBACK
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    return done(null, profile);
  }
);

const getUser = (req, res) => {
  if (!req.user) {
     res.redirect(`${FRONT_END_URL}#/`)
  } else {
    return res.status(200).json(req.user);
  }
};

const logout = (req, res) => {
  console.log('logout')
  req.logOut();
  return res.redirect(`${FRONT_END_URL}#/`);
};

module.exports = {
  strat,
  getUser,
  logout
};

const {
  FRONT_END_URL
} = process.env;

const getUser = (req, res) => {
  if (!req.user) {
    res.redirect(`${FRONT_END_URL}#/`);
  } else {
    return res.status(200).json(req.user);
  }
};

const logout = (req, res) => {
  console.log("logout");
  req.logOut();
  return res.redirect(`${FRONT_END_URL}#/`);
};

module.exports = {
  getUser,
  logout
};

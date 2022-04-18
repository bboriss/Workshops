// Checking if Admin is logged in

const validateAdminSession = (req, res, next) => {
  if (req.session.adminLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
};

// Checking if User is logged in

const validateUserSession = (req, res, next) => {
  if (req.session.userLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
};

// Check if more than one item added

const numberOfItemsChecker = (req, res, next) => {
  usersData = [req.body];
  console.log(usersData);
  if (usersData.length == 1) {
    next();
  }
  //   else {
  //     res.status(403).send({ message: "You can add only 1 item!" });
  //   }
};

module.exports = {
  validateAdminSession,
  validateUserSession,
  numberOfItemsChecker,
};

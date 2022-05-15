const User = require("./../models/user");
const catchAsync = require("./../utils/asyncWrapper");

getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

module.exports = {
  getAllUsers,
};

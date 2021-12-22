const router = require("express").Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const auth = require("../middleware/auth");

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send({ success: true, user: _.pick(user, ["_id", "name", "email"]) });
});

module.exports = router;
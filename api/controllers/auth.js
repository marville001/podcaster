const Joi = require("joi");
const bcrypt = require("bcrypt");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const auth = require("../middleware/auth");

module.exports = {
  login: async (req, res) => {
    try {
      const { error } = validateLogin(req.body);

      if (error)
        return res
          .status(400)
          .send({ success: false, message: error.details[0].message });
      let user = await User.findOne({ email: req.body.email });

      if (!user)
        return res
          .status(400)
          .send({ success: false, message: "Invalid email or password..." });

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword)
        return res
          .status(400)
          .send({ success: false, message: "Invalid email or password..." });

      res.send({
        success: true,
        user: _.pick(user, ["_id", "name", "email", "isAdmin"]),
        token: user.generateAuthToken(),
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  register: async (req, res) => {
    try {
      const { error } = validate(req.body);
      if (error)
        return res
          .status(400)
          .send({ success: false, message: error.details[0].message });
      if (!req.files) {
        if (!req.files.avatar) {
          return res
            .status(400)
            .send({ success: false, message: "Avartar is required" });
        }
      }
      const avatar = req.files.avatar;

      let user = await User.findOne({ email: req.body.email });
      if (user)
        return res
          .status(400)
          .send({ success: false, message: "user already registered..." });

      let avatar_id = uuidv4();
      console.log(path.__dirname);
      avatar.mv(`${__dirname}/public/uploads/${avatar_id+"_"+avatar.name}`);

      user = new User({
        ..._.pick(req.body, ["name", "email", "password"]),
        avartar: `${avatar_id + avatar.name}`,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();

      res.send({
        success: true,
        user: _.pick(user, ["_id", "name", "email", "isAdmin"]),
        token: user.generateAuthToken(),
      });
    } catch (error) {
      console.log(error.message);
    }
  },
};

function validateLogin(req) {
  const schema = Joi.object().keys({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(req);
}

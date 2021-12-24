const _ = require("lodash");
const mongoose = require("mongoose");
const { Podcast, validatePodcast } = require("../models/podcast");
const { User } = require("../models/user");
const { dirname } = require("path");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

module.exports = {
  // Subscribe controller
  subscribe: async (req, res) => {
    // Schema for subscription data
    const schema = Joi.object().keys({
      userId: Joi.string().min(5).max(50).required(),
      podcastId: Joi.string().min(5).max(50).required(),
    });
    //   Validate req body
    const { error } = schema.validate(req.body);
    if (error)
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });

    //validate userId
    if (!mongoose.Types.ObjectId.isValid(req.body.userId))
      return res
        .status(400)
        .json({ success: false, message: "Invalid user id" });

    //validate podcastId
    if (!mongoose.Types.ObjectId.isValid(req.body.podcastId))
      return res
        .status(400)
        .json({ success: false, message: "Invalid podcast id" });

    const user = await User.findById(req.body.userId);
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });

    const podcast = await Podcast.findById(req.body.podcastId);
    if (!podcast)
      return res
        .status(400)
        .json({ success: false, message: "Podcast does not exist" });
  },
  // Unsubscribe controller
  unSubscribe: async (req, res) => {
    // Schema for subscription data
    const schema = Joi.object().keys({
      userId: Joi.string().min(5).max(50).required(),
      podcastId: Joi.string().min(5).max(50).required(),
    });
    //   Validate req body
    const { error } = schema.validate(req.body);
    if (error)
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });
  },
};

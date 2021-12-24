const mongoose = require("mongoose");
const Joi = require("joi");

// podcast model
const podcastSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true
  },
  userId: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true,
    lowercase: true
  },
  isDel: {
    type: Boolean,
    default: false,
  },
});

const Podcast = mongoose.model("Podcast", podcastSchema);

// Function to validate podcast fields
function validatePodcast(podcast) {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    userId: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
  });
  return schema.validate(podcast);
}

module.exports = {
  Podcast,
  validatePodcast
};

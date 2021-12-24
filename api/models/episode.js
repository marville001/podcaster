const mongoose = require("mongoose");

const episodeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  podcaseId: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  title: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  date: {
    type: Date,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  isDel: {
    type: Boolean,
    default: false,
  },
});

const Episode = mongoose.model("Episode", episodeSchema);

// Function to validate podcast fields
function validateEpisode(podcast) {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    podcastId: Joi.string().required(),
    title: Joi.string().required(),
    date: Joi.date().required(),
  });
  return schema.validate(podcast);
}

module.exports = {
  Episode,
  validateEpisode
};

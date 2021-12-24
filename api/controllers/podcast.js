const _ = require("lodash");
const { Podcast, validatePodcast } = require("../models/user");

module.exports = {
  // Create podcast controller
  createPodcast: async (req, res) => {
    //   Validate req body
    const { error } = validatePodcast(req.body);

    if (error)
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });
    res.send("Route createPodcast");
  },
  //   Get All podcasts controller
  getAllPodcasts: async (req, res) => {
    res.send("Route getAllPodcasts");
  },
  //   Get one podcast controller
  getOnePodcast: async (req, res) => {
    res.send("Route getOnePodcast");
  },
};

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

    //validate userId
    if (!mongoose.Types.ObjectId.isValid(req.body.userId))
      return res
        .status(400)
        .json({ success: false, message: "Invalid user id" });

    const user = await User.findById(req.body.userId);
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });

    if (!req.body.photo && req.files === null) {
      return res
        .status(400)
        .json({ success: false, message: "No podcast photo is selected" });
    }

    let photo = "";

    if (req.body.photo) {
      photo = req.body.photo;
    } else {
      const photoFile = req.files.photo;

      let photo_id = uuidv4();
      const appDir = dirname(require.main.filename);
      photoFile.mv(
        `${appDir}/public/uploads/${photo_id + "_" + photoFile.name}`
      );

      photo = `${photo_id + "_" + photoFile.name}`;
    }

    let podcast = new Podcast({
      ..._.pick(req.body, ["name", "userId", "category", "description"]),
      photo,
    });

    await podcast.save();

    res.send({
      success: true,
      podcast: _.pick(podcast, [
        "_id",
        "name",
        "userId",
        "category",
        "description",
      ]),
    });
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

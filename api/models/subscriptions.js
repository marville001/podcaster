const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  podcastId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = {
  Subscription,
};

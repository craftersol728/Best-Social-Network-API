const { Thought, User } = require('../models');

const thoughtController = {
  async getAllThoughts(req, res) {
    try {
      const dbThoughtData = await Thought.find({})
        .populate({
          path: "reactions",
          select: "__v",
        })
        .select("-__v")
        .sort({ _id: -1 });
      res.json(dbThoughtData);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  },

  async getThoughtById({ params }, res) {
    try {
      const dbThoughtData = await Thought.findOne({ _id: params.thoughtId })
        .populate({
          path: "reactions",
          select: "-__v",
        })
        .select("-__v");
      if (!dbThoughtData) {
        res.status(404).json({ message: "No thought found with this id" });
        return;
      }
      res.json(dbThoughtData);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  },

  async createThought({ params, body }, res) {
    try {
      const createdThought = await Thought.create(body);
      const dbUserData = await User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { thoughts: createdThought._id } },
        { new: true }
      );
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id"});
        return;
      }
      res.json(dbUserData);
    } catch (err) {
      res.json(err);
    }
  },

  async updateThought({ params, body }, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {
        new: true,
        runValidators: true,
      });
      if (!dbThoughtData) {
        res.status(404).json({ message: "No thought found with this id" });
        return;
      }
      res.json(dbThoughtData);
    } catch (err) {
      res.json(err);
    }
  },

  async deleteThought({ params }, res) {
    try {
      const deletedThought = await Thought.findOneAndDelete({ _id: params.thoughtId });
      if (!deletedThought) {
        return res.status(404).json({ message: "No thought with this id" });
      }
      const dbUserData = await User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { thoughts: params.thoughtId } },
        { new: true }
      );
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData)

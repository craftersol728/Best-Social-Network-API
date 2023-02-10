const { Thought, User } = require('../models');
//This code defines an asynchronous function getAllThoughts in an object called thoughtController. The function takes two arguments, req and res, which are the request and response objects from an HTTP request.
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
//The function attempts to retrieve all documents from the Thought collection in a MongoDB database using the find method from the Mongoose library. The find method retrieves all documents in the collection that match a specified query. In this case, the query is an empty object {}, which retrieves all documents in the collection.
  async getThoughtById({ params }, res) {
    try {
      const dbThoughtData = await Thought.findOne({ _id: params.thoughtId })
        .populate({
          path: "reactions",
          select: "-__v",
        })
        .select("-__v");

      if (!dbThoughtData) {
        return res.status(404).json({ message: "No thought found with this id, Try again next time" });
      }

      res.json(dbThoughtData);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  },
//The retrieved documents are then populated with their associated reactions by using the populate method. The populate method allows you to retrieve documents from a different collection in the same database and merge them with the existing documents. The path property specifies the name of the collection to populate and the select property specifies which fields to include in the populated documents. In this case, it specifies not to include the __v field.Finally, the select method is used to specify which fields should be included in the result. In this case, it specifies to exclude the __v field. The sort method is used to sort the retrieved documents by the _id field in descending order (the most recent thought first).
  async createThought({ params, body }, res) {
    try {
      const createdThought = await Thought.create(body);
      const dbUserData = await User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { thoughts: createdThought._id } },
        { new: true }
      );

      if (!dbUserData) {
        return res.status(404).json({ message: "No user found with this id, Try again next time" });
      }

      res.json(dbUserData);
    } catch (err) {
      console.error(err);
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
        return res.status(404).json({ message: "No thought found with this id, Try again next time" });
      }

      res.json(dbThoughtData);
    } catch (err) {
      console.error(err);
      res.json(err);
    }
  },

  async deleteThought({ params }, res) {
    try {
      const deletedThought = await Thought.findOneAndDelete({ _id: params.thoughtId });

      if (!deletedThought) {
        return res.status(404).json({ message: "No thought with this id, Try again next time" });
      }

      const dbUserData = await User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { thoughts: params.thoughtId } },
        { new: true }
      );

      if (!dbUserData) {
        return res.status(404).json({ message: "No user found with this id, Try again next time" });
      }

      res.json(

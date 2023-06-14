const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find().populate('reactions');
      res.json(thoughts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to get thoughts' });
    }
  },

  // Get a single thought by its id
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .populate('reactions');

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this id' });
      }

      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to get the thought' });
    }
  },

  // Create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user found with this id' });
      }

      res.status(201).json({ message: 'Thought created successfully', thought });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to create the thought' });
    }
  },

  // Update a thought by its id
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this id' });
      }

      res.json({ message: 'Thought updated successfully', thought });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to update the thought' });
    }
  },

  // Delete a thought by its id
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this id' });
      }

      await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } }
      );

      res.json({ message: 'Thought deleted successfully', thought });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to delete the thought' });
    }
  },

  // Add a reaction to a thought
  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this id' });
      }

      res.status(201).json({ message: 'Reaction added successfully', thought });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to add the reaction' });
    }
  },

  // Remove a reaction from a thought
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this id' });
      }

      res.json({ message: 'Reaction removed successfully', thought });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to remove the reaction' });
    }
  },
};

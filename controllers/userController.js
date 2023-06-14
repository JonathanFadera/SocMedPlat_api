const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find().populate('thoughts').populate('friends');
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to get users' });
    }
  },

  // Get a single user by their id
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate('thoughts')
        .populate('friends');

      if (!user) {
        return res.status(404).json({ message: 'No user found with this id' });
      }

      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to get the user' });
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to create the user' });
    }
  },

  // Update a user by their id
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user found with this id' });
      }

      res.json({ message: 'User updated successfully', user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to update the user' });
    }
  },

  // Delete a user by their id
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user found with this id' });
      }

      await Thought.deleteMany({ username: user.username });

      // Remove the user from the friend lists of other users
      await User.updateMany(
        { _id: { $in: user.friends } },
        { $pull: { friends: req.params.userId } }
      );

      res.json({ message: 'User deleted successfully', user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to delete the user' });
    }
  },

  // Add a friend to a user's friend list
  async addFriend(req, res) {
    try {
      const { userId, friendId } = req.params;

      // Check if the friendId is valid
      const friend = await User.findOne({ _id: friendId });

      if (!friend) {
        return res.status(404).json({ message: 'No user found with the friendId' });
      }

      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { friends: friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user found with this id' });
      }

      res.json({ message: 'Friend added successfully', user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to add the friend' });
    }
  },

  // Remove a friend from a user's friend list
  async removeFriend(req, res) {
    try {
      const { userId, friendId } = req.params;

      // Check if the friendId is valid
      const friend = await User.findOne({ _id: friendId });

      if (!friend) {
        return res.status(404).json({ message: 'No user found with the friendId' });
      }

      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { friends: friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user found with this id' });
      }

      res.json({ message: 'Friend removed successfully', user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to remove the friend' });
    }
  },
};

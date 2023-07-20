const { User, Thought } = require('../models');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('thoughts');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // update a user
  async updateUser(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { new: true }
      );
      if (!dbUserData) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete a user
  async deleteUser(req, res) {
    try {
      const dbUserData = await User.findOneAndDelete({ _id: req.params.userId });
      if (!dbUserData) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // add a friend
  async addFriend(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      if (!dbUserData) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete a friend
  async deleteFriend(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!dbUserData) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
   
  }

};
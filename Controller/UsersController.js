const User = require("../Models/User");

class UsersController {
  static async createUser(req, res) {
    try {
      let { name } = req.body;

      const user = await User.create({ name });

      return res
        .status(200)
        .send(`User created successfully with id ${user._id}`);
    } catch (error) {
      console.log(error);
    }
  }

  static async updateUser(req, res) {
    try {
      let { userId, name } = req.body;

      const user = await User.findOne({ _id: userId });

      if (!user) {
        return res.status(400).send("User with this id not found");
      }

      if (name) user.name = name;

      user.save();

      return res.status(200).send("User updated successfully");
    } catch (error) {
      console.log(error);
    }
  }

  static async listUsers(req, res) {
    try {
      const users = await User.find({}, { name: 1 });

      return res
        .status(200)
        .send(users.length !== 0 ? users : "Users not found");
    } catch (error) {
      console.log(error);
    }
  }

  static async getUserById(req, res) {
    try {
      const { userId } = req.query;

      if (!userId) {
        return res.status(400).send("User id required");
      }

      const user = await User.findOne({ _id: userId }, { name: 1 });

      return res.status(200).send(user ? user : "User not found");
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteUser(req, res) {
    try {
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).send("UserId required");
      }

      const user = await User.findOne({ _id: userId });

      if (!user) {
        return res.status(400).send("User with this id not found");
      }

      user.delete();
      user.save();

      return res.status(200).send("User deleted successfully");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UsersController;

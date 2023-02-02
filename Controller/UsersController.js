const User = require("../Models/User");

class UsersController {
  static async createUser(req, res) {
    let { name } = req.body;

    const user = await User.create({ name });

    return res
      .status(200)
      .send(`User created successfully with id ${user._id}`);
  }

  static async updateUser(req, res) {
    let { userId, name } = req.body;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(400).send("User with this id not found");
    }

    if (name) user.name = name;

    user.save();

    return res.status(200).send("User updated successfully");
  }

  static async listUsers(req, res) {
    const users = await User.find({}, { name: 1 });

    return res.status(200).send(users.length !== 0 ? users : "Users not found");
  }

  static async getUserById(req, res) {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).send("User id required");
    }

    const user = await User.findOne({_id:userId}, { name: 1 });

    return res.status(200).send(user ? user : "User not found");
  }

  static async deleteUser(req, res) {
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
  }
}

module.exports = UsersController;

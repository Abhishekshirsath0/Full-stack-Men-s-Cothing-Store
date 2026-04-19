import User from "../model/user.js";

export const postuserData = async (req, res, next) => {
  try {
    const { Firstname, Lastname, Address, Email, Phone, Password } = req.body;
    const newUser = new User({
      Firstname,
      Lastname,
      Address,
      Email,
      Phone,
      Password,
    });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: "Server Error during Saving" });
  }
};

export const getuserData = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch {
    console.log("error while reading data at controller");
    res.status(500).json({ message: "Error fetching users" });
  }
};

// DELETE: Remove user
export const deleteUser = async (req, res) => {
  try {
    const { _id } = req.params;

    const deletedUser = await User.findByIdAndDelete(_id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Error deleting user",
    });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { Usertype: role },
      { returnDocument: "after" },
    );

    console.log("UPDATED USER:", updatedUser);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User role updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating user role" });
  }
};

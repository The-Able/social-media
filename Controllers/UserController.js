import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";

// Find a user
export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);

    if (user) {
      const { password, ...otherDetails } = user._doc;
      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("Invaild user");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update user
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, currentUserAdminStatus, password } = req.body;

  if (id === currentUserId || currentUserAdminStatus) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }

      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  else {
      res.status(403).json("You are not allowed to do this!")
  }
};


// Delete User

export const deleteUser = async (req, res) => {
    const id = req.params.id;
  const { currentUserId, currentUserAdminStatus } = req.body;

  if (id === currentUserId || currentUserAdminStatus) {
    try {

      const user = await UserModel.findByIdAndDelete(id);

      res.status(200).json("User deleted..");
    } catch (err) {
      res.status(500).json(err);
    }
  }
  else {
      res.status(403).json("You are not allowed to do this!")
  }
}

// Follow a User

export const followUser = async (req, res) => {
    const id = req.params.id

    const {currentUserId} = req.body;

    if(currentUserId === id) {
        res.status(403).json("Action forbidden")
    } else {
        try {

            const followUser = await UserModel.findById(id)
            const followingUser = await UserModel.findById(currentUserId)

            if(!followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({$push : {followers: currentUserId}})
                await followingUser.updateOne({$push : {following: id}})
                res.status(200).json("You are now following this user.")
            } else {
                res.status(500).json("You are already following this user!")
            }
        } catch(err) {
            res.status(500).json(err)
        }
    }
}


// Unfollow a User

export const unFollowUser = async (req, res) => {
    const id = req.params.id

    const {currentUserId} = req.body;

    if(currentUserId === id) {
        res.status(403).json("Action forbidden")
    } else {
        try {

            const followUser = await UserModel.findById(id)
            const followingUser = await UserModel.findById(currentUserId)

            if(followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({$pull : {followers: currentUserId}})
                await followingUser.updateOne({$pull : {following: id}})
                res.status(200).json("You are now unfollowed this user.")
            } else {
                res.status(500).json("You are not following this user!")
            }
        } catch(err) {
            res.status(500).json(err)
        }
    }
}
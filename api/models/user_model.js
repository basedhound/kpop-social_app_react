import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
   {
      username: {
         type: String,
         required: true,
         max: 50,
         unique: true,
         lowercase: true
      },
      password: {
         type: String,
         required: true,
         min: 6,
      },
      firstname: {
         type: String,
         required: true,
      },
      lastname: {
         type: String,
         required: true,
      },
      isAdmin: {
         type: Boolean,
         default: false,
      },
      profilePicture: String,
      coverPicture: String,
      about: String,
      livesin: String,
      worksAt: String,
      relationship: String,
      country: String,
      followers: [],
      following: [],
   },
   { timestamps: true }
);

const UserModel = mongoose.model("Users", UserSchema);
export default UserModel;

import mongoose, { Schema, models, model } from "mongoose";

const profileSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    bio: { type: String, required: true, trim: true },
    profileImage: {
      type: String,
      required: true,
      trim: true,
      default: "/ibo.png",
    },
    problemsSolved: { type: Number, required: true },
    university: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    socialLinks: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      codeforces: { type: String, default: "" },
      leetcode: { type: String, default: "" },
    },
  },
  { timestamps: true, versionKey: false }
);

const Profile = models.Profile || model("Profile", profileSchema);

export default Profile;

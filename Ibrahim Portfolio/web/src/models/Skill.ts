import { Schema, models, model } from "mongoose";

const skillSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    icon: { type: String, default: null, trim: true },
    category: { type: String, default: "Programming", trim: true },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
      default: "Intermediate",
    },
  },
  { timestamps: true, versionKey: false }
);

const Skill = models.Skill || model("Skill", skillSchema);

export default Skill;

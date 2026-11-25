import { Schema, models, model } from "mongoose";

const projectSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    technologies: [{ type: String, trim: true }],
    live: { type: String, required: true, trim: true },
    github: { type: String, required: true, trim: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

const Project = models.Project || model("Project", projectSchema);

export default Project;

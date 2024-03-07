import mongoose from "mongoose";

const PostModel = new mongoose.Schema({
  pname: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photo: {
    data: Buffer,
    cantentType: String,
  },
});

export default mongoose.model("Post", PostModel);

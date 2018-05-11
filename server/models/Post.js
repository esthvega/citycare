const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    address: {type: String, required: true},
    subject: {type: String, required: true},
    content: {type: String, required: true},
    photo: String,
    user: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    isResolve: { type: Boolean, default: false }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;

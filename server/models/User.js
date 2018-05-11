const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {type: String, required: true},
    password: {type: String, required: true},
    dni: {type: String, required: true}, 
    posts: [{ type: Schema.Types.ObjectId, ref: "Posts" }],
    isAdmin: {type: Boolean, default: false}
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;

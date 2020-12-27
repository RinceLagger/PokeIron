const { Schema, model } = require('mongoose');

const emailRegex = /^\S+@\S+\.\S+$/;

const UserSchema = new Schema(
    {
      email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        match: [emailRegex, "Please use a valid email address"],
      },
      username: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
      },
      passwordHash: {
        type: String,
        required: true,
        trim: true,
      },
      cards: [{ type: Schema.Types.ObjectId, ref: "Pokecard" }],
      combates: [{ type: Schema.Types.ObjectId, ref: "Combate" }],
      imgUser: {
        type: String,
        trim: true,
        required: true,
        unique: true,
      },
      Level: {
        type: Number,
        default: 1,
      },
    },
    { timestamps: true }
  );

  module.exports = model('User',UserSchema);
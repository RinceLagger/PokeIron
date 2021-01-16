const { Schema, model } = require('mongoose');


const CardSchema = new Schema(
    {
      name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
      },
      imgUser: {
        type: String,
        trim: true,
        unique: true,
      },
      tipo: {
        type: [String],
        required: true,
        trim: true,
      },
      hp: {
        type: Number,
        required: true,
        trim: true,
      },
    },
    { timestamps: true }
  );

  module.exports = model('Card',CardSchema);
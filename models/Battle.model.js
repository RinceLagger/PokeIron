const { Schema, model } = require('mongoose');

const BattleSchema = new Schema({
    user1: { type: Schema.Types.ObjectId, ref: "User", required: true },
    user2: { type: Schema.Types.ObjectId, ref: "User" },
    status: { enum: ["espera", "acabado"], required: true },
    vencedor: { type: Schema.Types.ObjectId, ref: "User" },
  });

  module.exports = model('Battle',BattleSchema);
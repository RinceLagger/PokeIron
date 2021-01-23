const { Schema, model } = require('mongoose');
const User = require("../models/User.model");

const BattleSchema = new Schema({
    user1: { type: Schema.Types.ObjectId, ref: "User", required: true },
    user2: { type: Schema.Types.ObjectId, ref: "User" },
    status1: { type: String, enum: ["espera","mostrar", "acabado"] },
    status2: { type: String, enum: ["espera", "acabado"]},
    card1:{ type: Schema.Types.ObjectId, ref: "Card", required: true },
    card2:{ type: Schema.Types.ObjectId, ref: "Card"},
    vencedor: { type: Schema.Types.ObjectId, ref: "User" },
  });

  // BattleSchema.post('remove', async ({_id: battleId}) => {
  //  await User.findOneAndUpdate({combates: {$in: [battleId]}}, {$pull: {combates: battleId}})
  // });

  module.exports = model('Battle',BattleSchema);
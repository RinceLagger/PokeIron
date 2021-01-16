const { Schema, model } = require('mongoose');

const BattleSchema = new Schema({
    user1: { type: Schema.Types.ObjectId, ref: "User", required: true },
    user2: { type: Schema.Types.ObjectId, ref: "User" },
    status1: { type: String, enum: ["espera","mostrar", "acabado"] },
    status2: { type: String, enum: ["espera", "acabado"]},
    card1:{ type: Schema.Types.ObjectId, ref: "Card", required: true },
    card2:{ type: Schema.Types.ObjectId, ref: "Card"},
    vencedor: { type: Schema.Types.ObjectId, ref: "User" },
  });

  module.exports = model('Battle',BattleSchema);
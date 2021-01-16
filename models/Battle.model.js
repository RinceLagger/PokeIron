const { Schema, model } = require('mongoose');

const BattleSchema = new Schema({
    user1: { type: Schema.Types.ObjectId, ref: "User", required: true },
    user2: { type: Schema.Types.ObjectId, ref: "User" },
    status1: { enum: ["espera","mostrar", "acabado"] },
    status2: { enum: ["espera", "acabado"]},
    vencedor: { type: Schema.Types.ObjectId, ref: "User" },
  });

  module.exports = model('Battle',BattleSchema);
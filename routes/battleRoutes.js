const { Router } = require("express");
const battleRouter = Router();
const {
  createBattle,
  battlePage,
  ownBattlesPage,
  activesBattlePage,
  preFinishBattlePage,
  battleMain,
  joinBattle,
  fightBattle,
  winnerAnimation,
  deleteBattle
} = require("../controllers/battle.controller");

battleRouter
  .post("/createBattle/:id", createBattle)
  .get("/createBattle", battlePage)
  .get("/my-battles", ownBattlesPage)
  .get("/active-battles", activesBattlePage)
  .get("/show-battles", preFinishBattlePage)
  .get("/battles", battleMain)
  .get("/join-battle/:id", joinBattle)
  .post("/fight-battle/:id/:battleID", fightBattle)
  .get("/battleAnimation/:battleID", winnerAnimation)
  .get("/deletecombat/:battleID", deleteBattle);

module.exports = battleRouter;

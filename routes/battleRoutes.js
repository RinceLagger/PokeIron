const { Router } = require("express");
const battleRouter = Router();
const {
  createBattle,
  battlePage,
  ownBattlesPage,
  activesBattlePage,
  preFinishBattlePage,
  battleMain,
} = require("../controllers/battle.controller");

battleRouter
  .post("/createBattle/:id", createBattle)
  .get("/createBattle", battlePage)
  .get("/my-battles", ownBattlesPage)
  .get("/active-battles", activesBattlePage)
  .get("/show-battles", preFinishBattlePage)
  .get("/battles", battleMain);

module.exports = battleRouter;

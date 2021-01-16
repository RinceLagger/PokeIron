const { Router } = require("express");
const battleRouter = Router();
const {
    createBattle,battlePage
} = require("../controllers/battle.controller");


battleRouter.post("/createBattle/:id", createBattle).get("/createBattle",battlePage)

module.exports = battleRouter;
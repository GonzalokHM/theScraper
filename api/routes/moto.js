const { insertManyMotos, getAllMotos } = require("../controllers/moto");

const motosRouter = require("express").Router();

motosRouter.post("/robar_a_instant_gaming", insertManyMotos);
motosRouter.get("/", getAllMotos);

module.exports = motosRouter;
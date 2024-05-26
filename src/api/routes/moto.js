const { insertManyMotos, getAllMotos, updatedMotos, deleteMoto } = require("../controllers/motos");

const motosRouter = require("express").Router();

motosRouter.post("/UpLoadDBScrap", insertManyMotos);
motosRouter.get("/", getAllMotos);
motosRouter.put("/:id", updatedMotos);
motosRouter.delete("/:id", deleteMoto);

module.exports = motosRouter;
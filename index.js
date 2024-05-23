require("dotenv").config();
const motosRouter = require("./src/api/routes/moto");
const { connectDB } = require("./src/config/db");
const express = require("express");
const cors = require("cors")

const app = express();
connectDB();

app.use(cors());

app.use("/api/v1/motos", motosRouter);

app.use("*", (req, res, next) => {
    return res.status(404).json("Route not found");
})

//controlador errores generales de servidor
app.use((error, req, res, next) => {
  return res
    .status(error.status || 500)
    .json(error.message || 'Internal Server Error');
});
const PORT = 4001
app.listen(PORT, () => {
  console.log(`escuchando en: http//:localhost:${PORT}`)
})
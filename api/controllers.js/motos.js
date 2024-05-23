const Moto = require('../models/moto');
const motos = require('../../../motos.json');

const insertManyMotos = async (req, res, next) => {
  try {
    await Moto.insertMany(motos.results);
    return res.status(201).json('Todos los juegos subidos a la BBDD');
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const getAllMotos = async (req, res, next) => {
  try {
    const allMotos = await Moto.find();
    return res.status(200).json(allMotos);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  insertManyMotos,
  getAllMotos,
};

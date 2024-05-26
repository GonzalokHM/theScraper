const Moto = require('../models/moto');
const motos = require('../../../motos.json');

const insertManyMotos = async (req, res, next) => {
  try {
    await Moto.insertMany(motos.results);
    return res.status(201).json('Todas las motos subidos a la BBDD');
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

const updatedMotos = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;
    const motoUpdated = await Moto.findByIdAndUpdate(id, updatedFields, {
      new: true,
      runValidators: true,
    });
    if (!motoUpdated) {
      return res.status(404).json({ message: 'Moto no encontrada' });
    }
    return res.status(200).json(motoUpdated);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const deleteMoto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteMoto = await Moto.findByIdAndDelete(id);
    return res.status(200).json(deleteMoto);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  insertManyMotos,
  getAllMotos,
  updatedMotos,
  deleteMoto
};

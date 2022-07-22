const { sequelize } = require('../models/index');
const { contadores } = require('../models/index')
const { sam_card } = require('../models/index');
// const { find } = require('./PostController');

const consultaContador = async (req, res) => {

  const { page = 0, size = 5 } = req.query;

  let options = {
    limit: +size,
    offset: (+page) * (+size)
  }
  const { count, rows } = await contadores.findAndCountAll(options)
  res.json({ Contadores: 'success', total: count, categories: rows });

}

const consultSam = async (req, res) => {

  const { page = 0, size = 5 } = req.query;

  let options = {
    limit: +size,
    offset: (+page) * (+size)
  }
  const { count, rows } = await sam_card.findAndCountAll(options)
  res.json({ Tabla_Sam: 'success', total: count, categories: rows });

}

module.exports = {
  consultaContador,
  consultSam,
  // index
}
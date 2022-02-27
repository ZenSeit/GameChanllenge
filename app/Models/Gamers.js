const mongoose = require("mongoose");


/**
 * @author "Diego Fernando Becerra Zambrano"
 */
 /**
  * Modelo para la creacion de jugador
  */
const gamerSchema = new mongoose.Schema({
  gamer: {
    type: String,
    unique:[true,'The nickname already exists']
  },
  bet: {
    type: Number,
    min: [1],
    max: [6],
    requiered:true
  },
});

module.exports = mongoose.model("gamers", gamerSchema);

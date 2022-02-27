//Librerias
const { default: mongoose } = require("mongoose");
const modelGame = require("../Models/Game");
const modelGamer = require("../Models/Gamers");

/**
 * @author "Diego Fernando Becerra Zambrano"
 */



/**
 * Por medio del controlador getGames se obtiene todo el listado de los juegos que se registraron
 */
exports.getGames = (req, res) => {
  modelGame.find({}, (err, docs) => {
    res.send(docs);
  });
};


/**
 * Por medio de este controlador se puede crear un juego de 3 jugadores, para esto se hace uso de dos colecciones,
 * una tiene los jugadores y otra tiene los juegos en curso con los jugadores que estan asociados, como parametros del
 * body se debe enviar los nicknames de los jugadores y las apuestas respectivas.
 */
exports.insertGame = async (req, res) => {
  try {
    const ga = req.body.gamer;
    const be = req.body.bet;
      var gamer = await modelGamer.insertMany([ //se insertan 3 jugadores en una misma peticion
        { gamer: ga[0], bet: be[0] },
        { gamer: ga[1], bet: be[1] },
        { gamer: ga[2], bet: be[2] },
      ]);
      const gamers = {
        gamer: [ //Se asocioan los jugadores a un juego
          mongoose.Types.ObjectId(gamer[0]),
          mongoose.Types.ObjectId(gamer[1]),
          mongoose.Types.ObjectId(gamer[2]),
        ],
      };
      var game = await modelGame.create(gamers); //Creacion del juego
      const fullgame = await modelGame.aggregate([
        {
          $lookup: { //Se usan filtros para mostrar la informacion mas organizada, se relacionan las colecciones
            from: "gamers",
            localField: "gamer",
            foreignField: "_id",
            as: "allgamers",
          },
        },
        { $unwind: "$allgamers" },
        {
          $match: {
            gamer: [
              mongoose.Types.ObjectId(gamer[0]),
              mongoose.Types.ObjectId(gamer[1]),
              mongoose.Types.ObjectId(gamer[2]),
            ],
          },
        },
      ]);
      res.send(fullgame);
    
  } catch {
    res.status(501).send("Something is wrong");
  }
};


/**
 * Por medio de este controlador se inicia el juego y se obtiene el respectivo ganar que se puede ver el la respuesta 
 * arrojando el id que posee el jugador
 */
exports.startGame = async (req, res) => {
  try {
    const num = Math.floor(Math.random() * (3 - 0)); //numero aleatorio para seleccionar al ganador entre los participantes
    const winner = await modelGame.findOne({inProgress:true});
    if(winner!==null){ //verificacion de que existen juegos activos por jugarse
    const upwinner = await modelGame.findByIdAndUpdate({_id:winner.id},{winner:winner.gamer[num],inProgress:false})
    const winnergame = await modelGame.findById({_id:upwinner._id}); //Obteniendo la informacion con el ganador impreso
    res.send(winnergame)
    }else{
      res.send("There aren't active games yet. Create a new game")
    }
  } catch {
    res.status(501).send("Something is wrong");
  }
};

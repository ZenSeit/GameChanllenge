const express = require('express')

const controller = require('../Controllers/Game')

const router = express.Router()

const create = 'createGame'
const getGames = 'games'
const startGame = 'startgame'


/**
 * @author "Diego Fernando Becerra Zambrano"
 */


//Ruta para obtener todos los juegos
router.get(
    `/${getGames}`, controller.getGames
)

//Ruta para iniciar el juego
router.get(
    `/${startGame}`, controller.startGame
)

//Ruta para crear un nuevo juego
router.post(
    `/${create}`, controller.insertGame
)

module.exports = router
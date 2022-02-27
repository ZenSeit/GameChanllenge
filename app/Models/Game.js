const mongoose = require('mongoose')


/**
 * @author "Diego Fernando Becerra Zambrano"
 */

/**
 * Modelo para la creacion de juego
 */

const gameSchema = new mongoose.Schema(
    {
        
        gamer:{
            type: [{
                type: mongoose.Types.ObjectId
            }]
        },
        inProgress:{
            type:Boolean,
            default:true
        },
        winner:{
            type:String,
            default:""
        }
    },
    {
        timestamps:true,
        versionkey:false
    }
)

module.exports = mongoose.model('games',gameSchema)
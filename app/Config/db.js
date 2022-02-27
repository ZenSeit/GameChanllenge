const mongoose = require('mongoose')

/**
 * @author "Diego Fernando Becerra Zambrano"
 */

/**
 * Conexion con la base de datos
 */

const db_uri = `mongodb://localhost:27017/GameChallenge`

module.exports = () => {

    const connect = () => {
        mongoose.connect(
            db_uri,
            {
                keepAlive: true,
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            (err) =>{
                if(err) {
                    console.log('We cant connect to database')
                }else{
                    console.log('DataBase connected')
                }
            }
        )
    }

    connect();

}
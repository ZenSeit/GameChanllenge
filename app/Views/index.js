const express = require('express')
const datab = require('../Config/db')
const app=express()

/**
 * @author "Diego Fernando Becerra Zambrano"
 */

const gameRoutes = require('../Routes/Game')

const port = 3000

app.use(express.urlencoded({extended:true}))
app.use(gameRoutes)
app.get('/',(req,res) => {
    res.send("Welcome to The Lucky Game")
})



app.listen(port,() => {console.log("Running at port 3000")})

datab()
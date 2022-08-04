const mongoose = require('mongoose');
require("dotenv").config();

module.exports = () => {
    const connect = () => {
        mongoose.connect(
            process.env.MONGO_URL,
            {
                keepAlive: true,
                useNewUrlParser: true
            },
            (error) => {
                if(error){
                    console.log("DB: Error !! ")
                }else{
                    console.log("Conexión exitosa")
                }
            }
        )
    }
    connect();
}

const mongoose = require("mongoose")
const { DbConfig } = require("./config")

const mongoDbInit = async() => {
    try {
        // console.log(DbConfig)
        await mongoose.connect(DbConfig.mongodb.url, {
            autoCreate: true,
            dbName: DbConfig.mongodb.dbName,
            autoIndex: true
        })
        console.log("Mongodb connected successfully...");
        
    } catch (exception) {
        // console.log(exception)
        throw {code: 500, message: "Mongodb initialization error", status: "MONGODB_CONNECTION_ERR"}
    }
}

module.exports = {
    mongoDbInit
}
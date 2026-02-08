const {createClient} = require("redis")
const { RedisConfig } = require("./config")

const redisClient = createClient(RedisConfig)

redisClient.on("error", (err) => {
    console.log("Redish Error", err);
})

redisClient.on("ready", () => {
    console.log("Redis is ready");
})

redisClient.on("end", () => {
    console.log("redis Disconnected"); 
})

const redisConnect = async() => {
    await redisClient.connect()
    console.log("Redis connected successfully");
}

module.exports = {redisClient, redisConnect}
const { redisClient } = require("../config/redis.config");

class RedisService {
  async setCache(key, value, ttl = 60) {
    await redisClient.set(key, JSON.stringify(value), {
      EX: ttl,
    });
  }

  async getCache(key) {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  }

  async deleteCache(key) {
    await redisClient.del(key);
  }
}

const redisService = new RedisService();

module.exports = redisService;

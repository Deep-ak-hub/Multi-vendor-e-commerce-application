const { redisClient } = require("../config/redis.config");

class RedisService {
  async setCache(key, value, ttl = 60) {
    // redis only stores sting value so we are converting
    const stringValue = JSON.stringify(value);

    await redisClient.set(key, stringValue, { EX: ttl });
  }

  async getCache(key) {
    const data = await redisClient.get(key);

    return data ? JSON.parse(data) : null;
  }

  async deleteCache(key) {
    await redisClient.del(key);
  }

  async deleteByPattern(pattern) {
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
      await redisClient.del(keys);
    }
  }

  async exists(key) {
    return await redisClient.exists(key);
  }

  async expire(key, ttl) {
    return await redisClient.expire(key, ttl);
  }

  // Counter Functions
  async increment(key) {
    return await redisClient.incr(key);
  }

  async decrement(key) {
    return await redisClient.decr(key);
  }
}

const redisService = new RedisService();

module.exports = redisService;

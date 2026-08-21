import IORedis from "ioredis";
import envConfig from "./env";

export const connection = new IORedis({
  host: envConfig.redis.host,
  port: envConfig.redis.port,
  maxRetriesPerRequest: null,
});

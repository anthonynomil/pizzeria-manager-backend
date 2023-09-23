import { cleanEnv, host, num, str } from "envalid";
import process from "process";
import logger from "config/logger";

const envSpecs = {
  //DB
  DB_DIALECT: str({ choices: ["mysql", "postgres", "sqlite", "mariadb", "mssql", "db2", "snowflake", "oracle"] }),
  DB_HOST: host(),
  DB_NAME: str(),
  DB_USER: str(),
  DB_PASSWORD: str(),
  DB_PORT: num(),

  //SERVER
  SERVER_HOST: host(),
  SERVER_PORT: num(),
  ENV: str(),

  //JWT
  JWT_SECRET: str(),
  JWT_REFRESH_EXPIRATION_DAYS: num(),
  JWT_ADMIN_REFRESH_EXPIRATION_DAYS: num(),
  JWT_ACCESS_EXPIRATION_MINUTES: num(),
};

const env = cleanEnv(process.env, envSpecs, {
  reporter: ({ errors }) => {
    if (Object.keys(errors).length === 0) return;
    logger.error("Invalid environment variables: " + Object.keys(errors).join(", "));
    process.exit(1);
  },
});

export default env;

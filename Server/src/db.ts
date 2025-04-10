import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    logging: console.log,
  }
);

export default sequelize;
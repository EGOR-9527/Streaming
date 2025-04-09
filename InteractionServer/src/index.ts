import install from "./install";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from './db';
import router from './router';

dotenv.config({ path: '.env' });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", router);
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

const start = async () => {
  try {
    await install()

    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err: any) {
    console.error(`Error starting the server: ${err.message}`);
    process.exit(1);
  }
};

start();

import install from "./install";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./db";
import router from "./router";
import path from "path";

import { User, Channel, StreamRecording } from "./model/model";

dotenv.config({ path: ".env" });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(express.json());
app.use("/api", router);
app.use("/imgs", express.static(path.join(__dirname, "imgs")));

const start = async () => {
  try {
    console.log("process.env.CLIENT_URL:", process.env.CLIENT_URL);

    await install();

    await sequelize.authenticate();

    await sequelize.sync();
    await Channel.sync();
    await StreamRecording.sync();
    await User.sync();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err: any) {
    console.error(`Error starting the server: ${err.message}`);
    process.exit(1);
  }
};

start();

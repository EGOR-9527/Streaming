import express from "express";
import ControllerUser  from "./controller/user";

const router = express.Router();

router.post("/registration", ControllerUser.registration);
router.post("/login", ControllerUser.login);

export default router;
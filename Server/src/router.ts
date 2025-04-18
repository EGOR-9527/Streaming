import express from "express";
import ControllerUser  from "./controller/user";
import { upload } from "./middleware/uploadMiddleware";


const router = express.Router();

router.post("/registration", ControllerUser.registration);
router.post("/login", ControllerUser.login);
router.post("/logout", ControllerUser.logout);
router.patch('/users/:id/avatar', upload, ControllerUser.editedImg);
router.put("/edited/name/:id", ControllerUser.editedName);

export default router;
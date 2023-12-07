import { Router } from "express";
import {
  RegisterUser,
  Login,
} from "./Controller";

const router = Router();

router.post("/user/register", RegisterUser);
router.post("/user/login", Login);


export default router;

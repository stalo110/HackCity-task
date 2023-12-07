import express, { Request, Response } from "express";
import component from "../component";

const router = express.Router();

router.get("/", (_: Request, res: Response) =>
  res.status(200).json({ message: "success" })
  );

router.use("/api/v1", component.Users.routes);

export default router;

import express, { Request, Response } from "express";
import component from "../component";

const router = express.Router();

router.get("/", (_: Request, res: Response) =>
  res.status(200).json({ message: "success" })
  );
// router.use("/api/v1", component.task.routes);
router.use("/api/v1", component.Users.routes);
// router.use("/api/v1", component.leave.routes);
// router.use("/api/v1", component.PayRise.routes);
// router.use("/api/v1", component.project.routes);

export default router;

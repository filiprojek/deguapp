import { Request, Response, Router } from "express";
import path from "path";
//import authRoutes from "./authRoutes";
export const router = Router();

//router.use("/api/auth", authRoutes);

//router.get("*", (req: Request, res: Response) => {
//  res.sendFile(path.join(__dirname, "../views/index.html"));
//});

// 404
router.use((req: Request, res: Response) => {
  res.status(404).send("Error 404\n");
});

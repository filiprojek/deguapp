import { Request, Response, Router } from "express";
import path from "path";
import api_v1 from "./api_v1";
export const router = Router();

router.use("/api/v1", api_v1);

//router.get("*", (req: Request, res: Response) => {
//  res.sendFile(path.join(__dirname, "../views/index.html"));
//});

// 404
router.use((req: Request, res: Response) => {
  res.status(404).send("Error 404\n");
});

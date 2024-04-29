import { Request, Response } from "express";

export function login_post(req: Request, res: Response) {
  res.send("logged in");
}

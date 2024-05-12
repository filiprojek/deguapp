import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { Log } from "nork";
import { Docs } from "../services/docsService";

new Docs("docs", "get_all", "/api/v1", "GET", "Get docs json", undefined, undefined, "docs json");
export function docs_get(req: Request, res: Response) {
	try {
		res.json(JSON.parse(fs.readFileSync(path.join(__dirname, "../public/api.json")).toString()));
	} catch (err: any) {
		res.status(500).json(Log.error(500, "api.json docs file does not exists under public folder"));
	}
}

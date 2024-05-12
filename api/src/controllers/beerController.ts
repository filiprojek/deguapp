import { Request, Response } from "express";
import Beer from "../models/Beer";
import { isValidObjectId, Types } from "mongoose";
import fs from "fs";
import path from "path";
import { Log } from "nork";
import Docs from "../services/docsService";
import { addExam, delExam, editExam, IBeer } from "../validators/beerValidator";

new Docs(
	"beer",
	"add",
	"/api/v1/beer/add",
	"POST",
	"beer add api",
	undefined,
	{ ...addExam, photos: "optional field | max 4 images | formData" },
	"status object | beer object",
);
export async function add_post(req: Request, res: Response) {
	try {
		if (req.files) {
			req.body.imgs = [];
			const files: any = req.files;
			files.forEach((el: any) => {
				req.body.imgs.push(el.filename);
			});
		}
		const beer = new Beer(req.body);
		await beer.save();
		res.status(201).json(Log.info(201, "beer was created", beer));
	} catch (err: any) {
		Log.error(500, "error in add_post", err);
		res.status(500).json(Log.error(500, "something went wrong"));
	}
}

new Docs(
	"beer",
	"get",
	"/api/v1/beer/get",
	"GET",
	"beer get api",
	undefined,
	undefined,
	"status object | array of beer objects",
);
export async function get_get(req: Request, res: Response) {
	try {
		const beer = await Beer.find({}, "-__v");
		res.status(200).json(Log.info(200, "beers fetched", beer));
	} catch (err: any) {
		Log.error(500, "error in get_get", err);
		res.status(500).json(Log.error(500, "something went wrong"));
	}
}

new Docs("beer", "del", "/api/v1/beer/del", "POST", "beer del api", undefined, delExam, "status object");
export async function del_post(req: Request, res: Response) {
	try {
		if (!isValidObjectId(req.body._id)) throw Log.error(400, "this is not valid _id");

		const beer = await Beer.deleteOne(new Types.ObjectId(req.body._id));

		if (beer.deletedCount > 0) {
			res.status(200).json(Log.info(200, `beer ${req.body._id} deleted`));
			return;
		}
		throw Log.error(400, `beer ${req.body._id} does not exist`);
	} catch (err: any) {
		if (err.code) {
			res.status(err.code).json(err);
			return;
		}
		Log.error(500, "error in del_post", err);
		res.status(500).json(Log.error(500, "something went wrong"));
	}
}

new Docs(
	"beer",
	"edit",
	"/api/v1/beer/edit",
	"POST",
	"beer edit api",
	undefined,
	{ ...editExam, photos: "optional field | max 4 images | formData" },
	"status object |  beer data",
);
export async function edit_post(req: Request, res: Response) {
	try {
		if (!isValidObjectId(req.body._id)) throw Log.error(400, "this is not valid _id");

		if (req.files) {
			if (!req.body.imgs) {
				req.body.imgs = [];
			}

			if (typeof req.body.imgs == "string") {
				req.body.imgs = [req.body.imgs];
			}

			if (req.body.imgs.length + req.files.length > 4) {
				req.body.imgs.forEach((el: string[]) => {
					fs.rmSync(path.join(__dirname, "../../uploads/" + el));
				});
				throw Log.error(400, "exceeds the 4 image limit");
			}

			const files: any = req.files;
			files.forEach((el: any) => {
				req.body.imgs.push(el.filename);
			});
		}

		const payload = { ...req.body };
		const beer = await Beer.findOneAndUpdate(new Types.ObjectId(req.body._id), payload, { new: true });
		res.json(Log.info(200, `beer ${req.body._id} edited`, beer));
	} catch (err: any) {
		if (err.code && typeof err.code == "number") {
			res.status(err.code).json(err);
			return;
		}
		Log.error(500, "error in del_post", err);
		res.status(500).json(Log.error(500, "something went wrong"));
	}
}

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../config/environment";
import { Log } from "nork";
import User from "../models/User";
import { isValidObjectId } from "mongoose";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
	const token = req.cookies?.jwt;

	if (token) {
		jwt.verify(token, env.JWT_SECRET, async (err: any, decodedToken: any) => {
			if (err) {
				// console.error(err.message)
				res.status(401).send(Log.error(401, "user is not authenticated"));
			}
			if (!err) {
				const user = await User.findById(decodedToken.id);
				if (user === null) {
					res.status(401).send(Log.error(401, "user is not authenticated"));
					return;
				}
				res.locals.user = user;
				Log.info(100, "user is authenticated");
				next();
			}
		});
	}

	if (!token) {
		res.status(401).send(Log.error(401, "user is not authenticated"));
	}
}

export function requireVerified(req: Request, res: Response, next: NextFunction) {
	if (res.locals.user._id) {
		if (res.locals.user.verified) {
			Log.info(100, "user is verified");
			next();
			return;
		}

		res.status(403).json(Log.error(403, "user is not verified"));
		return;
	}

	if (!res.locals.user._id) {
		res.status(401).send(Log.error(401, "user is not authenticated"));
		return;
	}
}

export class requireRole {
	static Admin(req: Request, res: Response, next: NextFunction) {
		if (res.locals.user.admin) {
			Log.info(100, "user is admin");
			next();
			return;
		}
		res.status(403).json(Log.error(403, "insufficient permissions"));
		return;
	}
	static Owner(req: Request, res: Response, next: NextFunction) {
		try {
			if (!isValidObjectId(req.body.domain_id)) {
				throw Log.error(400, "neznámé domain_id");
			}

			const domain = res.locals.user.domains.filter((domain: any) => domain.domain_id == req.body.domain_id);
			console.log(domain);

			if (domain.length < 1) {
				throw Log.error(400, "neznámé domain_id");
			}

			if (domain[0].role == 1) {
				Log.info(100, "user is owner");
				next();
				return;
			}

			res.status(403).json(Log.error(403, "insufficient permissions"));
			return;
		} catch (err: any) {
			res.status(400).json(err);
		}
	}
	static Editor(req: Request, res: Response, next: NextFunction) {}
	static Guest(req: Request, res: Response, next: NextFunction) {}
}

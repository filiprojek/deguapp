import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from '../config/environment';
import Docs from '../services/docsService';
import User from '../models/User';
import {Log} from 'nork'
import { IUser, signupExam, ISignin, signinExam } from '../validators/authValidator';

new Docs('user', 'signup', '/api/v1/auth/signup', 'POST', 'user signup api', undefined, signupExam, 'status object');
export async function signup_post(req: Request, res: Response) {
	try {
		const payload: IUser = req.body;

		payload.password = await bcrypt.hash(payload.password, 12);
		const user = new User(payload);
		await user.save();

		res.status(201).json(Log.info(201, 'user was successfully signed up'));
	} catch (err: any) {
		if (err.code == 11000) {
			res.status(400).json(Log.error(400, 'this user already exists'));
			return;
		}
		Log.error(500, err);
		res.status(500).json(Log.error(500, 'something went wrong'));
	}
}

new Docs('user', 'signin', '/api/v1/auth/signin', 'POST', 'user signin api', undefined, signinExam, 'status object');
export async function signin_post(req: Request, res: Response) {
	try {
		const payload: ISignin = req.body;

		const user = await User.findOne({ email: payload.email });
		if (!user) {
			res.cookie('jwt', '', { httpOnly: true, maxAge: 0 });
			res.cookie('auth', false, { httpOnly: false, maxAge: 0 });
			res.status(401).json(Log.error(401, 'email or password is wrong'));
			return;
		}

		if (await bcrypt.compare(payload.password, user.password)) {
			const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds
			const createToken = (id: any) => {
				return jwt.sign({ id }, env.JWT_SECRET, {
					expiresIn: maxAge
				});
			};

			const token = createToken(user._id);
			res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
			res.cookie('auth', true, { httpOnly: false, maxAge: maxAge * 1000 });

			res.json(Log.info(200, 'user is logged in', {jwt: token}));
			return;
		}

		res.cookie('jwt', '', { httpOnly: true, maxAge: 0 });
		res.cookie('auth', false, { httpOnly: false, maxAge: 0 });
		res.status(401).json(Log.error(401, 'email or password is wrong'));
	} catch (err: any) {
		Log.error(500, err);
		res.status(500).json(Log.error(500, 'something went wrong'));
	}
}

new Docs('user', 'logout', '/api/v1/auth/logout', 'POST', 'user logout api', undefined, {}, 'status object');
export function logout_post(req: Request, res: Response) {
	res.cookie('jwt', '', { httpOnly: true, maxAge: 0 });
	res.cookie('auth', false, { httpOnly: false, maxAge: 0 });
	res.json(Log.info(200, 'user was logged out'));
}

new Docs('user', 'status', '/api/v1/auth/status', 'GET', 'user login status api', undefined, undefined, 'status code | user object');
export function status_get(req: Request, res: Response) {
	let userObject = res.locals.user;
	userObject.password = undefined;
	userObject.__v = undefined;
	res.status(200).json(Log.info(200, 'user is logged in', userObject));
}
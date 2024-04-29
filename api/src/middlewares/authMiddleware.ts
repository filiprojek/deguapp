import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import env from '../config/environment'
import { Err, Succ } from '../services/globalService'
import User from '../models/User' // uncomment this

export function requireAuth(req: Request, res: Response, next: NextFunction) {
	const token = req.cookies.jwt
	new Err(500, 'uncomment code in authMiddleware before using!')
	if (token) {
		jwt.verify(token, env.JWT_SECRET, async (err: any, decodedToken: any) => {
			if (err) {
				// console.error(err.message)
				res.status(401).json(new Err(401, 'user is not authenticated'))
			}
			if (!err) {
				const user = (async () => {
					if (env.NORK.db.orm) {
						if (env.NORK.db.orm == 'sequelize') {
							return await User.findByPk(decodedToken.id)
						}
						if (env.NORK.db.orm == 'mongoose') {
							return await User.findById(decodedToken.id)
						}
					} else {
						return null
					}
				})()

				if (user === null) {
					res.status(401).json(new Err(401, 'user is not authenticated'))
					return
				}

				res.locals.user = user
				new Succ(100, 'user is authenticated')
				next()
			}
		})
	}

	if (!token) {
		res.status(401).json(new Err(401, 'user is not authenticated'))
	}
}

export function requireVerified(req: Request, res: Response, next: NextFunction) {
	if (res.locals.user._id) {
		if (res.locals.user.verified) {
			new Succ(100, 'user is verified')
			next()
			return
		}

		res.status(403).json(new Err(403, 'user is not verified'))
		return
	}

	if (!res.locals.user._id) {
		res.status(401).json(new Err(401, 'user is not authenticated'))
		return
	}
}

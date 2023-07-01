import { Request, Response } from 'express'
import User from '../models/User'

export function add_post(req: Request, res: Response) {
	const user = new User(req.body)
	user.save()
	res.json({status: 'ok'})
	return 0
}

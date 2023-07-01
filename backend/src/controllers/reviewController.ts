import { Request, Response } from 'express'
import Review from '../models/Review'

export const root_get = (req: Request, res: Response) => {
	res.render('home')
	return true
}

export function add_post(req: Request, res: Response) {
	console.log(req.body)
	const review = new Review(req.body);
	review.save()
	res.json({status: "ok"})
}


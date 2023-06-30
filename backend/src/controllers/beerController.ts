import { Request, Response } from 'express'
import Beer from '../models/Beer'

export function add_post(req: Request, res: Response) {
	console.log(req.body, 'request body')	
	const beer = new Beer(req.body)
	beer.save()
	res.json({status: 'ok'})
	return 0
}

export function del_post(req: Request, res: Response) {
	return 0
}

export function edit_post(req: Request, res: Response) {
	res.json({status: 'ok'})
	return 0
}

export async function get_get(req: Request, res: Response) {
	const beer = await Beer.find();
	res.json(beer)
	return 0
}


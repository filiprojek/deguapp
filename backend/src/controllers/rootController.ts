import { Request, Response } from 'express'

export function root_get(req: Request, res: Response) {
	res.render('home')
	return true
}

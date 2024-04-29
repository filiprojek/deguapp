import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { Err } from '../services/globalService'

class Middleware {
	handleValidationError(req: Request, res: Response, next: NextFunction) {
		const error = validationResult(req)
		if (!error.isEmpty()) {
			new Err(400, error)
			return res.status(400).json(new Err(400, 'validation error', error.array()[0]))
		}
		next()
	}
}

export default new Middleware()

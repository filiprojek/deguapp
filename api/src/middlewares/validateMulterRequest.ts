import multer from 'multer';
import {Log} from 'nork'
import { Request, Response, NextFunction } from 'express';

const validateMulterRequestMiddleware = async (err: any, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof multer.MulterError) {
		Log.error(500, 'error while processing uploaded files', JSON.stringify(err));
		res.status(400).json(Log.error(400, 'error while processing uploaded files'));
		return;
	} else {
		next();
	}
};

export default validateMulterRequestMiddleware;

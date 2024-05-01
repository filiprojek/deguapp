import { Request, Response, NextFunction } from 'express';
import { object, AnySchema } from 'yup';
import { Log } from 'nork';

const validate = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
	try {
		await schema.validate(req.body);

		next();
	} catch (err: any) {
		return res.status(400).json(Log.error(400, 'validation error', err));
	}
};

export default validate;

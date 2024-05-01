import path from 'path';
import { Schema, model } from 'mongoose';
import { IUser } from '../validators/authValidator';

const schema = new Schema<IUser>(
	{
		username: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
);

export default model(path.basename(__filename).split('.')[0], schema);

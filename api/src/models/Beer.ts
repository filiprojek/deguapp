import path from 'path';
import { Schema, model } from 'mongoose';
import { IBeer } from '../validators/beerValidator';

const schema = new Schema<IBeer | any>(
	{
		name: {
			type: String,
			required: true
		},
		degree: {
			type: Number,
			required: true
		},
		packaging: {
			type: String,
			required: true
		},
		brand: {
			type: String,
			required: true
		},
		imgs: {
			type: Array,
			required: false,
			default: []
		}
	},
	{
		timestamps: true
	}
);

export default model(path.basename(__filename).split('.')[0], schema);
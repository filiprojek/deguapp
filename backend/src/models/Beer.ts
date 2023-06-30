import { Schema, model } from 'mongoose'
import path from 'path'

const schema = new Schema<any>(
	{
		brand: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		degree: {
			type: String,
			required: true,
		},
		packaging: {
			type: Number,
			required: true,
		},
		note: {
			type: String,
			required: false
		}
	},
	{
		timestamps: true,
	},
)

export default model(path.basename(__filename).split('.')[0], schema)

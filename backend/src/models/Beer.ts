import { Schema, model } from 'mongoose'
import path from 'path'

const schema = new Schema<any>(
	{
		name: {
			type: String,
			required: true
		},
		degree: {
			type: Number,
			required: true,
		},
		percentage: {
			type: Number,
			required: true
		},
		packaging: {
			type: Number,
			required: true
		},
		note: {
			type: String,
			required: false
		},
		photo: {
			type: Array,
			required: false,
		}
	},
	{
		timestamps: true,
	},
)

export default model(path.basename(__filename).split('.')[0], schema)


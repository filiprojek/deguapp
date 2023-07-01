import path from 'path'
import { Schema, model } from 'mongoose'

export const schemaName = path.basename(__filename).split('.')[0]
const schema = new Schema(
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
		},
	},
	{
		timestamps: true
	}
)

export default model(path.basename(__filename).split('.')[0], schema)

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
		domains: [
			{
				role: Number,
				domain_id: String
			}
		],
		verification_code: {
			type: Number,
			length: 6
		},
		verified: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true
	}
)

export default model(path.basename(__filename).split('.')[0], schema)

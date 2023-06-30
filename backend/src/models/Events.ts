import { Schema, model } from 'mongoose'
import path from 'path'

export const schemaName = path.basename(__filename).split('.')[0]
	{
		title: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
)

export default model(path.basename(__filename).split('.')[0], schema)

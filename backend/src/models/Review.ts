import { Schema, model } from 'mongoose'
import path from 'path'

const schema = new Schema<any>(
	{
		beer_id: {
			type: String,
			required: true
		},
		logo: {
			type: Number,
			required: true
		},
		aroma: {
			type: Number,
			required: true
		},
		foam: {
			type: Number,
			required: true
		},
		color: {
			type: Number,
			required: true
		},
		bitterness: {
			type: Number,
			required: true
		},
		sweetness: {
			type: Number,
			required: true
		},
		note: {
			type: String,
			required: false
		},
		again: {
			type: Boolean,
			required: true
		},
		overall_rating: {
			type: Number,
			required: true
		},
		final_rating: {
			type: Number,
			required: true
		},
		date: {
			type: Date,
			required: true,
		},
		participants: {
			type: Array,
			required: false,
		},
		signature: {
			type: String,
			required: false
		}
	},
	{
		timestamps: true,
	},
)

export default model(path.basename(__filename).split('.')[0], schema)

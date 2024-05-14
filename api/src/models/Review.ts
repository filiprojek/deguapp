import path from "path";
import { Schema, model } from "mongoose";
import { IReview } from "../validators/reviewValidator";

const schema = new Schema<IReview | any>(
	{
		foam: {
			type: Number,
			required: true,
		},
		bitter_sweetness: {
			type: Number,
			required: true,
		},
		taste: {
			type: Number,
			required: true,
		},
		packaging: {
			type: Number,
			required: true,
		},
		sourness: {
			type: Boolean,
			required: true,
		},
		would_again: {
			type: Boolean,
			required: true,
		},
		beer_id: {
			type: String,
			required: true,
		},
		user_id: {
			type: String,
			required: true,
		}
	},
	{
		timestamps: true,
	},
);

export default model(path.basename(__filename).split(".")[0], schema);

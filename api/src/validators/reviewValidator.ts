import * as yup from "yup";
import mongoose, { Schema } from "mongoose";

interface mongooseAddition {
	_id?: Schema.Types.ObjectId;
	createdAt?: Schema.Types.Date;
	updatedAt?: Schema.Types.Date;
}

let objectIdSchema = yup
	.string()
	.test("is-objectId", "Invalid ObjectId", (value: any) => mongoose.Types.ObjectId.isValid(value));

// Add
export const add = yup.object({
	beer_id: objectIdSchema,
	foam: yup.number().min(1).max(3).required(),
	bitter_sweetness: yup.number().min(1).max(5).required(),
	taste: yup.number().min(1).max(5).required(),
	packaging: yup.number().min(1).max(5).required(),
	sourness: yup.boolean().required(),
	would_again: yup.boolean().required(),
	user_id: yup.string().notRequired(),
	note: yup.string().notRequired() 
});
export interface IReview extends yup.InferType<typeof add>, mongooseAddition {}
export const addExam: IReview = {
	beer_id: "6352b303b71cb62222f39895",
	foam: 3,
	bitter_sweetness: 2,
	taste: 5,
	packaging: 3,
	sourness: false,
	would_again: true,
	note: "Pretty good beer"
};

// Remove
export const del = yup.object({
	_id: objectIdSchema.required(),
});
export interface IDel extends yup.InferType<typeof del> {}
export const delExam: IDel = {
	_id: "6352b303b71cb62222f39895",
};

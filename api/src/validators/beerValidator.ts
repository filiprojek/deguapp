import * as yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(yup);
import { Schema } from 'mongoose';

interface mongooseAddition {
	_id?: Schema.Types.ObjectId;
	createdAt?: Schema.Types.Date;
	updatedAt?: Schema.Types.Date;
}

// Create
export const add = yup.object({
	brand: yup.string().required(),
	name: yup.string().required(),
	degree: yup.number().required(),
	packaging: yup.string().required()
});
export interface IBeer extends yup.InferType<typeof add>, mongooseAddition {}
export const addExam: IBeer = {
	brand: 'Pilsner Urqell',
	name: 'Kozel',
	degree: 11,
	packaging: 'can'
};

// Remove
export const del = yup.object({
	_id: yup.string().required()
});
export interface IDel extends yup.InferType<typeof del> {}
export const delExam: IDel = {
	_id: '6352b303b71cb62222f39895'
};

// Update
export const edit = yup.object({
	_id: yup.string().required(),
	brand: yup.string(),
	name: yup.string(),
	degree: yup.number(),
	packaging: yup.string(),

  //imgs: yup.mixed().when('$imgs', (imgs, schema) => 
  //  Array.isArray(imgs) ? schema.array() : schema.string()
  //)

  imgs: yup.mixed().test('is-array-or-string', 'imgs must be either an array or a string', value =>  
    Array.isArray(value) || typeof value === 'string')

	//imgs: yup.mixed().when('isArray', {
	//	is: Array.isArray,
	//	then: yup.array(),
	//	otherwise: yup.string()
	//})
});
export interface IEdit extends yup.InferType<typeof edit> {}
export const editExam: IEdit = {
	_id: '6355b95dc03fad77bc380146',
	brand: 'Pilsner Urqell',
	name: 'Radegast',
	degree: 12,
	packaging: 'bottle',
	imgs: []
};

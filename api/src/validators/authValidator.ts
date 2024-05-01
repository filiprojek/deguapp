import * as yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(yup);
import { Schema } from 'mongoose';

interface mongooseAddition {
	_id?: Schema.Types.ObjectId;
	createdAt?: Schema.Types.Date;
	updatedAt?: Schema.Types.Date;
}

// SignUp
export const signup = yup.object({
	username: yup.string().required(),
	email: yup.string().email().required(),
	password: yup.string().min(8).minLowercase(1).minUppercase(1).minNumbers(1).required()
});
export interface IUser extends yup.InferType<typeof signup>, mongooseAddition {}
export const signupExam: IUser = {
	username: 'testuser',
	email: 'text@example.com',
	password: 'Test1234'
};

// SignIn
export const signin = yup.object({
	email: yup.string().email().required(),
	password: yup.string().min(8).minLowercase(1).minUppercase(1).minNumbers(1).required()
});
export interface ISignin extends yup.InferType<typeof signin>, mongooseAddition {}
export const signinExam: ISignin = {
	email: 'text@example.com',
	password: 'Test1234'
};
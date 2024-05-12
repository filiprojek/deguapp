import { Request, Response } from 'express';
import Review from "../models/Review"
import { isValidObjectId, Types } from 'mongoose';
import {Log} from 'nork'
import Docs from '../services/docsService';
import { addExam, delExam, IReview } from '../validators/reviewValidator';

new Docs('review', 'add', '/api/v1/review/add', 'POST', 'review add api', undefined, addExam, 'status object | review object');
export async function add_post(req: Request, res: Response) {
  try {
    const data: IReview = req.body;
    const review = new Review(data)
    await review.save()
    res.status(201).json(Log.info(201, 'review was added', review))
  } catch (err) {
    Log.error(500, 'error while adding review', err)
    res.status(500).json(Log.error(500, 'something went wrong'))
  }
}

new Docs('review', 'get', '/api/v1/review/get', 'GET', 'review get api', undefined, undefined, 'status object | array of review objects');
export async function get_get(req: Request, res: Response) {
  try {
    const review = await Review.find({}, '-__v')
    res.status(200).json(Log.info(200, 'reviews fetched', review))
  } catch (err) {
    Log.error(500, 'error while geting reviews', err)
    res.status(500).json(Log.error(500, 'something went wrong'))
  }
}

new Docs('review', 'del', '/api/v1/review/del', 'POST', 'review del api', undefined, delExam, 'status object');
export async function del_post(req: Request, res: Response) {
  try {
		if (!isValidObjectId(req.body._id)) throw Log.error(400, 'this is not valid _id');

    const review = await Review.deleteOne(new Types.ObjectId(req.body._id))

		if (review.deletedCount > 0) {
			res.status(200).json(Log.info(200, `review ${req.body._id} deleted`));
			return;
		}
		throw Log.error(400, `review ${req.body._id} does not exist`);
  } catch (err: any) {
		if (err.code) {
			res.status(err.code).json(err);
			return;
		}
		Log.error(500, 'error in del_post', err);
		res.status(500).json(Log.error(500, 'something went wrong'));
  }
}

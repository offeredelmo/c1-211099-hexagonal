import express from "express";
import { addReviewUsController, deleteReviewController, getReviewByIdController, listAllReviewsController, listReviewByUserController, listReviewsInactiveController } from "./dependecies";

export const reviewRouter = express.Router();

reviewRouter.post('/',addReviewUsController.run.bind(addReviewUsController))
reviewRouter.get('/',listAllReviewsController.run.bind(listAllReviewsController))
reviewRouter.get('/user',listReviewByUserController.run.bind(listReviewByUserController))
reviewRouter.get('/review',getReviewByIdController.run.bind(getReviewByIdController))
reviewRouter.get('/inactive',listReviewsInactiveController.run.bind(listReviewsInactiveController))
reviewRouter.delete('/',deleteReviewController.run.bind(deleteReviewController))





import express from "express";
import { activateReviewController, addReviewUsController, deleteReviewController, getReviewByIdController, inactiveteReviewController, listAllReviewsController, listReviewByUserController, listReviewsInactiveController, updateReviewController } from "./dependecies";

export const reviewRouter = express.Router();

reviewRouter.post('/',addReviewUsController.run.bind(addReviewUsController))
reviewRouter.get('/',listAllReviewsController.run.bind(listAllReviewsController))
reviewRouter.get('/user',listReviewByUserController.run.bind(listReviewByUserController))
reviewRouter.get('/review',getReviewByIdController.run.bind(getReviewByIdController))
reviewRouter.get('/list/inactive',listReviewsInactiveController.run.bind(listReviewsInactiveController))
reviewRouter.delete('/',deleteReviewController.run.bind(deleteReviewController))
reviewRouter.put('/',updateReviewController.run.bind(updateReviewController))
reviewRouter.put('/inactivate',inactiveteReviewController.run.bind(inactiveteReviewController))
reviewRouter.put('/activate',activateReviewController.run.bind(activateReviewController))








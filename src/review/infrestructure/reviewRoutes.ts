import express from "express";
import { activateReviewController, addReviewUsController, deleteReviewController, getReviewByIdController, inactiveteReviewController, listAllReviewsController, listReviewByUserController, listReviewsInactiveController, updateReviewController } from "./dependecies";
import { validateToken } from "../../helpers/veryfyToken";



export const reviewRouter = express.Router();

reviewRouter.post('/',validateToken ,addReviewUsController.run.bind(addReviewUsController))
reviewRouter.get('/',validateToken ,listAllReviewsController.run.bind(listAllReviewsController))
reviewRouter.get('/user',validateToken ,listReviewByUserController.run.bind(listReviewByUserController))
reviewRouter.get('/review',validateToken  ,getReviewByIdController.run.bind(getReviewByIdController))
reviewRouter.get('/list/inactive',validateToken ,listReviewsInactiveController.run.bind(listReviewsInactiveController))
reviewRouter.delete('/',validateToken ,deleteReviewController.run.bind(deleteReviewController))
reviewRouter.put('/',validateToken ,updateReviewController.run.bind(updateReviewController))
reviewRouter.put('/inactivate',validateToken ,inactiveteReviewController.run.bind(inactiveteReviewController))
reviewRouter.put('/activate',validateToken ,activateReviewController.run.bind(activateReviewController))








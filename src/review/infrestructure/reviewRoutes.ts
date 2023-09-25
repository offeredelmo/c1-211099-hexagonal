import express from "express";
import { addReviewUsController } from "./dependecies";

export const reviewRouter = express.Router();

reviewRouter.post('/',addReviewUsController.run.bind(addReviewUsController))
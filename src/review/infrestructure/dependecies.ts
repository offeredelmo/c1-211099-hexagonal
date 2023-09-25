import { MysqlReviewRepository } from "./mysqlReviewRepository";

import { AddReviewUseCase } from "../application/addReviewUseCase";
import { AddReviewController } from "./controllers/addRevieController";



export const mysqlReviewRepository = new MysqlReviewRepository()
export const addReviewUseCase = new AddReviewUseCase(mysqlReviewRepository)
export const addReviewUsController = new AddReviewController(addReviewUseCase)
import { MysqlReviewRepository } from "./mysqlReviewRepository";

import { AddReviewUseCase } from "../application/addReviewUseCase";
import { AddReviewController } from "./controllers/addRevieController";

import { ListAllReviewsUseCase } from "../application/listAllReviewsUseCase";
import { ListAllReviewsController } from "./controllers/listAllReviewController";

import { ListReviewByUserUseCase } from "../application/listReviewsByUserUseCase";
import { ListReviewByUserController } from "./controllers/listReviewByUserController";

import { GetReviewByIdUseCase } from "../application/getReviewByIdUseCase";
import { GetReviewByIdController } from "./controllers/getReviewByIdController";

import { ListReviewsInactiveUseCase } from "../application/listReviewsInactive";
import { ListReviewsInactiveController } from "./controllers/listReviewsInactiveController";

import { DeleteReviewUseCase } from "../application/deleteReviewUseCase";
import { DeleteReviewController } from "./controllers/deleteReviewController";
import { UpdateReviewUseCase } from "../application/updateReviewUseCase";
import { UpdateReviewController } from "./controllers/updateReviewController";
import { InactivateReviewUseCase } from "../application/inactiveReviewUseCase";
import { InactivationReviewController } from "./controllers/inactiveReviewController";
import { ActivateReviewUseCase } from "../application/activateReviewUseCase";
import { ActivateReviewController } from "./controllers/activateReviewController";



export const mysqlReviewRepository = new MysqlReviewRepository()
export const addReviewUseCase = new AddReviewUseCase(mysqlReviewRepository)
export const addReviewUsController = new AddReviewController(addReviewUseCase)

export const listAllReviewsUseCase = new ListAllReviewsUseCase(mysqlReviewRepository)
export const listAllReviewsController = new ListAllReviewsController(listAllReviewsUseCase)

export const listReviewByUserUseCase = new ListReviewByUserUseCase(mysqlReviewRepository)
export const listReviewByUserController = new ListReviewByUserController(listReviewByUserUseCase)

export const getReviewByIdUseCase = new GetReviewByIdUseCase(mysqlReviewRepository)
export const getReviewByIdController = new GetReviewByIdController(getReviewByIdUseCase)

export const listReviewsInactiveUseCase = new ListReviewsInactiveUseCase(mysqlReviewRepository)
export const listReviewsInactiveController = new ListReviewsInactiveController(listReviewsInactiveUseCase)

export const deleteReviewUseCase = new DeleteReviewUseCase(mysqlReviewRepository)
export const deleteReviewController = new DeleteReviewController(deleteReviewUseCase)

export const updateReviewUseCase = new UpdateReviewUseCase(mysqlReviewRepository)
export const updateReviewController = new UpdateReviewController(updateReviewUseCase)

export const inactivateReviewUseCase = new InactivateReviewUseCase(mysqlReviewRepository)
export const inactiveteReviewController = new InactivationReviewController(inactivateReviewUseCase)

export const activateReviewUseCase = new ActivateReviewUseCase(mysqlReviewRepository)
export const activateReviewController = new ActivateReviewController(activateReviewUseCase)
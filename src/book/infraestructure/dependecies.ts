import { MysqlBookRepository } from "./mysqlBookRepository"


import { AddBookUseCase } from "../application/addBookUseCase"
import { AddBookController } from "./controllers/addBookController"

import { ListAllBooksInactiveUseCase } from "../application/listAllBooksInactiveUseCase"
import { ListAllBooksInactiveController } from "./controllers/lisAllBookInactiveController"

import { UpdateBookUseCase } from "../application/updateBookUseCase"
import { UpdateBookController } from "./controllers/updateBookController"


import { DeleteBookUseCase } from "../application/deleteBookUseCase"
import { DeleteBookController } from "./controllers/deleteBookController"

import { GetBookByIdUseCase } from "../application/getBookByIdUseCase"
import { GetBookByIdController } from "./controllers/getBookByIdController"

import { ListAllBookUseCase } from "../application/listAllBooksUseCase"
import { ListAllBookController } from "./controllers/listAllBookContrller"

import { ActivateBookUseCae } from "../application/activeBookUseCase"
import { ActivateBookController } from "./controllers/activateBookController"
import { ListByFilterUseCase } from "../application/listByFilterUseCase"
import { ListByFilterController } from "./controllers/listByFilterController"
import { ListIfReviewUseCase } from "../application/listIfReviewUseCase"
import { ListIfReviewController } from "./controllers/listIfReviewController"

export const mysqlBookRepository = new MysqlBookRepository()
export const listAllBooksUseCase = new ListAllBookUseCase(mysqlBookRepository)
export const listAllBooksController = new ListAllBookController(listAllBooksUseCase)

export const addBookUsecase = new AddBookUseCase(mysqlBookRepository)
export const addBookController = new AddBookController(addBookUsecase)


export const listAllBooksInactive = new ListAllBooksInactiveUseCase(mysqlBookRepository)
export const listAllBooksInactiveController = new ListAllBooksInactiveController(listAllBooksInactive)

export const updateBookUseCase = new UpdateBookUseCase(mysqlBookRepository)
export const updateBookController = new UpdateBookController(updateBookUseCase)


export const deleteBookUseCase = new DeleteBookUseCase(mysqlBookRepository)
export const deleteBookController = new DeleteBookController(deleteBookUseCase)


export const getBookByIdUseCase = new GetBookByIdUseCase(mysqlBookRepository)
export const getBookByIdController = new GetBookByIdController(getBookByIdUseCase)

export const activateBookUseCae = new ActivateBookUseCae(mysqlBookRepository)
export const activateBookController = new ActivateBookController(activateBookUseCae)

export const listByFilterUseCase = new ListByFilterUseCase(mysqlBookRepository)
export const listByFilterController = new ListByFilterController(listByFilterUseCase)

export const listIfReviewUseCase = new ListIfReviewUseCase(mysqlBookRepository)
export const listIfReviewController = new ListIfReviewController(listIfReviewUseCase)
import { AddBookUseCase } from "../application/addBookUseCase"
import { DeleteBookUseCase } from "../application/deleteBookUseCase"
import { GetBookByIdUseCase } from "../application/getBookByIdUseCase"

import { ListAllBooksInactiveUseCase } from "../application/listAllBooksInactiveUseCase"
import { ListAllBookUseCase } from "../application/listAllBooksUseCase"

import { UpdateBookUseCase } from "../application/updateBookUseCase"
import { AddBookController } from "./controllers/addBookController"
import { DeleteBookController } from "./controllers/deleteBookController"
import { GetBookByIdController } from "./controllers/getBookByIdController"
import { ListAllBooksInactiveController } from "./controllers/lisAllBookInactiveController"

import { ListAllBookController } from "./controllers/listAllBookContrller"
import { UpdateBookController } from "./controllers/updateBookController"
import { MysqlBookRepository } from "./mysqlBookRepository"


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
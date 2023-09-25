import express from "express";
import { addBookController, deleteBookController, getBookByIdController, listAllBooksController, listAllBooksInactiveController, updateBookController } from "./dependecies";
import { validationAddBook, validationUpdateBook, validationUuid } from "./validators/books";

export const bookRoutes = express.Router();

bookRoutes.get('/',listAllBooksController.run.bind(listAllBooksController))
bookRoutes.post('/',validationAddBook,addBookController.run.bind(addBookController))
bookRoutes.get('/inactive',listAllBooksInactiveController.run.bind(listAllBooksInactiveController))
bookRoutes.put("/",validationUpdateBook,updateBookController.run.bind(updateBookController))
bookRoutes.delete("/",validationUuid,deleteBookController.run.bind(deleteBookController))
bookRoutes.get("/id",getBookByIdController.run.bind(getBookByIdController))






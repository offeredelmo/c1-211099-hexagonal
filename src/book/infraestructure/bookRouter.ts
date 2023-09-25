import express from "express";
import { activateBookController, addBookController, deleteBookController, getBookByIdController, listAllBooksController, listAllBooksInactiveController, listByFilterController, listIfReviewController, updateBookController } from "./dependecies";
import { validationAddBook, validationUpdateBook, validationUuid, validationListByFilter } from "./validators/books";

export const bookRoutes = express.Router();

bookRoutes.get('/',listAllBooksController.run.bind(listAllBooksController))

bookRoutes.post('/',validationAddBook,addBookController.run.bind(addBookController))

bookRoutes.get('/inactive',listAllBooksInactiveController.run.bind(listAllBooksInactiveController))

bookRoutes.put("/",validationUpdateBook,updateBookController.run.bind(updateBookController))

bookRoutes.delete("/",validationUuid,deleteBookController.run.bind(deleteBookController))

bookRoutes.get("/id",validationUuid,getBookByIdController.run.bind(getBookByIdController))

bookRoutes.put("/id",validationUuid,activateBookController.run.bind(activateBookController))

bookRoutes.get("/filter",validationListByFilter,listByFilterController.run.bind(listByFilterController))

bookRoutes.get("/whit/review",listIfReviewController.run.bind(listIfReviewController))









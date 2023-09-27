import express from "express";
import { activateBookController, addBookController, deleteBookController, getBookByIdController, listAllBooksController, listAllBooksInactiveController, listByFilterController, listIfReviewController, updateBookController } from "./dependecies";


export const bookRoutes = express.Router();

bookRoutes.get('/',listAllBooksController.run.bind(listAllBooksController))

bookRoutes.post('/',addBookController.run.bind(addBookController))

bookRoutes.get('/inactive',listAllBooksInactiveController.run.bind(listAllBooksInactiveController))

bookRoutes.put("/",updateBookController.run.bind(updateBookController))

bookRoutes.delete("/",deleteBookController.run.bind(deleteBookController))

bookRoutes.get("/id",getBookByIdController.run.bind(getBookByIdController))

bookRoutes.put("/id",activateBookController.run.bind(activateBookController))

bookRoutes.get("/filter",listByFilterController.run.bind(listByFilterController))

bookRoutes.get("/whit/review",listIfReviewController.run.bind(listIfReviewController))









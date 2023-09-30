import express from "express";
import { activateBookController, addBookController, deleteBookController, getBookByIdController, listAllBooksController, listAllBooksInactiveController, listByFilterController, listIfReviewController, updateBookController } from "./dependecies";
import { validateToken } from "../../helpers/verifyToken";


export const bookRoutes = express.Router();

bookRoutes.get('/',validateToken ,listAllBooksController.run.bind(listAllBooksController))

bookRoutes.post('/',validateToken ,addBookController.run.bind(addBookController))

bookRoutes.get('/inactive',validateToken ,listAllBooksInactiveController.run.bind(listAllBooksInactiveController))

bookRoutes.put("/",validateToken ,updateBookController.run.bind(updateBookController))

bookRoutes.delete("/",validateToken ,deleteBookController.run.bind(deleteBookController))

bookRoutes.get("/id",validateToken ,getBookByIdController.run.bind(getBookByIdController))

bookRoutes.put("/id",validateToken ,activateBookController.run.bind(activateBookController))

bookRoutes.get("/filter",validateToken ,listByFilterController.run.bind(listByFilterController))

bookRoutes.get("/whit/review",validateToken ,listIfReviewController.run.bind(listIfReviewController))









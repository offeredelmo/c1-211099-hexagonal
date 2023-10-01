import express from "express";
import { activateBookController, addBookController, deleteBookController, getBookByIdController, listAllBooksController, listAllBooksInactiveController, listByFilterController, listIfReviewController, updateBookController } from "./dependecies";
import { validateToken } from "../../helpers/verifyToken";


export const bookRoutes = express.Router();


bookRoutes.get('/',validateToken ,listAllBooksController.run.bind(listAllBooksController))

bookRoutes.post('/',validateToken ,addBookController.run.bind(addBookController))

bookRoutes.get('/inactive',validateToken ,listAllBooksInactiveController.run.bind(listAllBooksInactiveController))

bookRoutes.put("/",validateToken ,updateBookController.run.bind(updateBookController))

bookRoutes.get("/filter",validateToken ,listByFilterController.run.bind(listByFilterController))

bookRoutes.get("/whit/review",validateToken ,listIfReviewController.run.bind(listIfReviewController))

bookRoutes.put("/:uuid/activate",validateToken ,activateBookController.run.bind(activateBookController))

bookRoutes.delete("/:uuid",validateToken ,deleteBookController.run.bind(deleteBookController))

bookRoutes.get("/:uuid",validateToken ,getBookByIdController.run.bind(getBookByIdController))









import express from "express";
import { getUserByFilterController, listAllUserActiveController, listAllUserController, resgisterUserController } from "./dependencies";

export const userRoutes = express.Router();




userRoutes.post('/',resgisterUserController.run.bind(resgisterUserController))
userRoutes.get('/',listAllUserController.run.bind(listAllUserController))
userRoutes.get('/active',listAllUserActiveController.run.bind(listAllUserActiveController))
userRoutes.get('/filter',getUserByFilterController.run.bind(getUserByFilterController))

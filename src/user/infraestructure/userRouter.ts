import express from "express";
import { activateUserController, deleteUserController, getUserByFilterController, getUserByIdController, listAllUserActiveController, listAllUserController, resgisterUserController, updatePasswordController, updateUserByIdController } from "./dependencies";

export const userRoutes = express.Router();




userRoutes.post('/',resgisterUserController.run.bind(resgisterUserController))
userRoutes.get('/',listAllUserController.run.bind(listAllUserController))
userRoutes.get('/active',listAllUserActiveController.run.bind(listAllUserActiveController))
userRoutes.get('/filter',getUserByFilterController.run.bind(getUserByFilterController))
userRoutes.get('/id',getUserByIdController.run.bind(getUserByIdController))
userRoutes.post('/id',updateUserByIdController.run.bind(updateUserByIdController))
userRoutes.post('/restar_password',updatePasswordController.run.bind(updatePasswordController))
userRoutes.delete('/',deleteUserController.run.bind(deleteUserController))
userRoutes.post('/activate',activateUserController.run.bind(activateUserController))






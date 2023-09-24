import express from "express";
import { activateUserController, deleteUserController, getUserByFilterController, getUserByIdController, listAllUserActiveController, listAllUserController, resgisterUserController, updatePasswordController, updateUserByIdController } from "./dependencies";
import { validationFilter, validationRegisterUser, validationUpdatePassword, validationUpdateUser, validationgetId } from "./validators/user";

export const userRoutes = express.Router();




userRoutes.post('/', validationRegisterUser ,resgisterUserController.run.bind(resgisterUserController)) 

userRoutes.get('/',listAllUserController.run.bind(listAllUserController)) 

userRoutes.get('/active',listAllUserActiveController.run.bind(listAllUserActiveController))

userRoutes.get('/filter', validationFilter ,getUserByFilterController.run.bind(getUserByFilterController))

userRoutes.get('/id', validationgetId ,getUserByIdController.run.bind(getUserByIdController))

userRoutes.post('/id',validationUpdateUser,updateUserByIdController.run.bind(updateUserByIdController))

userRoutes.post('/restar_password', validationUpdatePassword ,updatePasswordController.run.bind(updatePasswordController))

userRoutes.delete('/',validationgetId ,deleteUserController.run.bind(deleteUserController))

userRoutes.post('/activate',validationgetId ,activateUserController.run.bind(activateUserController))






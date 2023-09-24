import express from "express";
import { activateUserController, deleteUserController, getUserByFilterController, getUserByIdController, listAllUserActiveController, listAllUserController, loginUserController, resgisterUserController, updatePasswordController, updateUserByIdController } from "./dependencies";
import { validationFilter, validationLogin, validationRegisterUser, validationUpdatePassword, validationUpdateUser, validationgetId } from "./validators/user";
import { validateToken } from "./helpers/veryfyToken";

export const userRoutes = express.Router();




userRoutes.post('/', validationRegisterUser ,resgisterUserController.run.bind(resgisterUserController)) 

userRoutes.get('/', validateToken ,listAllUserController.run.bind(listAllUserController)) 

userRoutes.get('/active',validateToken,listAllUserActiveController.run.bind(listAllUserActiveController))

userRoutes.get('/filter',validateToken, validationFilter ,getUserByFilterController.run.bind(getUserByFilterController))

userRoutes.get('/id',validateToken, validationgetId ,getUserByIdController.run.bind(getUserByIdController))

userRoutes.post('/id',validateToken,validationUpdateUser,updateUserByIdController.run.bind(updateUserByIdController))

userRoutes.post('/restar_password', validationUpdatePassword ,updatePasswordController.run.bind(updatePasswordController))

userRoutes.delete('/',validateToken,validationgetId ,deleteUserController.run.bind(deleteUserController))

userRoutes.post('/activate',validationgetId ,activateUserController.run.bind(activateUserController))

userRoutes.post('/login',validationLogin ,loginUserController.run.bind(loginUserController))







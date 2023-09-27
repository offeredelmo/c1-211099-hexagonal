import express from "express";
import { activateUserController, deleteUserController, getUserByFilterController, getUserByIdController, listAllUserActiveController, listAllUserController, loginUserController, resgisterUserController, updatePasswordController, updateUserByIdController } from "./dependencies";
import { validateToken } from "../../helpers/veryfyToken";



export const userRoutes = express.Router();




userRoutes.post('/',resgisterUserController.run.bind(resgisterUserController)) 

userRoutes.get('/', validateToken ,listAllUserController.run.bind(listAllUserController)) 

userRoutes.get('/active',validateToken,listAllUserActiveController.run.bind(listAllUserActiveController))

userRoutes.get('/filter',validateToken,getUserByFilterController.run.bind(getUserByFilterController))

userRoutes.get('/id',validateToken,getUserByIdController.run.bind(getUserByIdController))

userRoutes.post('/id',validateToken,updateUserByIdController.run.bind(updateUserByIdController))

userRoutes.post('/restar_password',updatePasswordController.run.bind(updatePasswordController))

userRoutes.delete('/',validateToken,deleteUserController.run.bind(deleteUserController))

userRoutes.post('/activate',activateUserController.run.bind(activateUserController))

userRoutes.post('/login',loginUserController.run.bind(loginUserController))







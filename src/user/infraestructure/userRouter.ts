import express from "express";
import { activateUserController, deleteUserController, getUserByFilterController, getUserByIdController, inactivationUserController, listAllUsersInactiveController, listAllUserController, loginUserController, resgisterUserController, updatePasswordController, updateUserByIdController } from "./dependencies";
import { validateToken } from "../../helpers/veryfyToken";



export const userRoutes = express.Router();




userRoutes.post('/',resgisterUserController.run.bind(resgisterUserController)) 

userRoutes.get('/', validateToken ,listAllUserController.run.bind(listAllUserController)) 

userRoutes.get('/inactive',validateToken,listAllUsersInactiveController.run.bind(listAllUsersInactiveController))

userRoutes.get('/filter',validateToken,getUserByFilterController.run.bind(getUserByFilterController))

userRoutes.get('/:uuid',validateToken,getUserByIdController.run.bind(getUserByIdController))

userRoutes.put('/id',validateToken,updateUserByIdController.run.bind(updateUserByIdController))

userRoutes.put('/reset_password',validateToken,updatePasswordController.run.bind(updatePasswordController))

userRoutes.delete('/:uuid',validateToken,deleteUserController.run.bind(deleteUserController))

userRoutes.put('/:uuid/activate',validateToken,activateUserController.run.bind(activateUserController))

userRoutes.post('/login',loginUserController.run.bind(loginUserController))

userRoutes.put('/:uuid/inactivate',validateToken,inactivationUserController.run.bind(inactivationUserController))








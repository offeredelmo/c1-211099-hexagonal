
import { RegisterUserUseCase } from "../application/registerUseCase";
import { ResgisterUserController } from "./controllers/registerController";
import { MysqlUserRepository } from "./mysqUserRepository";

import { ListAllUserUseCase } from "../application/listAllUserUseCase";
import { ListAllUserController } from "./controllers/listAllUsersController";

import { ListAllUserActiveUseCase } from "../application/listAllUserInactiveUseCase";
import { ListAllUsersActiveController } from "./controllers/listAllUsersActiveController";

import { GetUserByFilterUseCase } from "../application/getUserByFilterUseCase";
import { GetUserByFilterController } from "./controllers/getUserByFilterController";

import { GetUserByIdUseCase } from "../application/getUserByIdUseCase";
import { GetUserByIdController } from "./controllers/getUserByIdController";

import { UpdateUserByIdUseCase } from "../application/updateUserByIdUseCase";
import { UpdateUserByIdController } from "./controllers/updateUseByIdController";

import { UpdatePasswordUserUsecase } from "../application/updatePasswordUserUseCase";
import { UpdatePasswordController } from "./controllers/updatePasswordUserController";

import { DeleteUserUseCase } from "../application/deleteUserUseCase";
import { DeleteUserController } from "./controllers/deleteUserController";

import { ActivateUserUseCase } from "../application/activeUser.UseCase";
import { ActivateUserController } from "./controllers/activateUser.Controller";

import { LoginUserController } from "./controllers/loginUserController";
import { LoginUserUseCase } from "../application/loginUserUseCase";

import { InactivateUserUseCase } from "../application/inactivateUserUseCase";
import { InactivationUserController } from "./controllers/inactivateUserController";



export const mysqlUserRepository = new MysqlUserRepository()
export const registerUserUseCase = new RegisterUserUseCase(mysqlUserRepository) 
export const resgisterUserController = new ResgisterUserController(registerUserUseCase)

export const listAllUseCase = new ListAllUserUseCase(mysqlUserRepository)
export const listAllUserController = new ListAllUserController(listAllUseCase)

export const listAllUserActiveUseCase = new ListAllUserActiveUseCase(mysqlUserRepository)
export const listAllUserActiveController = new ListAllUsersActiveController(listAllUserActiveUseCase)


export const getUserByFilterUseCase= new GetUserByFilterUseCase(mysqlUserRepository)
export const getUserByFilterController = new GetUserByFilterController(getUserByFilterUseCase)

export const getUserByIdUseCase = new GetUserByIdUseCase(mysqlUserRepository)
export const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)


export const updateUserByIdUseCase = new UpdateUserByIdUseCase(mysqlUserRepository)
export const updateUserByIdController = new UpdateUserByIdController(updateUserByIdUseCase)

export const updatePasswordUserUsecase = new UpdatePasswordUserUsecase(mysqlUserRepository)
export const updatePasswordController = new UpdatePasswordController(updatePasswordUserUsecase)

export const deleteUserUseCase = new DeleteUserUseCase(mysqlUserRepository)
export const deleteUserController = new DeleteUserController(deleteUserUseCase)

export const activateUseCase = new ActivateUserUseCase(mysqlUserRepository)
export const activateUserController = new ActivateUserController(activateUseCase)

export const loginUserUseCase = new LoginUserUseCase(mysqlUserRepository)
export const loginUserController = new LoginUserController(loginUserUseCase)


export const inactivateUserUseCase = new InactivateUserUseCase(mysqlUserRepository)
export const inactivationUserController = new InactivationUserController(inactivateUserUseCase)
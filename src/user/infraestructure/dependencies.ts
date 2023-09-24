
import { RegisterUserUseCase } from "../application/registerUseCase";
import { ResgisterUserController } from "./controllers/registerController";
import { MysqlUserRepository } from "./mysqUserRepository";

import { ListAllUserUseCase } from "../application/listAllUserUseCase";
import { ListAllUserController } from "./controllers/listAllUsersController";

import { ListAllUserActiveUseCase } from "../application/listAllUserInactiveUseCase";
import { ListAllUsersActiveController } from "./controllers/listAllUsersActiveController";

import { GetUserByFilterUseCase } from "../application/getUserByFilterUseCase";
import { GetUserByFilterController } from "./controllers/getUserByFilterController";



export const mysqlUserRepository = new MysqlUserRepository()
export const registerUserUseCase = new RegisterUserUseCase(mysqlUserRepository) 
export const resgisterUserController = new ResgisterUserController(registerUserUseCase)

export const listAllUseCase = new ListAllUserUseCase(mysqlUserRepository)
export const listAllUserController = new ListAllUserController(listAllUseCase)

export const listAllUserActiveUseCase = new ListAllUserActiveUseCase(mysqlUserRepository)
export const listAllUserActiveController = new ListAllUsersActiveController(listAllUserActiveUseCase)


export const getUserByFilterUseCase= new GetUserByFilterUseCase(mysqlUserRepository)
export const getUserByFilterController = new GetUserByFilterController(getUserByFilterUseCase)



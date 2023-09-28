import { ReturnLoanUseCase } from "../application/returnLoanUseCase";
import { UserLoanBookUseCase } from "../application/userLoanBookUseCase";
import { ReturnLoanController } from "./controller/returnLoanController";
import { UserLoanBookController } from "./controller/userLoanBookController";
import { MysqlLoanRepository } from "./mysqlLoanRepository";






export const mysqlLoanRepository = new MysqlLoanRepository()
export const userLoanBookUseCase = new UserLoanBookUseCase(mysqlLoanRepository)
export const userLoanBookController = new UserLoanBookController(userLoanBookUseCase)

export const returnLoanUseCase = new ReturnLoanUseCase(mysqlLoanRepository)
export const returnLoanController  = new ReturnLoanController(returnLoanUseCase)
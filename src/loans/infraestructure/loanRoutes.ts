import express from "express";
import { listAllLoansController, returnLoanController, userLoanBookController } from "./dependencies";
import { validateToken } from "../../helpers/verifyToken";



export const loanRoutes = express.Router();


loanRoutes.post('/',validateToken ,userLoanBookController.run.bind(userLoanBookController))
loanRoutes.put('/',validateToken ,returnLoanController.run.bind(returnLoanController))
loanRoutes.get('/',validateToken ,listAllLoansController.run.bind(listAllLoansController))





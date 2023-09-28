import express from "express";
import { listAllLoansController, returnLoanController, userLoanBookController } from "./dependencies";



export const loanRoutes = express.Router();


loanRoutes.post('/',userLoanBookController.run.bind(userLoanBookController))
loanRoutes.put('/',returnLoanController.run.bind(returnLoanController))
loanRoutes.get('/',listAllLoansController.run.bind(listAllLoansController))





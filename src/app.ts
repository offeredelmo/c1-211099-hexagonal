import express from "express";
import cors from "cors";
import "dotenv/config";
import { Signale } from 'signale';

import { bookRoutes } from "./book/infraestructure/bookRouter";
import { userRoutes } from "./user/infraestructure/userRouter";
import { reviewRouter } from "./review/infrestructure/reviewRoutes";
import { loanRoutes } from "./loans/infraestructure/loanRoutes";


import * as admin from "firebase-admin";
import { Bucket } from "@google-cloud/storage";
import * as serviceAccount from "./book/soa-exagonal-firebase-adminsdk-fvxaz-ebe0d5c38c.json";
import fileUpload from 'express-fileupload';

// Ruta al archivo de credenciales

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  storageBucket: "soa-exagonal.appspot.com/"
});

const app = express();
const signale = new Signale();

app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/user', userRoutes);

app.use('/api/v1/book',bookRoutes)

app.use('/api/v1/review',reviewRouter)

app.use('/api/v1/loan',loanRoutes)

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Corriendo en el puerto ${port}`);
});

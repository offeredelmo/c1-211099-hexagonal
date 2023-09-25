import express from "express";
import cors from "cors";
import "dotenv/config";
import { Signale } from 'signale';
import { bookRoutes } from "./book/infraestructure/bookRouter";
// import { userRoutes } from "./user/infraestructure/userRouter";

import * as admin from "firebase-admin";
import { Bucket } from "@google-cloud/storage";

import fileUpload from 'express-fileupload';

// Ruta al archivo de credenciales



const app = express();
const signale = new Signale();


app.use(fileUpload());

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// app.use('/user', userRoutes);

// app.use('/book',bookRoutes)

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Corriendo en el puerto ${port}`);
});
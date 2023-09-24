import express from "express";
import cors from "cors";
import "dotenv/config";
import { Signale } from 'signale';
import { userRoutes } from "./user/infraestructure/userRouter";

const app = express();
const signale = new Signale();

app.use(cors());
app.use(express.json());
app.use('/user', userRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Corriendo en el puerto ${port}`);
});

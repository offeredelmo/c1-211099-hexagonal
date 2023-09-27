import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './token';


export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.status(400).send({ error: "No hay token" });
    }
    
    const token = req.headers.authorization.split(' ').pop() as string;

    if (!token) {
        return res.status(400).send({ error: "Token no encontrado" });
    }

    const tokenData = await verifyToken(token);
  
    if (tokenData && tokenData.uuid) {
        next();
    } else {
        return res.status(401).send({ error: "Token inválido" });
    }
};
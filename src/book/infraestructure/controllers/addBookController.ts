import { Request, Response } from "express";
import { AddBookUseCase } from "../../application/addBookUseCase";
import { v4 as uuid } from "uuid";
import uploadToFirebase from "../helpers/saveimg";
import { UploadedFile } from 'express-fileupload';


export class AddBookController {

    constructor(readonly addBookUseCaseController: AddBookUseCase) { }

    async run(req: Request , res: Response) {
        try {

            let {
                title,
                author,
                description,
                invoice,
                unique_code,
            } = req.body;
            // Asegúrate de que un archivo fue enviado
            if (!req.files || !req.files.img_file) {
                return res.status(400).send({
                    status: "error",
                    message: "No image file uploaded."
                });
            }
            // Castear el archivo a UploadedFile (express-fileupload)
            const imgFile = req.files.img_file as UploadedFile;
            const miuuid: string = uuid();
            const loan_status: boolean = false;
            const img_url = await uploadToFirebase(imgFile)
            // Usa el archivo cargado de req.file para subirlo a Firebase

            let newBook = await this.addBookUseCaseController.run(miuuid, title, author, description, invoice, unique_code, img_url, loan_status);

            if (newBook) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        new_Book: newBook
                    }
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An error occurred while adding the book."
                });
            }

        } catch (error) {
            if (error instanceof Error) {
                if (error.message.startsWith('[')) {
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: JSON.parse(error.message)
                    });
                }
            } 
            return res.status(500).send({
                status: "error",
                message: "An error occurred while adding the book."
            });
        }
    }
}

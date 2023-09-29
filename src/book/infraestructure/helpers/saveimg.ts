import { UploadedFile } from 'express-fileupload';
import * as admin from 'firebase-admin';


/**
 * Sube un archivo a Firebase Storage y devuelve su URL pública.
 *
 * @param {UploadedFile} file El archivo a subir.
 * @returns {Promise<string>} La URL pública del archivo subido.
 */
async function uploadToFirebase(file: UploadedFile): Promise<string> {
    const bucket = admin.storage().bucket();

    return new Promise((resolve, reject) => {
        // Genera un nombre único para el archivo basado en la fecha y el nombre original
        const uniqueName = `${Date.now()}-${file.name}`;
        const blob = bucket.file(uniqueName);

        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },
        });
        blobStream.on('error', (error) => {
            reject("Error uploading to Firebase Storage: " + error);
        });
        blobStream.on('finish', () => {
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(blob.name)}?alt=media`;
            resolve(publicUrl);
        });

        blobStream.end(file.data);
    });
}

export default uploadToFirebase;  // Exporta la función para usarla en otros archivos.

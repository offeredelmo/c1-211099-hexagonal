import { validate } from "class-validator";
import { IUsuarioRepository } from "../domain/userRepository";
import { ValidatorId } from "../domain/validations/user";


export class DeleteUserUseCase {
    constructor(readonly usuarioRepository: IUsuarioRepository) {}
    
    async run(uuid: string,): Promise<string | null> {
        let post = new ValidatorId(uuid)
        const validation = await validate(post)
        console.log(validation.length)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            const deleteUser = await this.usuarioRepository.deleteUserById(uuid);
            return deleteUser;
        } catch (error) {
            return null;
        }
    }
}
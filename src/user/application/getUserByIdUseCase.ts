import { validate } from "class-validator";
import { User } from "../domain/user";
import { IUsuarioRepository } from "../domain/userRepository";
import { ValidatorId } from "../domain/validations/user";


export class GetUserByIdUseCase {
    constructor(readonly usuarioRepository: IUsuarioRepository) {}
    
    async run(uuid: string): Promise<User | null> {

        let post = new ValidatorId(uuid)
        const validation = await validate(post)
        console.log(validation.length)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const getUserById = await this.usuarioRepository.getUserById(uuid);
            return getUserById;
        } catch (error) {
            return null;
        }
    }
}
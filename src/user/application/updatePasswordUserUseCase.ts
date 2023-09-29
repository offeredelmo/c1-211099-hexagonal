import { validate } from "class-validator";
import { User } from "../domain/user";
import { IUsuarioRepository } from "../domain/userRepository";
import { ValidatorupdatePassword } from "../domain/validations/user";


export class UpdatePasswordUserUsecase {
    constructor(readonly usuarioRepository: IUsuarioRepository) { }

    async run(
        uuid: string,
        password: string
    ): Promise<User | null> {
        let post = new ValidatorupdatePassword(uuid, password)
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const updatePUserById = await this.usuarioRepository.updatePassword(uuid, password);
            return updatePUserById;
        } catch (error) {
            return null;
        }
    }
}
import { User } from "../domain/user";
import { IUsuarioRepository } from "../domain/userRepository";


export class UpdatePasswordUserUsecase {
    constructor(readonly usuarioRepository: IUsuarioRepository) {}
    
    async run(
        uuid: string,
        password: string
        ): Promise<User | null> {
       
        try {
            const updatePUserById = await this.usuarioRepository.updatePassword(uuid,password);
            return updatePUserById;
        } catch (error) {
            return null;
        }
    }
}
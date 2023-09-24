import { User } from "../domain/user";
import { IUsuarioRepository } from "../domain/userRepository";


export class UpdateUserByIdUseCase {
    constructor(readonly usuarioRepository: IUsuarioRepository) {}
    
    async run(
        uuid: string,
        name?: string,
        last_name?: string,
        phone_number?: string,
        email?: string,
        ): Promise<User | null> {
        console.log("usecase")
        try {
            const updateUserById = await this.usuarioRepository.updateUserById(uuid,name,last_name,phone_number,email);
            return updateUserById;
        } catch (error) {
            return null;
        }
    }
}
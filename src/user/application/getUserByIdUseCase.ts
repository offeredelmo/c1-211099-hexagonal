import { User } from "../domain/user";
import { IUsuarioRepository } from "../domain/userRepository";


export class GetUserByIdUseCase {
    constructor(readonly usuarioRepository: IUsuarioRepository) {}
    
    async run(uuid: string): Promise<User | null> {
        try {
            const getUserById = await this.usuarioRepository.getUserById(uuid);
            return getUserById;
        } catch (error) {
            return null;
        }
    }
}
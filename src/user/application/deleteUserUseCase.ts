import { IUsuarioRepository } from "../domain/userRepository";


export class DeleteUserUseCase {
    constructor(readonly usuarioRepository: IUsuarioRepository) {}
    
    async run(uuid: string,): Promise<string | null> {
      
        try {
            const deleteUser = await this.usuarioRepository.deleteUserById(uuid);
            return deleteUser;
        } catch (error) {
            return null;
        }
    }
}
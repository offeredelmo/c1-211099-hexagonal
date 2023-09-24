import { IUsuarioRepository } from "../domain/userRepository";


export class ActivateUserUseCase {
    constructor(readonly userRepository: IUsuarioRepository) {}

    async run(uuid:string):Promise<string | null>{
        try {
            const deleteUser = await this.userRepository.activateUser(uuid);
            return deleteUser;
        } catch (error) {
            return null;
        }
    }
}
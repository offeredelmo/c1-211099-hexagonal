import { User } from "../domain/user";
import { IUsuarioRepository } from "../domain/userRepository";


export class LoginUserUseCase {
    constructor(readonly usuarioRepository: IUsuarioRepository) {}
    
    async run(
        email:string,
        password:string
    ): Promise<string | null> {
        try {
            const loginUser = await this.usuarioRepository.loginUser(email,password)
            return loginUser;
        } catch (error) {
            return null;
        }
    }
}
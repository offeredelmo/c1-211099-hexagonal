import { validate } from "class-validator";
import { User } from "../domain/user";
import { IUsuarioRepository } from "../domain/userRepository";
import { ValidateLogin } from "../domain/validations/user";


export class LoginUserUseCase {
    constructor(readonly usuarioRepository: IUsuarioRepository) {}
    
    async run(
        email:string,
        password:string
    ): Promise<string | null> {
        
         //validator-class
        let post = new ValidateLogin(email, password)
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const loginUser = await this.usuarioRepository.loginUser(email,password)
            return loginUser;
        } catch (error) {
            return null;
        }
    }
}
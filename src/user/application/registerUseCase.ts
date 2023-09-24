import { User } from "../domain/user";
import { IUsuarioRepository } from "../domain/userRepository";


export class RegisterUserUseCase {
    constructor(readonly usuarioRepository: IUsuarioRepository) {}
    
    async run(
        uuid: string,
        name: string,
        last_name: string, 
        phone_number: string,
        email: string,
        password: string,
        loan_status: boolean,
        status: boolean
    ): Promise<User|null|void> {
        try {
            const createUser = await this.usuarioRepository.registerUser(
                uuid,
                name,
                last_name,
                phone_number,
                email,
                password,
                loan_status,
                status
                );
            return createUser;
        } catch (error) {
            return null;
        }
    }
}
import { User } from "../domain/user";
import { IUsuarioRepository } from "../domain/userRepository";
import { ValidatorFilter } from "../domain/validations/user";
import { validate } from "class-validator";



export class GetUserByFilterUseCase {
    constructor(readonly usuarioRepository: IUsuarioRepository) {}
    
    async run(filter: string,  email?:string, name?:string, phone_number?: string): Promise<User| User[] |null> {
        
        let post = new ValidatorFilter(filter,email,name,phone_number)
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {    
            const getByFilter = await this.usuarioRepository.getUserByFilter(filter,email, name, phone_number);
            return getByFilter;
        } catch (error) {
            return null;
        }
    }
}
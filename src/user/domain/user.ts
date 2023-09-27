

export class User {
    constructor(
    public uuid: string,
    public name: string,
    public last_name: string, 
    public phone_number: string,
    public email: string,
    public password: string,
    public loan_status: boolean,
    public status: boolean
    ){}
     

}

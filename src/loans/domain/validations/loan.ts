import { IsString, IsUUID, Length, IsBoolean, IsNotEmpty, ValidateIf, IsIn, IsOptional } from 'class-validator';

export class ValidationUserLoanBook {

    @IsNotEmpty()
    @IsUUID()
    public uuid: string;
    @IsNotEmpty()
    @IsUUID()
    public uuid_book: string;
    @IsNotEmpty()
    @IsUUID()
    public uuid_user: string;
    @IsNotEmpty()
    @IsString()
    @Length(1, 15)
    public loan_date: string;
    @IsNotEmpty()
    @IsString()
    @Length(1, 15)
    public dedline: string;
    @IsNotEmpty()
    @IsBoolean()    
    public status: boolean;
    constructor(
        uuid: string,
        uuid_book: string,
        uuid_user: string,
        loan_date: string,
        dedline: string,
        status: boolean
    ) {
        this.uuid = uuid;
        this.uuid_book = uuid_book;
        this.uuid_user = uuid_user;
        this.loan_date = loan_date;
        this.dedline = dedline;
        this.status = status;
    }
}

export class ValidationId {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;
    constructor(uuid:string){
        this.uuid = uuid
    }
}
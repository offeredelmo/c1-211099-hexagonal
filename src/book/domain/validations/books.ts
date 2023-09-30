import { IsString, IsUUID, Length, IsBoolean, IsNotEmpty, ValidateIf, IsIn, IsOptional } from 'class-validator';



export class ValidationCreateBook {
    @IsNotEmpty()
    @IsUUID()
    public uuid: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    public title: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    public author: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 500)
    public description: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    public invoice: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    public unique_code: string;

    @IsNotEmpty()
    @IsString()
    public img_uer: string;


    @IsNotEmpty()
    @IsBoolean()
    public loan_status: boolean;
    constructor(
        uuid: string,
        title: string,
        author: string,
        description: string,
        invoice: string,
        unique_code: string,
        img_uer: string,
        loan_status: boolean,
    ) {
        this.uuid = uuid,
            this.title = title,
            this.author = author,
            this.description = description,
            this.invoice = invoice,
            this.unique_code = unique_code,
            this.img_uer = img_uer,
            this.loan_status = loan_status
    }
}

export class ValidatorUpdate {
    @IsNotEmpty()
    @IsUUID()
    uuid: string;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    title?: string;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    author?: string;

    @IsOptional()
    @IsString()
    @Length(1, 500)
    description?: string;

    constructor(
        uuid: string,
        title?: string,
        author?: string,
        description?: string
    ) {
        this.uuid = uuid,
            this.title = title,
            this.author = author,
            this.description = description

    }
}

export class ValidatorFilter {
    @IsNotEmpty()
    @IsIn(['title', 'author', 'invoice', 'unique_code'])
    filter: string;

    @ValidateIf(o => o.filter === 'title')
    @IsNotEmpty()
    title?: string;

    @ValidateIf(o => o.filter === 'author')
    @IsNotEmpty()
    author?: string;

    @ValidateIf(o => o.filter === 'invoice')
    @IsNotEmpty()
    invoice?: string;

    @ValidateIf(o => o.filter === 'unique_code')
    @IsNotEmpty()
    unique_code?: string;

    constructor(
        filter: string,
        title?: string,
        author?: string,
        invoice?: string,
        unique_code?: string
    ) {
        this.filter = filter,
            this.title = title,
            this.author = author,
            this.invoice = invoice,
            this.unique_code = unique_code
    }
}

export class ValidatorId {
    @IsNotEmpty()
    @IsUUID()
    uuid: string;
    constructor(uuid: string) {
        this.uuid = uuid;
    }
}
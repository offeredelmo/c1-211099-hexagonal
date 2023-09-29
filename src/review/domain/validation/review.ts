import { IsString, IsUUID, Length, IsBoolean, IsNotEmpty, ValidateIf, IsIn, IsOptional } from 'class-validator';


export class ValidatorCreateReview {
    @IsNotEmpty()
    @IsUUID()
    uuid: string;
    @IsNotEmpty()
    @IsUUID()
    uuid_user: string;
    @IsNotEmpty()
    @IsUUID()
    uuid_book: string;
    @IsNotEmpty()
    @IsString()
    @Length(1, 15)
    date: string;
    @IsNotEmpty()
    @IsString()
    @Length(1, 750)
    review: string;
    @IsNotEmpty()
    @IsBoolean()
    status: boolean;
    constructor(
        uuid: string,
        uuid_user: string,
        uuid_book: string,
        date: string,
        review: string,
        status: boolean) {
        this.uuid = uuid,
            this.uuid_user = uuid_user,
            this.uuid_book = uuid_book,
            this.date = date,
            this.review = review,
            this.status = status
    }
}

export class ValidateId {
    @IsNotEmpty()
    @IsUUID()
    uuid: string;
    constructor(uuid: string) {
        this.uuid = uuid;
    }
}

export class ValidateIds {
    @IsNotEmpty()
    @IsUUID()
    uuid_review: string;
    @IsNotEmpty()
    @IsUUID()
    uuid_user: string;
    constructor(uuid_review: string, uuid_user: string) {
        this.uuid_review = uuid_review;
        this.uuid_user = uuid_user;
    }
}

export class ValidateUpdate {
    @IsNotEmpty()
    @IsUUID()
    uuid_review: string;
    @IsNotEmpty()
    @IsUUID()
    uuid_user: string;
    @IsNotEmpty()
    @IsString()
    @Length(1, 15)
    date: string;
    @IsNotEmpty()
    @IsString()
    @Length(1, 750)
    review: string;
    constructor(
        uuid_review: string,
        uuid_user: string,
        date: string,
        review: string,
    ) {
        this.uuid_review = uuid_review,
        this.uuid_user = uuid_user,
        this.date = date,
        this.review = review
    }
}
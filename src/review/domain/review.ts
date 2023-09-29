export class Review {
    constructor(
        public uuid: string,
        public id_user: string,
        public id_book: string,
        public date: string,
        public review:string,
        public status:boolean
    ) {
        
    }
}
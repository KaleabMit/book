import { Category } from "./category.interface";
import { Post } from "./post.interface";

export interface Personaldetail{
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    country: string;
    checkin:Date;
    checkout:Date;
    identity: string;
    Rentaldate:Date;
    status: string;
    children: number;
    posts:Post;
    category:Category;
}
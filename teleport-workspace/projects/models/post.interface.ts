import { Category } from "./category.interface";
import { User } from "./user.interface";

export interface Post{
    id:number;
    price:number;
    specialprice:number;
    photo:string;
    type:string;
    address:string;
    area:number;
    bed:number;
    bath:number;
    wifi:string;
    createdOn:Date;
    modifiedOn:Date;
    user:User;
    status?:string;
    category:Category;
}
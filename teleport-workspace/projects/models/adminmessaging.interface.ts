import { Personaldetail } from "./personaldetail.interface";
import { User } from "./user.interface";

export interface AdminMessaging{
        id:number;
        message:string;
        personaldetail: Personaldetail;
        user:User;
}
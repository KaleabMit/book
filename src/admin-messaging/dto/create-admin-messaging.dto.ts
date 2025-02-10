import { IsNotEmpty, IsString } from "class-validator";

export class CreateAdminMessagingDto {
@IsString()
@IsNotEmpty()
    message:string;
}

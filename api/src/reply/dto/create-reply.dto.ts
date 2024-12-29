import { IsNotEmpty, IsString } from "class-validator";

export class CreateReplyDto {
    @IsNotEmpty()
    @IsString()
    message:string;
}

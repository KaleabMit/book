import { IsNotEmpty, IsNumber, IsString, IsDate, IsOptional, IsEmail } from 'class-validator';

export class CreatePersonaldetailDto {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  checkin: String;

  @IsNotEmpty()
  @IsString()
  checkout: String;

  @IsNotEmpty()
  @IsString()
  identity: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsNumber()
  children: number;

  @IsNotEmpty()
  @IsNumber()
  postsId: number;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
}
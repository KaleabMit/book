import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';

export class CreatePersonaldetailDto {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsDate()
  checkin: Date;

  @IsNotEmpty()
  @IsDate()
  checkout: Date;

  @IsNotEmpty()
  @IsString()
  identity: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsString()
  children: number;

  @IsNotEmpty()
  @IsNumber()
  postsId: number;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
}

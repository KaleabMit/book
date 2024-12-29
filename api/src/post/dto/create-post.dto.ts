import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';

export class CreatePostDto {
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  specialprice: number;

  @IsOptional()
  @IsString()
  photo: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsNumber()
  area: number;

  @IsNotEmpty()
  @IsNumber()
  bed: number;

  @IsNotEmpty()
  @IsNumber()
  bath: number;

  @IsNotEmpty()
  @IsString()
  wifi: string;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;  // Use categoryId instead of category entity
}

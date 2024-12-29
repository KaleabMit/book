import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonaldetailDto } from './create-personaldetail.dto';

export class UpdatePersonaldetailDto extends PartialType(CreatePersonaldetailDto) {}

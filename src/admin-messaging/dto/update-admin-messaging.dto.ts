import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminMessagingDto } from './create-admin-messaging.dto';

export class UpdateAdminMessagingDto extends PartialType(CreateAdminMessagingDto) {}

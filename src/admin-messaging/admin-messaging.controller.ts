import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UseGuards } from '@nestjs/common';
import { AdminMessagingService } from './admin-messaging.service';
import { CreateAdminMessagingDto } from './dto/create-admin-messaging.dto';
import { UpdateAdminMessagingDto } from './dto/update-admin-messaging.dto';
import { CurrentUserGuard } from 'src/auth/current-user.guard';

@Controller('admin-messaging')
@UseGuards(CurrentUserGuard)
export class AdminMessagingController {
  constructor(private readonly adminMessagingService: AdminMessagingService) {}

  @Post(':personaldetailId')
  async create(
    @Param('personaldetailId') personaldetailId: number,
    @Body() createAdminMessagingDto: CreateAdminMessagingDto,
  ) {
    try {
      const result = await this.adminMessagingService.create(createAdminMessagingDto, personaldetailId);
      return result;
    } catch (error) {
      console.error('Error creating message:', error); // Log the error details
      throw new BadRequestException('Failed to create message');
    }
  }

  @Get()
  findAll() {
    return this.adminMessagingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminMessagingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminMessagingDto: UpdateAdminMessagingDto) {
    return this.adminMessagingService.update(+id, updateAdminMessagingDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.adminMessagingService.remove(+id);
    if (result.affected === 0) {
      throw new BadRequestException('Delete failed');
    }
    return { success: true };
  }
}


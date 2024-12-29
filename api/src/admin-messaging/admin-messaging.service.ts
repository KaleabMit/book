import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminMessagingDto } from './dto/create-admin-messaging.dto';
import { UpdateAdminMessagingDto } from './dto/update-admin-messaging.dto';
import { AdminMessaging } from './entities/admin-messaging.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Personaldetail } from 'src/personaldetails/entities/personaldetail.entity';

@Injectable()
export class AdminMessagingService {
  constructor(
    @InjectRepository(AdminMessaging) private readonly repo: Repository<AdminMessaging>,
    @InjectRepository(Personaldetail) private readonly personaldetailRepo: Repository<Personaldetail>
  ) {}

  async create(createAdminMessagingDto: CreateAdminMessagingDto, personaldetailId: number) {
    try {
      const personaldetail = await this.personaldetailRepo.findOne({
        where: { id: personaldetailId }
      });
      if (!personaldetail) {
        throw new BadRequestException('Personaldetail not found');
      }

      const adminmessage = this.repo.create({
        ...createAdminMessagingDto,
        personaldetail,
        personaldetailId: personaldetail.id,
      });
      return await this.repo.save(adminmessage);
    } catch (error) {
      console.error('Error saving message:', error); // Log the error details
      throw new BadRequestException('Failed to save message');
    }
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    const adminmessage = await this.repo.findOne({ where: { id } });
    if (!adminmessage) {
      throw new BadRequestException('Message not found');
    }
    return adminmessage;
  }

  async update(id: number, updateAdminMessagingDto: UpdateAdminMessagingDto) {
    const result = await this.repo.update(id, updateAdminMessagingDto);
    if (result.affected === 0) {
      throw new BadRequestException('Update failed');
    }
    return result;
  }

  async remove(id: number) {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new BadRequestException('Delete failed');
    }
    return result;
  }
}


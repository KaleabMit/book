import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { Reply } from './entities/reply.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class ReplyService {
  constructor(@InjectRepository(Reply) private readonly repo: Repository<Reply>) {}

  async create(createReplyDto: CreateReplyDto, user: User,userId:number) {
    if (!userId || userId <= 0) {
      throw new BadRequestException('Invalid userId provided');
    }
    try{
      const reply = this.repo.create({ ...createReplyDto, userId});
      await this.repo.save(reply);
      return this.repo.findOne({ where: { id: reply.id }, relations: ['user'] });
    } catch (error) {
      console.error('Error while creating reply:', error);
      throw new BadRequestException('Failed to create reply');
    }
  
  }
  

  async findAll() {
    return await this.repo.find({ relations: ['user'] });
  }

  async findOne(id: number) {
    const reply = await this.repo.findOne({ where: { id } });
    if (!reply) {
      throw new BadRequestException('Message not found');
    }
    return reply;
  }

  async update(id: number, updateReplyDto: UpdateReplyDto) {
    const result = await this.repo.update(id, updateReplyDto);
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

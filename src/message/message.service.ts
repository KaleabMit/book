import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Repository, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(@InjectRepository(Message) private readonly repo: Repository<Message>) {}

  async create(createMessageDto: CreateMessageDto) {
    return await this.repo.insert(createMessageDto);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    const message = await this.repo.findOne({ where: { id } });
    if (!message) {
      throw new BadRequestException('Message is not found');
    }
    return message;
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    return await this.repo.update(id, updateMessageDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.repo.delete(id);
  }
}

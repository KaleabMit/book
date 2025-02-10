import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { Request } from 'express';
import { mapExpressUserToAppUser } from 'src/auth/utils/map-user.util';
import { CurrentUserGuard } from 'src/auth/current-user.guard';
import { User } from 'src/auth/entities/user.entity';

@Controller('reply')
@UseGuards(CurrentUserGuard)
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @Post(':userId')
  async create(
    @Param('userId') userId: number,
    @Body() createReplyDto: CreateReplyDto,
    @Req() request: Request
  ) {
    if (!userId || userId <= 0) {
      throw new BadRequestException('Invalid userId provided');
    }
  
    const expressUser = request.user as User;
    if (!expressUser) {
      throw new UnauthorizedException('User not authenticated');
    }
  
    const user: User = mapExpressUserToAppUser(expressUser);
    return this.replyService.create(createReplyDto, user, userId);
  }
  

  @Get()
  findAll() {
    return this.replyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.replyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReplyDto: UpdateReplyDto) {
    return this.replyService.update(+id, updateReplyDto);
  }

    @Delete(':id')
    async remove(@Param('id') id: string) {
      const result = await this.replyService.remove(+id);
      if (result.affected === 0) {
        throw new BadRequestException('Delete failed');
      }
      return { success: true };
    }
}
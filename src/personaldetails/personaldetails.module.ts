import { Module } from '@nestjs/common';
import { PersonaldetailsService } from './personaldetails.service';
import { PersonaldetailsController } from './personaldetails.controller';
import { Personaldetail } from './entities/personaldetail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../category/category.module';
import { PostModule } from '../post/post.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Personaldetail]),
    CategoryModule,
    PostModule,
  ],
  controllers: [PersonaldetailsController],
  providers: [PersonaldetailsService],
  exports: [TypeOrmModule.forFeature([Personaldetail])]
})
export class PersonaldetailsModule {}

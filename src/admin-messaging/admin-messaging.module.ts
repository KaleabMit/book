import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminMessaging } from './entities/admin-messaging.entity';
import { AdminMessagingService } from './admin-messaging.service';
import { AdminMessagingController } from './admin-messaging.controller';
import { PersonaldetailsModule } from 'src/personaldetails/personaldetails.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminMessaging]),
    PersonaldetailsModule
  ],
  providers: [AdminMessagingService],
  controllers: [AdminMessagingController],
  exports: [TypeOrmModule]
})
export class AdminMessagingModule {}

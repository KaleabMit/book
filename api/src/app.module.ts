import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './auth/user-roles';
import { MessageModule } from './message/message.module';
import { PersonaldetailsModule } from './personaldetails/personaldetails.module';
import { ReplyModule } from './reply/reply.module';
import { AdminMessagingModule } from './admin-messaging/admin-messaging.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type:'mysql',
    database:'teleport-homes',
    port:3306,
    host:'localhost',
    username:'root',
    password:'Mysql@@@82987932',
    autoLoadEntities:true,
    synchronize:true
    }),
    PostModule,
    CategoryModule,
    AuthModule,
    AccessControlModule.forRoles(roles),
    MessageModule,
    PersonaldetailsModule,
    ReplyModule,
    AdminMessagingModule
  ],
  controllers: [AppController],
  providers: [AppService]
  
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { SchoolModule } from './school/school.module';
import { LectureModule } from './lecture/lecture.module';
import typeORMConfig from './config/typeorm.config';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { SocketPrModule } from './socket_pr/socket_pr.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    UserModule,
    SchoolModule,
    LectureModule,
    JwtModule.register({ global: true }),
    ConfigModule.forRoot({ isGlobal: true }),
    SocketPrModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

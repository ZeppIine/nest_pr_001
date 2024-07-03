import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { SchoolModule } from './school/school.module';
import { LectureModule } from './lecture/lecture.module';
import typeORMConfig from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), UserModule, SchoolModule, LectureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

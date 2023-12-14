import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { DepartmentsModule } from './departments/departments.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/authentication'), UsersModule, DepartmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

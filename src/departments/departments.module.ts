import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { MongooseModule } from "@nestjs/mongoose"
import { DepartmentSchema } from './departments.model';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: "department", schema: DepartmentSchema }]), UsersModule],
  providers: [DepartmentsService],
  controllers: [DepartmentsController]
})
export class DepartmentsModule {}

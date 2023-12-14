import {Inject,  Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import { Department, DepartmentDocument } from './departments.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DepartmentsService {

    constructor(@InjectModel('department') private readonly departmentModel: Model<DepartmentDocument>,
    @Inject(UsersService) private readonly usersService: UsersService) { }
    
    // @Inject(UsersService)
    // private readonly usersService: UsersService;

    async createDepartment(name: string, description: string): Promise<Department> {
        return this.departmentModel.create({
            name,
            description,
        });
    }
    async getDepartments(): Promise<Department[]> {
        return this.departmentModel.find();
    }

    async deleteDepartment(id: mongoose.Schema.Types.ObjectId): Promise<Department> {

        const deleteDepUsers = await this.usersService.deleteDepartmentUsers(id)

        if (deleteDepUsers.acknowledged){
        return this.departmentModel.findOneAndUpdate({_id:id},{is_deleted: true});
        }
    }
}

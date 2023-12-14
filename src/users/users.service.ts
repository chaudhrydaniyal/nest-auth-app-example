import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from './users.model';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
    constructor(@InjectModel('user') private readonly userModel: Model<UserDocument>) { }
    async createUser(username: string, password: string, department: mongoose.Schema.Types.ObjectId): Promise<User> {
        return this.userModel.create({
            username,
            password,
            department
        });
    }

    async getUser(id: mongoose.Schema.Types.ObjectId): Promise<User> {
        return this.userModel.findById(id);
    }

    async getUserAll(): Promise<User[]> {
        return this.userModel.find().populate("department");
    }

    async authenticateUser(username: string, password: string): Promise<User> {
        const user = await this.userModel.findOne({ username: username });
        if (!user) return null

        const passwordValid = await bcrypt.compare(password, user.password)
        if (passwordValid) {
            return user
        } else {
            console.log("password not correct")
            return null
        }
    }


    async deleteDepartmentUsers (depId:mongoose.Schema.Types.ObjectId): Promise<any>{
            return this.userModel.updateMany({department:depId},{is_deleted: true});
        }
}

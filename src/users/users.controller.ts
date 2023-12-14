import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

// Auth apis

@Controller('auth')
export class UsersAuthController {
    constructor(private readonly usersService: UsersService) { }

    @Post('/signup')
    async createUser(
        @Body('password') password: string,
        @Body('username') username: string,
        @Body('department') department: mongoose.Schema.Types.ObjectId
    ): Promise<User> {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        const result = await this.usersService.createUser(
            username,
            hashedPassword,
            department
        );
        return result;
    }


    @Post('/signin')
    async authenticateUser(
        @Body('password') password: string,
        @Body('username') username: string,
    ): Promise<User | string> {
        const user = await this.usersService.authenticateUser(username, password)
        if (!user) {
            return 'User credentials not correct!'
        }
        else {
            return user;
        }
    }

}



// users apis

@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('/')
    async getUsers(): Promise<User[]> {
        const result = await this.usersService.getUserAll();
        return result;
    }

    @Get('/:id')
    async getUserFromQuery(@Param("id") id: mongoose.Schema.Types.ObjectId): Promise<User> {
        const result = await this.usersService.getUser(id);
        return result;
    }
}
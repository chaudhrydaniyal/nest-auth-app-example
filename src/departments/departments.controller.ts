import { Body, Controller, Post, Get, Delete, Param } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { Department } from './departments.model';
import mongoose from 'mongoose';

@Controller('department')
export class DepartmentsController {
    constructor(private readonly departmentsService: DepartmentsService) { }

    @Post('/')
    async createDepartment(
        @Body('name') name: string,
        @Body('description') description: string,
    ): Promise<Department> {
        const result = await this.departmentsService.createDepartment(
            name,  
            description,
        );
        return result;
    }

    @Get('/')
    async getDepartment(): Promise<Department[]> {
        const result = await this.departmentsService.getDepartments();
        return result;
    }

    @Delete('/:id')
    async deleteDepartment(@Param("id") id: mongoose.Schema.Types.ObjectId): Promise<Department> {
        const result = await this.departmentsService.deleteDepartment(id);
        return result;
    }





}
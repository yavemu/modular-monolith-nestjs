import { Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeesService } from '../services/employees.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from '../dto';
import {
  EmployeeController,
  CreateEmployeeDocs,
  DeleteEmployeeDocs,
  FindAllEmployeeDocs,
  FindOneEmployeeDocs,
  UpdateEmployeeDocs,
} from '../decorators';

@EmployeeController('employees')
export class EmployeesController {
  constructor(private readonly service: EmployeesService) {}

  @Post()
  @CreateEmployeeDocs()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.service.create(createEmployeeDto);
  }

  @Get()
  @FindAllEmployeeDocs()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @FindOneEmployeeDocs()
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @UpdateEmployeeDocs()
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.service.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  @DeleteEmployeeDocs()
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}

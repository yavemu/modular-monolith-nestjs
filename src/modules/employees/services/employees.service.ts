import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../entities/employee.entity';
import { CreateEmployeeDto, UpdateEmployeeDto } from '../dto';
import { BusinessClientService } from '../../../client-http/services/business-client.service';
import { IBusiness } from '../../../shared/interfaces';
import { EmployeeWithBusinessDto } from 'src/shared/dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee, 'employeeConnection')
    private readonly repository: Repository<Employee>,
    private readonly businessesClient: BusinessClientService,
  ) {}

  private async getBusiness(businessId: string): Promise<IBusiness | null> {
    return await this.businessesClient.getBusinessByIdOrError(businessId);
  }

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    try {
      await this.getBusiness(createEmployeeDto.businessId);

      const employeeData = this.repository.create(createEmployeeDto);
      const employee = await this.repository.save(employeeData);
      return employee;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Falló al crear el empleado: ${error.message}`);
    }
  }

  async findAll(): Promise<Employee[]> {
    const employees = await this.repository.find();
    const uniqueBusinessIds = [
      ...new Set(employees.map((emp) => emp.businessId)),
    ];

    const businesses =
      await this.businessesClient.getBusinessesByIds(uniqueBusinessIds);
    return employees.map((emp) => ({
      ...emp,
      business: businesses.find((bus) => bus.id === emp.businessId),
    }));
  }

  async findOne(id: string): Promise<EmployeeWithBusinessDto> {
    const employee = await this.repository.findOne({ where: { id } });
    if (!employee) {
      throw new NotFoundException(`Employee with ID "${id}" not found`);
    }

    const business = await this.getBusiness(employee.businessId);
    return { ...employee, business } as EmployeeWithBusinessDto;
  }

  async update(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    if (updateEmployeeDto.businessId) {
      await this.getBusiness(updateEmployeeDto.businessId);
    }

    const employee = await this.findOne(id);
    const updated = this.repository.merge(employee, updateEmployeeDto);
    return this.repository.save(updated);
  }

  async remove(id: string): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Employee with ID "${id}" not found`);
    }
  }
}

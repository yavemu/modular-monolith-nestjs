// dto/employee-with-business.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { EmployeeDto } from './employee.dto';
import { BusinessDto } from './business.dto';

export class EmployeeWithBusinessDto extends EmployeeDto {
  @ApiProperty({
    description: 'Información del negocio a la que pertenece el empleado',
    type: () => BusinessDto,
  })
  business: BusinessDto;
}

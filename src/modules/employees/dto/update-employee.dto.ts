import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  MaxLength,
  IsUUID,
} from 'class-validator';

export class UpdateEmployeeDto {
  @ApiPropertyOptional({
    description: 'Nombre del empleado',
    example: 'Banco ABC SA',
    maxLength: 255,
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  name?: string;

  @ApiPropertyOptional({
    description: 'Número de teléfono del empleado',
    example: '+57 300 123 4567',
    maxLength: 20,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  phone?: string;

  @ApiPropertyOptional({
    description: 'Correo electrónico del empleado',
    example: 'contacto@com.com',
    maxLength: 255,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;

  @ApiPropertyOptional({
    description: 'ID único del negocio a la que pertenece el empleado',
    example: '8400550e-41d4-e29b-a716-440000446655',
    format: 'uuid',
    maxLength: 50,
  })
  @IsString()
  @IsOptional()
  @IsUUID()
  @MaxLength(50)
  businessId?: string;
}

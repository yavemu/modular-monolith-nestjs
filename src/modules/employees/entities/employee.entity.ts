import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('employees')
export class Employee {
  @ApiProperty({
    description: 'ID único del empleado',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
    readOnly: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nombre del empleado',
    example: 'Banco ABC SA',
    maxLength: 255,
  })
  @Column({ length: 255 })
  name: string;

  @ApiPropertyOptional({
    description: 'Número de teléfono del empleado',
    example: '+57 300 123 4567',
    maxLength: 20,
    nullable: true,
  })
  @Column({ length: 20, nullable: true })
  phone: string;

  @ApiPropertyOptional({
    description: 'Correo electrónico del empleado',
    example: 'contacto@com.com',
    maxLength: 255,
    nullable: true,
  })
  @Column({ length: 255, nullable: true })
  email: string;

  @ApiProperty({
    description: 'ID único del negocio a la que pertenece el empleado',
    example: '8400550e-41d4-e29b-a716-440000446655',
    format: 'uuid',
    maxLength: 50,
    nullable: false,
  })
  @Column({ name: 'business_id', nullable: false, length: 50 })
  businessId: string;
}

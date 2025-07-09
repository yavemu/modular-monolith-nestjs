import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('businesses')
export class Business {
  @ApiProperty({
    description: 'ID único del business',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
    readOnly: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nombre del business',
    example: 'Banco ABC SA',
    maxLength: 255,
  })
  @Column({ length: 255 })
  name: string;

  @ApiPropertyOptional({
    description: 'Número de teléfono del business',
    example: '+57 300 123 4567',
    maxLength: 20,
    nullable: true,
  })
  @Column({ length: 20, nullable: true })
  phone: string;

  @ApiPropertyOptional({
    description: 'Correo electrónico del business',
    example: 'contacto@com.com',
    maxLength: 255,
    nullable: true,
  })
  @Column({ length: 255, nullable: true })
  email: string;
}

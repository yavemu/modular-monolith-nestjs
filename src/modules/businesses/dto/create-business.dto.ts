import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';

export class CreateBusinessDto {
  @ApiProperty({
    description: 'Nombre del business',
    example: 'Banco ABC SA',
    maxLength: 255,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({
    description: 'Número de teléfono del business',
    example: '+57 300 123 4567',
    maxLength: 20,
    type: String,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  phone?: string;

  @ApiPropertyOptional({
    description: 'Correo electrónico del business',
    example: 'contacto@com.com',
    maxLength: 255,
    type: String,
    format: 'email',
    nullable: true,
  })
  @IsEmail()
  @IsOptional()
  @MaxLength(255)
  email?: string;
}

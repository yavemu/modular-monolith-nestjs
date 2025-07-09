import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, MaxLength } from 'class-validator';

export class UpdateBusinessDto {
  @ApiPropertyOptional({
    description: 'Nombre del negocio',
    example: 'El local de Juan y Maria',
    maxLength: 255,
    type: String,
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  name?: string;

  @ApiPropertyOptional({
    description: 'Número de teléfono del negocio',
    example: '+57 301 987 6543',
    maxLength: 20,
    type: String,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  phone?: string;

  @ApiPropertyOptional({
    description: 'Correo electrónico del negocio',
    example: 'actualizado@negocio.com',
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

import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { CreateBusinessDto } from '../dto';
import { Business } from '../entities/business.entity';

export function CreateBusinessDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Crear un nuevo business',
      description: 'Crea un nuevo business con la información proporcionada',
    }),
    ApiBody({
      type: CreateBusinessDto,
      description: 'Datos necesarios para crear un business',
      examples: {
        example1: {
          summary: 'Business completo',
          description: 'Ejemplo con todos los campos',
          value: {
            name: 'Banco ABC SA',
            phone: '+57 300 123 4567',
            email: 'contacto@com.com',
          },
        },
        example2: {
          summary: 'Business mínimo',
          description: 'Ejemplo solo con campos obligatorios',
          value: {
            name: 'La Tienda de Juan',
          },
        },
      },
    }),
    ApiCreatedResponse({
      description: 'Business creado exitosamente',
      type: Business,
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Banco ABC SA',
        phone: '+57 300 123 4567',
        email: 'contacto@com.com',
      },
    }),
    ApiBadRequestResponse({
      description: 'Datos de entrada inválidos',
      example: {
        statusCode: 400,
        message: [
          'name should not be empty',
          'name must be shorter than or equal to 255 characters',
          'email must be an email',
        ],
        error: 'Bad Request',
      },
    }),
  );
}

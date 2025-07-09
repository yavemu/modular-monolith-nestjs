import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { Business } from '../entities/business.entity';

export function FindOneBusinessDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener un business por ID',
      description: 'Retorna un business específico basado en su ID único',
    }),
    ApiParam({
      name: 'id',
      type: 'string',
      format: 'uuid',
      description: 'ID único del business',
      example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    ApiOkResponse({
      description: 'Business encontrado exitosamente',
      type: Business,
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Banco ABC SA',
        phone: '+57 300 123 4567',
        email: 'contacto@com.com',
      },
    }),
    ApiNotFoundResponse({
      description: 'Business no encontrado',
      example: {
        statusCode: 404,
        message:
          'Business with ID 550e8400-e29b-41d4-a716-446655440000 not found',
        error: 'Not Found',
      },
    }),
  );
}

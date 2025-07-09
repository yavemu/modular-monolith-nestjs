import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { UpdateBusinessDto } from '../dto';
import { Business } from '../entities/business.entity';

export function UpdateBusinessDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Actualizar un business',
      description: 'Actualiza parcialmente un business existente',
    }),
    ApiParam({
      name: 'id',
      type: 'string',
      format: 'uuid',
      description: 'ID único del business a actualizar',
      example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    ApiBody({
      type: UpdateBusinessDto,
      description:
        'Datos a actualizar del business (todos los campos son opcionales)',
      examples: {
        updateName: {
          summary: 'Actualizar solo el nombre',
          value: {
            name: 'El local de Juan y Maria',
          },
        },
        updateContact: {
          summary: 'Actualizar información de contacto',
          value: {
            phone: '+57 301 987 6543',
            email: 'nuevo@email.com',
          },
        },
        updateAll: {
          summary: 'Actualizar todos los campos',
          value: {
            name: 'El local de Juan y Maria',
            phone: '+57 302 555 1234',
            email: 'actualizado@negocio.com',
          },
        },
      },
    }),
    ApiOkResponse({
      description: 'Business actualizado exitosamente',
      type: Business,
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'El local de Juan y Maria',
        phone: '+57 302 555 1234',
        email: 'actualizado@negocio.com',
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
    ApiBadRequestResponse({
      description: 'Datos de entrada inválidos',
      example: {
        statusCode: 400,
        message: [
          'name must be shorter than or equal to 255 characters',
          'email must be an email',
        ],
        error: 'Bad Request',
      },
    }),
  );
}

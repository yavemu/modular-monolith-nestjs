import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { EmployeeWithBusinessDto } from '../../../shared/dto';

export const FindOneEmployeeDocs = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Obtener empleado por ID',
      description:
        'Retorna la información de un empleado específico basado en su ID único',
    }),
    ApiParam({
      name: 'id',
      type: 'string',
      format: 'uuid',
      description: 'ID único del empleado',
      example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    ApiOkResponse({
      description: 'Empleado encontrado exitosamente',
      type: EmployeeWithBusinessDto,
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Juan Pérez',
        phone: '+57 300 123 4567',
        email: 'juan.perez@com.com',
        businessId: '8400550e-41d4-e29b-a716-440000446655',
        business: {
          id: '8400550e-41d4-e29b-a716-440000446655',
          name: 'Banco ABC S.A.S.',
          address: 'Calle Falsa 123, Bogotá, Colombia',
          phone: '+57 300 765 4321',
          email: ' contacto@com.com',
        },
      },
    }),
    ApiNotFoundResponse({
      description: 'Empleado no encontrado',
      example: {
        statusCode: 404,
        message:
          'Empleado con ID 550e8400-e29b-41d4-a716-446655440000 no encontrado',
        error: 'Not Found',
      },
    }),
    ApiBadRequestResponse({
      description: 'ID inválido',
      example: {
        statusCode: 400,
        message: 'ID debe ser un UUID válido',
        error: 'Bad Request',
      },
    }),
    ApiInternalServerErrorResponse({
      description: 'Error interno del servidor',
      example: {
        statusCode: 500,
        message: 'Error interno del servidor',
        error: 'Internal Server Error',
      },
    }),
  );

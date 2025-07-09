import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { Employee } from '../entities/employee.entity';

export const FindAllEmployeeDocs = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Obtener todos los empleados',
      description:
        'Retorna una lista con todos los empleados registrados en el sistema',
    }),
    ApiOkResponse({
      description: 'Lista de empleados obtenida exitosamente',
      type: [Employee],
      example: [
        {
          id: '550e8400-e29b-41d4-a716-446655440000',
          name: 'Juan Pérez',
          phone: '+57 300 123 4567',
          email: 'juan.perez@com.com',
          businessId: '8400550e-41d4-e29b-a716-440000446655',
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440001',
          name: 'María García',
          phone: null,
          email: null,
          businessId: '8400550e-41d4-e29b-a716-440000446655',
        },
      ],
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

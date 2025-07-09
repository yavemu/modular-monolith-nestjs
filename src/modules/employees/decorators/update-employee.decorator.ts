import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { UpdateEmployeeDto } from '../dto';
import { Employee } from '../entities/employee.entity';

export const UpdateEmployeeDocs = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Actualizar empleado',
      description:
        'Actualiza la información de un empleado existente. Todos los campos son opcionales.',
    }),
    ApiParam({
      name: 'id',
      type: 'string',
      format: 'uuid',
      description: 'ID único del empleado a actualizar',
      example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    ApiBody({
      type: UpdateEmployeeDto,
      description:
        'Datos del empleado a actualizar (todos los campos son opcionales)',
      examples: {
        actualizarNombre: {
          summary: 'Actualizar solo el nombre',
          description: 'Ejemplo actualizando únicamente el nombre del empleado',
          value: {
            name: 'Juan Carlos Pérez',
          },
        },
        actualizarContacto: {
          summary: 'Actualizar información de contacto',
          description: 'Ejemplo actualizando teléfono y email',
          value: {
            phone: '+57 301 987 6543',
            email: 'juan.carlos@nuevaempresa.com',
          },
        },
        actualizarCompleto: {
          summary: 'Actualizar múltiples campos',
          description: 'Ejemplo actualizando varios campos del empleado',
          value: {
            name: 'Juan Carlos Pérez González',
            phone: '+57 301 987 6543',
            email: 'juan.carlos@nuevaempresa.com',
            businessId: '8400550e-41d4-e29b-a716-440000446656',
          },
        },
      },
    }),
    ApiOkResponse({
      description: 'Empleado actualizado exitosamente',
      type: Employee,
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Juan Carlos Pérez',
        phone: '+57 301 987 6543',
        email: 'juan.carlos@nuevaempresa.com',
        businessId: '8400550e-41d4-e29b-a716-440000446655',
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
      description: 'Datos de entrada inválidos',
      example: {
        statusCode: 400,
        message: [
          'email must be an email',
          'businessId must be a UUID',
          'name should not be empty if provided',
        ],
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

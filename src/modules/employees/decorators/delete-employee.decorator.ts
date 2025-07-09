import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

export const DeleteEmployeeDocs = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Eliminar empleado',
      description: 'Elimina un empleado del sistema de forma permanente',
    }),
    ApiParam({
      name: 'id',
      type: 'string',
      format: 'uuid',
      description: 'ID único del empleado a eliminar',
      example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    ApiOkResponse({
      description: 'Empleado eliminado exitosamente',
      example: {
        message: 'Empleado eliminado exitosamente',
        id: '550e8400-e29b-41d4-a716-446655440000',
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

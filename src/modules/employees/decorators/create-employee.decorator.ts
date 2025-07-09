import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { CreateEmployeeDto } from '../dto';
import { Employee } from '../entities/employee.entity';

export const CreateEmployeeDocs = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Crear nuevo empleado',
      description:
        'Crea un nuevo empleado en el sistema asociado a un negocio específica',
    }),
    ApiBody({
      type: CreateEmployeeDto,
      description: 'Datos del empleado a crear',
      examples: {
        ejemplo1: {
          summary: 'Empleado con todos los campos',
          description: 'Ejemplo de empleado con información completa',
          value: {
            name: 'Juan Pérez',
            phone: '+57 300 123 4567',
            email: 'juan.perez@com.com',
            businessId: '8400550e-41d4-e29b-a716-440000446655',
          },
        },
        ejemplo2: {
          summary: 'Empleado con campos mínimos',
          description: 'Ejemplo de empleado con información mínima requerida',
          value: {
            name: 'María García',
            businessId: '8400550e-41d4-e29b-a716-440000446655',
          },
        },
      },
    }),
    ApiCreatedResponse({
      description: 'Empleado creado exitosamente',
      type: Employee,
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Juan Pérez',
        phone: '+57 300 123 4567',
        email: 'juan.perez@com.com',
        businessId: '8400550e-41d4-e29b-a716-440000446655',
      },
    }),
    ApiBadRequestResponse({
      description: 'Datos de entrada inválidos',
      example: {
        statusCode: 400,
        message: [
          'name should not be empty',
          'businessId must be a UUID',
          'email must be an email',
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

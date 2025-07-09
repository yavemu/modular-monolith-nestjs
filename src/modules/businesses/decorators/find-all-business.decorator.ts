import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { Business } from '../entities/business.entity';

export function FindAllBusinessDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener todos los businesses',
      description: 'Retorna una lista de todos los businesses registrados',
    }),
    ApiOkResponse({
      description: 'Lista de businesses obtenida exitosamente',
      type: [Business],
      example: [
        {
          id: '550e8400-e29b-41d4-a716-446655440000',
          name: 'Banco ABC SA',
          phone: '+57 300 123 4567',
          email: 'contacto@com.com',
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440001',
          name: 'ONG de la salud',
          phone: null,
          email: 'info@otraempresa.com',
        },
      ],
    }),
  );
}

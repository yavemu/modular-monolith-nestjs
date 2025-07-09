import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiNoContentResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

export function DeleteBusinessDocs() {
  return applyDecorators(
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({
      summary: 'Eliminar un business',
      description: 'Elimina permanentemente un business del sistema',
    }),
    ApiParam({
      name: 'id',
      type: 'string',
      format: 'uuid',
      description: 'ID único del business a eliminar',
      example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    ApiNoContentResponse({
      description: 'Business eliminado exitosamente',
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

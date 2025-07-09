import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class FindBusinessByIdsDto {
  @ApiProperty({
    description: 'IDs de los business a buscar',
    example: [
      '550e8400-e29b-41d4-a716-446655440000',
      '550e8400-e29b-41d4-a716-446655440001',
    ],
    isArray: true,
    type: Array<string>,
  })
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  ids: string[];
}

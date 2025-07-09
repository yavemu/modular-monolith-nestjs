import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EMPLOYEES_MODULE_CONFIG } from '../../../config/module.config';

export function EmployeeController(path: string) {
  return applyDecorators(
    ApiTags(EMPLOYEES_MODULE_CONFIG.tag),
    Controller(`${EMPLOYEES_MODULE_CONFIG.prefix}/${path}`),
  );
}

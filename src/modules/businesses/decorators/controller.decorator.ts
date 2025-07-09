import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BUSSINESSES_MODULE_CONFIG } from '../../../config/module.config';

export function BusinessController(path: string) {
  return applyDecorators(
    ApiTags(BUSSINESSES_MODULE_CONFIG.tag),
    Controller(`${BUSSINESSES_MODULE_CONFIG.prefix}/${path}`),
  );
}

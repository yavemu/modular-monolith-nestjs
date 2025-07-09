import { Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BusinessesService } from '../services/businesses.service';
import {
  CreateBusinessDto,
  FindBusinessByIdsDto,
  UpdateBusinessDto,
} from '../dto';
import {
  BusinessController,
  CreateBusinessDocs,
  DeleteBusinessDocs,
  FindAllBusinessDocs,
  FindBusinessByIdsDocs,
  FindOneBusinessDocs,
  UpdateBusinessDocs,
} from '../decorators';

@BusinessController('businesses')
export class BusinessesController {
  constructor(private readonly service: BusinessesService) {}

  @Post()
  @CreateBusinessDocs()
  create(@Body() createBusinessDto: CreateBusinessDto) {
    return this.service.create(createBusinessDto);
  }

  @Post('find-by-ids')
  @FindBusinessByIdsDocs()
  findByIds(@Body() findBusinessByIdsDto: FindBusinessByIdsDto) {
    return this.service.findByIds(findBusinessByIdsDto.ids);
  }

  @Get()
  @FindAllBusinessDocs()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @FindOneBusinessDocs()
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @UpdateBusinessDocs()
  update(
    @Param('id') id: string,
    @Body() updateBusinessDto: UpdateBusinessDto,
  ) {
    return this.service.update(id, updateBusinessDto);
  }

  @Delete(':id')
  @DeleteBusinessDocs()
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}

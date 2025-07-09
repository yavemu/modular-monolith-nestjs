import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Business } from '../entities/business.entity';
import { CreateBusinessDto, UpdateBusinessDto } from '../dto';

@Injectable()
export class BusinessesService {
  constructor(
    @InjectRepository(Business, 'businessConnection')
    private readonly repository: Repository<Business>,
  ) {}

  async create(createBusinessDto: CreateBusinessDto): Promise<Business> {
    const business = this.repository.create(createBusinessDto);
    return this.repository.save(business);
  }

  async findAll(): Promise<Business[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<Business> {
    const business = await this.repository.findOne({ where: { id } });
    if (!business) {
      throw new NotFoundException(`Business with ID "${id}" not found`);
    }
    return business;
  }

  async findByIds(ids: string[]): Promise<Business[]> {
    console.log('================findByIds', ids);
    if (ids.length === 0) {
      return [];
    }
    const uniquesIds = [...new Set(ids)];

    return await this.repository.find({ where: { id: In(uniquesIds) } });
  }

  async update(
    id: string,
    updateBusinessDto: UpdateBusinessDto,
  ): Promise<Business> {
    const business = await this.findOne(id);
    const updated = this.repository.merge(business, updateBusinessDto);
    return this.repository.save(updated);
  }

  async remove(id: string): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Business with ID "${id}" not found`);
    }
  }
}

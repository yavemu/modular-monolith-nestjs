import { Module } from '@nestjs/common';
import { BusinessesService } from './services/businesses.service';
import { BusinessesController } from './controllers/businesses.controller';
import { Business } from './entities/business.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      name: 'businessConnection',
      useFactory: (configService: ConfigService) => {
        const db = configService.get('databases.businessConfigDB');
        return db;
      },
    }),
    TypeOrmModule.forFeature([Business], 'businessConnection'),
  ],
  controllers: [BusinessesController],
  providers: [BusinessesService],
})
export class BusinessesModule {}

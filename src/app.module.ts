import { Module } from '@nestjs/common';
import { BusinessesModule } from './modules/businesses/businesses.module';
import { ConfigModule } from '@nestjs/config';
import { AppConfig } from './config/app.config';
import { EmployeesModule } from './modules/employees/employees.module';
import { ClientHttpModule } from './client-http/client-http.module';

@Module({
  imports: [
    ClientHttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig],
      envFilePath: ['.env', '.env.local'],
    }),
    BusinessesModule,
    EmployeesModule,
  ],
})
export class AppModule {}

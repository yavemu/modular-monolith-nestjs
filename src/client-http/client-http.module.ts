import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BusinessClientService } from './services/business-client.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [BusinessClientService],
  exports: [BusinessClientService],
})
export class ClientHttpModule {}

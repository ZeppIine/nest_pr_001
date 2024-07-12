import { Logger, Module } from '@nestjs/common';
import { SocketPrService } from './socket_pr.service';
import { SocketPrGateway } from './socket_pr.gateway';

@Module({
  providers: [SocketPrGateway, SocketPrService, Logger],
})
export class SocketPrModule {}

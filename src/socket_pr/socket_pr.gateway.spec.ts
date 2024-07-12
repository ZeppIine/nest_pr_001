import { Test, TestingModule } from '@nestjs/testing';
import { SocketPrGateway } from './socket_pr.gateway';
import { SocketPrService } from './socket_pr.service';

describe('SocketPrGateway', () => {
  let gateway: SocketPrGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketPrGateway, SocketPrService],
    }).compile();

    gateway = module.get<SocketPrGateway>(SocketPrGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});

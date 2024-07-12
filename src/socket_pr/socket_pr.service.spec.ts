import { Test, TestingModule } from '@nestjs/testing';
import { SocketPrService } from './socket_pr.service';

describe('SocketPrService', () => {
  let service: SocketPrService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketPrService],
    }).compile();

    service = module.get<SocketPrService>(SocketPrService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

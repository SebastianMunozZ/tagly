import { Test, TestingModule } from '@nestjs/testing';
import { GunService } from './gun.service';

describe('GunService', () => {
  let service: GunService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GunService],
    }).compile();

    service = module.get<GunService>(GunService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

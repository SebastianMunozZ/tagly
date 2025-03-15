import { Test, TestingModule } from '@nestjs/testing';
import { GunController } from './gun.controller';

describe('GunController', () => {
  let controller: GunController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GunController],
    }).compile();

    controller = module.get<GunController>(GunController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

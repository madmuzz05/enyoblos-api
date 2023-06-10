import { Test, TestingModule } from '@nestjs/testing';
import { PemilihanController } from './pemilihan.controller';

describe('PemilihanController', () => {
  let controller: PemilihanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PemilihanController],
    }).compile();

    controller = module.get<PemilihanController>(PemilihanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

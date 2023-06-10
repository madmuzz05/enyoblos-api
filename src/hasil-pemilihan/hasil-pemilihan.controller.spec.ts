import { Test, TestingModule } from '@nestjs/testing';
import { HasilPemilihanController } from './hasil-pemilihan.controller';

describe('HasilPemilihanController', () => {
  let controller: HasilPemilihanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HasilPemilihanController],
    }).compile();

    controller = module.get<HasilPemilihanController>(HasilPemilihanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { KandidatController } from './kandidat.controller';

describe('KandidatController', () => {
  let controller: KandidatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KandidatController],
    }).compile();

    controller = module.get<KandidatController>(KandidatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { OrganisasiController } from './organisasi.controller';

describe('OrganisasiController', () => {
  let controller: OrganisasiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganisasiController],
    }).compile();

    controller = module.get<OrganisasiController>(OrganisasiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

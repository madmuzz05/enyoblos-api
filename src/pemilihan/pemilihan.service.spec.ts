import { Test, TestingModule } from '@nestjs/testing';
import { PemilihanService } from './pemilihan.service';

describe('PemilihanService', () => {
  let service: PemilihanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PemilihanService],
    }).compile();

    service = module.get<PemilihanService>(PemilihanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

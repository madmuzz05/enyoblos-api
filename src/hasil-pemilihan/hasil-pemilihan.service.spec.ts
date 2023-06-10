import { Test, TestingModule } from '@nestjs/testing';
import { HasilPemilihanService } from './hasil-pemilihan.service';

describe('HasilPemilihanService', () => {
  let service: HasilPemilihanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HasilPemilihanService],
    }).compile();

    service = module.get<HasilPemilihanService>(HasilPemilihanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

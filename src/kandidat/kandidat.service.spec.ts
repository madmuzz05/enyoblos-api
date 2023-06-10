import { Test, TestingModule } from '@nestjs/testing';
import { KandidatService } from './kandidat.service';

describe('KandidatService', () => {
  let service: KandidatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KandidatService],
    }).compile();

    service = module.get<KandidatService>(KandidatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

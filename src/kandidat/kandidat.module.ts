import { Module } from '@nestjs/common';
import { KandidatService } from './kandidat.service';
import { KandidatController } from './kandidat.controller';

@Module({
  providers: [KandidatService],
  controllers: [KandidatController]
})
export class KandidatModule {}

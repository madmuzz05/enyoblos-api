import { Module } from '@nestjs/common';
import { PemilihanService } from './pemilihan.service';
import { PemilihanController } from './pemilihan.controller';

@Module({
  providers: [PemilihanService],
  controllers: [PemilihanController],
})
export class PemilihanModule {}

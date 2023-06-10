import { Module } from '@nestjs/common';
import { HasilPemilihanController } from './hasil-pemilihan.controller';
import { HasilPemilihanService } from './hasil-pemilihan.service';

@Module({
  controllers: [HasilPemilihanController],
  providers: [HasilPemilihanService],
})
export class HasilPemilihanModule {}

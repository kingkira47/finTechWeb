import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxController } from './tax.controller';
import { TaxService } from './tax.service';
import { TaxRecord } from './tax.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaxRecord])],
  controllers: [TaxController],
  providers: [TaxService],
})
export class TaxModule {}

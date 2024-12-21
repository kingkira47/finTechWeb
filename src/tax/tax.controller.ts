import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { TaxService } from './tax.service';
import { EstimateTaxDto } from './dto/estimate-tax.dto';
import { GetTaxRecordsDto } from './dto/get-tax-records.dto';
import { JwtAuthGuard } from 'src/user/guard/jwt.guard';

@Controller('tax')
export class TaxController {
  constructor(private readonly taxService: TaxService) {}

  @Post('/estimate')
  @UseGuards(JwtAuthGuard)
  estimateTax(@Body() taxData: EstimateTaxDto) {
    return this.taxService.estimateTax(taxData);
  }

  @Get('/records')
  @UseGuards(JwtAuthGuard)
  getTaxRecords(@Query() query: GetTaxRecordsDto) {
    return this.taxService.getTaxRecords(query.userId);
  }
}

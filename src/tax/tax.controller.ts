import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { TaxService } from './tax.service';
import { EstimateTaxDto } from './dto/estimate-tax.dto';
import { GetTaxRecordsDto } from './dto/get-tax-records.dto';

@Controller('tax')
export class TaxController {
  constructor(private readonly taxService: TaxService) {}

  @Post('/estimate')
  estimateTax(@Body() taxData: EstimateTaxDto) {
    return this.taxService.estimateTax(taxData);
  }

  @Get('/records')
  getTaxRecords(@Query() query: GetTaxRecordsDto) {
    return this.taxService.getTaxRecords(query.userId);
  }
}

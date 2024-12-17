import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { AddInvestmentDto } from './dto/add-investment.dto';
import { GetInvestmentsDto } from './dto/get-investments.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
import { DeleteInvestmentDto } from './dto/delete-investment.dto';

@Controller('investments')
export class InvestmentController {
  constructor(private readonly investmentService: InvestmentService) {}

  @Post()
  addInvestment(@Body() investmentData: AddInvestmentDto) {
    return this.investmentService.addInvestment(investmentData);
  }

  @Get()
  getInvestments(@Query() query: GetInvestmentsDto) {
    return this.investmentService.getInvestments(query.userId);
  }

  @Patch(':id')
  updateInvestment(
    @Param('id') id: number,
    @Body() updateData: UpdateInvestmentDto,
  ) {
    return this.investmentService.updateInvestment(id, updateData);
  }

  @Delete(':id')
  deleteInvestment(@Param() params: DeleteInvestmentDto) {
    return this.investmentService.deleteInvestment(params.id);
  }
}

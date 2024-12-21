import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { AddInvestmentDto } from './dto/add-investment.dto';
import { GetInvestmentsDto } from './dto/get-investments.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
import { DeleteInvestmentDto } from './dto/delete-investment.dto';
import { JwtAuthGuard } from 'src/user/guard/jwt.guard';

@Controller('investments')
export class InvestmentController {
  constructor(private readonly investmentService: InvestmentService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  addInvestment(@Body() investmentData: AddInvestmentDto) {
    return this.investmentService.addInvestment(investmentData);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getInvestments(@Query() query: GetInvestmentsDto) {
    return this.investmentService.getInvestments(query.userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateInvestment(
    @Param('id') id: number,
    @Body() updateData: UpdateInvestmentDto,
  ) {
    return this.investmentService.updateInvestment(id, updateData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteInvestment(@Param() params: DeleteInvestmentDto) {
    return this.investmentService.deleteInvestment(params.id);
  }
}

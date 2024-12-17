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
import { SavingsGoalService } from './savings-goals.service';
import { CreateSavingsGoalDto } from './dto/create-savings-goal.dto';
import { GetSavingsGoalsDto } from './dto/get-savings-goals.dto';
import { UpdateSavingsGoalDto } from './dto/update-savings-goal.dto';
import { DeleteSavingsGoalDto } from './dto/delete-savings-goal.dto';

@Controller('savings-goals')
export class SavingsGoalController {
  constructor(private readonly savingsGoalService: SavingsGoalService) {}

  @Post()
  createSavingsGoal(@Body() savingsGoalData: CreateSavingsGoalDto) {
    return this.savingsGoalService.createSavingsGoal(savingsGoalData);
  }

  @Get()
  getSavingsGoals(@Query() query: GetSavingsGoalsDto) {
    return this.savingsGoalService.getSavingsGoals(query.userId);
  }

  @Patch(':id')
  updateSavingsGoal(
    @Param('id') id: number,
    @Body() updateData: UpdateSavingsGoalDto,
  ) {
    return this.savingsGoalService.updateSavingsGoal(id, updateData);
  }

  @Delete(':id')
  deleteSavingsGoal(@Param() params: DeleteSavingsGoalDto) {
    return this.savingsGoalService.deleteSavingsGoal(params.id);
  }
}

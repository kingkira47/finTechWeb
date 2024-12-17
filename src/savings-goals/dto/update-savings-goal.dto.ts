import { IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class UpdateSavingsGoalDto {
  @IsNumber()
  @IsOptional()
  currentAmount: number;

  @IsBoolean()
  @IsOptional()
  achieved: boolean;
}

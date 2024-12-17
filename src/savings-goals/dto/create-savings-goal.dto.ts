import { IsString, IsInt, IsNumber } from 'class-validator';

export class CreateSavingsGoalDto {
  @IsInt()
  userId: number;

  @IsString()
  name: string;

  @IsNumber()
  targetAmount: number;

  @IsString()
  targetDate: string;
}

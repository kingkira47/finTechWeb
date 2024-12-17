import { IsInt } from 'class-validator';

export class DeleteSavingsGoalDto {
  @IsInt()
  id: number;
}

import { IsInt } from 'class-validator';

export class GetSavingsGoalsDto {
  @IsInt()
  userId: number;
}

import { IsInt } from 'class-validator';

export class DeleteInvestmentDto {
  @IsInt()
  id: number;
}

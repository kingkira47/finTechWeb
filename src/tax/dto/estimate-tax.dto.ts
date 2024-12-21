import { IsNumber, IsInt } from 'class-validator';

export class EstimateTaxDto {
  @IsInt()
  userId: number;

  @IsNumber()
  annualIncome: number;
}

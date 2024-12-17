import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateInvestmentDto {
  @IsNumber()
  @IsOptional()
  currentValue: number;

  @IsNumber()
  @IsOptional()
  returns: number;

  @IsString()
  @IsOptional()
  sellDate: string;
}

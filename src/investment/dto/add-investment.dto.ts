import { IsString, IsInt, IsNumber, IsOptional } from 'class-validator';

export class AddInvestmentDto {
  @IsInt()
  userId: number;

  @IsString()
  type: string;

  @IsString()
  name: string;

  @IsNumber()
  amountInvested: number;

  @IsString()
  @IsOptional()
  purchaseDate: string;
}

import { IsInt } from 'class-validator';

export class GetInvestmentsDto {
  @IsInt()
  userId: number;
}

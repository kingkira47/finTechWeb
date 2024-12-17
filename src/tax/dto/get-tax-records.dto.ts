import { IsInt } from 'class-validator';

export class GetTaxRecordsDto {
  @IsInt()
  userId: number;
}

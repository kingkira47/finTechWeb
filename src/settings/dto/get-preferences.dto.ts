import { IsInt } from 'class-validator';

export class GetPreferencesDto {
  @IsInt()
  userId: number;
}

import { IsString, IsOptional, IsInt } from 'class-validator';

export class SubmitFeedbackDto {
  @IsOptional()
  @IsInt()
  userId: number;

  @IsString()
  message: string;
}

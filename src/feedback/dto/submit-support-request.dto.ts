import { IsString, IsEmail, IsOptional, IsInt } from 'class-validator';

export class SubmitSupportRequestDto {
  @IsOptional()
  @IsInt()
  userId: number;

  @IsString()
  subject: string;

  @IsString()
  message: string;

  @IsEmail()
  contactEmail: string;
}

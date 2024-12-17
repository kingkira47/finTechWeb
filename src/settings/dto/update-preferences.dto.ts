import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdatePreferencesDto {
  @IsString()
  @IsOptional()
  currency: string;

  @IsString()
  @IsOptional()
  theme: string;

  @IsString()
  @IsOptional()
  language: string;

  @IsString()
  @IsOptional()
  timeZone: string;

  @IsBoolean()
  @IsOptional()
  notificationsEnabled?: boolean;
}

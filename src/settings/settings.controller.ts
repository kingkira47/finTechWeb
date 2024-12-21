import { Controller, Patch, Body, Param, Get, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpdatePreferencesDto } from './dto/update-preferences.dto';
import { GetPreferencesDto } from './dto/get-preferences.dto';
import { JwtAuthGuard } from 'src/user/guard/jwt.guard';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Patch(':userId')
  @UseGuards(JwtAuthGuard)
  updatePreferences(
    @Param('userId') userId: number,
    @Body() updateData: UpdatePreferencesDto,
  ) {
    return this.settingsService.updatePreferences(userId, updateData);
  }

  @Get(':userId')
  @UseGuards(JwtAuthGuard)
  getPreferences(@Param() params: GetPreferencesDto) {
    return this.settingsService.getPreferences(params.userId);
  }
}

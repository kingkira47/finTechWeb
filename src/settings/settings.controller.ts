import { Controller, Patch, Body, Param, Get } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpdatePreferencesDto } from './dto/update-preferences.dto';
import { GetPreferencesDto } from './dto/get-preferences.dto';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Patch(':userId')
  updatePreferences(
    @Param('userId') userId: number,
    @Body() updateData: UpdatePreferencesDto,
  ) {
    return this.settingsService.updatePreferences(userId, updateData);
  }

  @Get(':userId')
  getPreferences(@Param() params: GetPreferencesDto) {
    return this.settingsService.getPreferences(params.userId);
  }
}

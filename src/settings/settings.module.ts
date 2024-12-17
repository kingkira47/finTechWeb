import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Settings } from './settings.entity';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Settings, User])],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}

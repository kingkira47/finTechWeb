import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Settings } from './settings.entity';
import { User } from '../user/user.entity';
import { UpdatePreferencesDto } from './dto/update-preferences.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Settings)
    private readonly settingsRepository: Repository<Settings>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async updatePreferences(userId: number, updateData: UpdatePreferencesDto) {
    let settings = await this.settingsRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!settings) {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException('User Not Found!');
      }

      settings = this.settingsRepository.create({ user, ...updateData });
      return await this.settingsRepository.save(settings);
    }

    Object.assign(settings, updateData);
    return await this.settingsRepository.save(settings);
  }

  async getPreferences(userId: number) {
    const settings = await this.settingsRepository.findOne({
      where: { user: { id: userId } },
    });
    if (!settings) {
      throw new NotFoundException('User Not Found!');
    }
    return settings;
  }
}

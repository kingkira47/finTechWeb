import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Settings } from './settings.entity';
import { User } from '../user/user.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Settings)
    private readonly settingsRepository: Repository<Settings>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async updatePreferences(
    userId: number,
    updateData: Partial<{
      currency: string;
      theme: string;
      language: string;
      timeZone: string;
      notificationsEnabled: boolean;
    }>,
  ) {
    let settings = await this.settingsRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!settings) {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) throw new Error('User not found');

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
    if (!settings) throw new Error('Settings not found');
    return settings;
  }
}

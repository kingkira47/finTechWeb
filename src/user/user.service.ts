import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async addUser(userData: {
    email: string;
    name: string;
    password: string;
    phone?: string;
  }) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });
    return await this.userRepository.save(user);
  }

  async removeUser(id: number) {
    return await this.userRepository.delete(id);
  }

  async searchUser(
    criteria: Partial<{ id: number; name: string; email: string }>,
  ) {
    return await this.userRepository.find({ where: criteria });
  }

  async updateUser(
    id: number,
    updateData: Partial<{
      name: string;
      email: string;
      phone: string;
      profilePicture: string;
    }>,
  ) {
    await this.userRepository.update(id, updateData);
    return await this.userRepository.findOne({ where: { id } });
  }

  async login(credentials: { email: string; password: string }) {
    const user = await this.userRepository.findOne({
      where: { email: credentials.email },
    });
    if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user.id, email: user.email }, 'SECRET_KEY', {
      expiresIn: '1h',
    });
    return { token, user };
  }

  async logout(tokenData: { token: string }) {
    // Implement token invalidation logic (e.g., use a blacklist or change secret key periodically)
    return { message: 'User logged out successfully' };
  }

  async resetPassword(resetData: {
    email: string;
    newPassword: string;
    token: string;
  }) {
    // Validate reset token (implement your token validation logic)
    const user = await this.userRepository.findOne({
      where: { email: resetData.email },
    });
    if (!user) throw new Error('User not found');

    user.password = await bcrypt.hash(resetData.newPassword, 10);
    return await this.userRepository.save(user);
  }

  async toggleTwoFactor(id: number, toggleData: { enable: boolean }) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new Error('User not found');

    user.isTwoFactorEnabled = toggleData.enable;
    return await this.userRepository.save(user);
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async signup(userData: UserDto) {
    const findUser = await this.userRepository.findOne({
      where: { username: userData.username },
    });
    if (findUser) {
      throw new BadRequestException('Username Already Exists!');
    }
    const user = this.userRepository.create(userData);
    await this.userRepository.save(user);
    return `User Created Successfully!`;
  }

  async validateUser({ username, password }: UserDto) {
    const findUser = await this.userRepository.findOne({
      where: { username: username },
    });

    if (!findUser) return null;

    if (password === findUser.password) {
      const { password, ...user } = findUser;
      return this.jwtService.sign(user);
    }
  }

  async findOne(id: number) {
    const findUser = await this.userRepository.findOne({
      where: { id },
    });
    if (!findUser) {
      throw new NotFoundException('User Not Found!');
    }
    return findUser;
  }

  async remove(id: number) {
    const findUser = await this.userRepository.findOne({
      where: { id },
    });
    if (!findUser) {
      throw new NotFoundException('User Not Found!');
    }
    await this.userRepository.remove(findUser);
    return `User Deleted Successfully!`;
  }

  async update(id: number, attrs: Partial<User>) {
    const findUser = await this.userRepository.findOne({
      where: { id },
    });
    if (!findUser) {
      throw new NotFoundException('User Not Found!');
    }
    Object.assign(findUser, attrs);
    await this.userRepository.save(findUser);
    return `User Updated Successfully!`;
  }
}

import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Patch,
  Get,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  addUser(
    @Body()
    userData: {
      email: string;
      name: string;
      password: string;
      phone?: string;
    },
  ) {
    return this.userService.addUser(userData);
  }

  @Delete(':id')
  removeUser(@Param('id') id: number) {
    return this.userService.removeUser(id);
  }

  @Get('search')
  searchUser(
    @Query('id') id?: number,
    @Query('name') name?: string,
    @Query('email') email?: string,
  ) {
    return this.userService.searchUser({ id, name, email });
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: number,
    @Body()
    updateData: Partial<{
      name: string;
      email: string;
      phone: string;
      profilePicture: string;
    }>,
  ) {
    return this.userService.updateUser(id, updateData);
  }

  @Post('login')
  login(@Body() credentials: { email: string; password: string }) {
    return this.userService.login(credentials);
  }

  @Post('logout')
  logout(@Body() tokenData: { token: string }) {
    return this.userService.logout(tokenData);
  }

  @Post('reset-password')
  resetPassword(
    @Body() resetData: { email: string; newPassword: string; token: string },
  ) {
    return this.userService.resetPassword(resetData);
  }

  @Patch('two-factor/:id')
  toggleTwoFactor(
    @Param('id') id: number,
    @Body() toggleData: { enable: boolean },
  ) {
    return this.userService.toggleTwoFactor(id, toggleData);
  }
}

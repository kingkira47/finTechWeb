import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LocalGuard } from './guard/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guard/jwt.guard';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  createUser(
    @Body()
    userData: UserDto,
  ) {
    return this.userService.signup(userData);
  }

  @Post('/signin')
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    return req.user;
  }

  @Get('/whoami')
  @UseGuards(JwtAuthGuard)
  whoAmI(@Req() req: Request) {
    const user = req.user as any;
    return `${user.username} is logged in! Your id is ${user.id}!`;
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  findUser(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id));
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  removeUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  updateUser(@Param('id') id: string, @Body() userData: UserDto) {
    return this.userService.update(parseInt(id), userData);
  }
}

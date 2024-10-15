import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Users } from './entity/user.model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(): Promise<string> {
    return this.userService.getUserList();
  }

  @Post()
  async createUser(@Body() body: Users): Promise<Users> {
    return this.userService.createUser(body);
  }
}

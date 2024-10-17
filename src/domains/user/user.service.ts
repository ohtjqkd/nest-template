import { Injectable } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { UserDto } from './entity/user.model';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async getUserList(): Promise<string> {
    return this.userRepository.findAll();
  }

  async createUser(dto: UserDto): Promise<UserDto> {
    return this.userRepository.createUser(dto);
  }
}

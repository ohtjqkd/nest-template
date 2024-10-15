import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Users } from './entity/user.model';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async getUserList(): Promise<string> {
    return this.userRepository.findAll();
  }

  async createUser(dto: Users): Promise<Users> {
    return this.userRepository.createUser(dto);
  }
}

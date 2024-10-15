import { Injectable } from '@nestjs/common';
import { Users } from './entity/user.model';

@Injectable()
export class UserRepository {
  async findAll(): Promise<string> {
    return 'Hello World!';
  }

  async createUser(dto: Users): Promise<Users> {
    throw new Error('Method not implemented.');
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  async findAll(): Promise<string> {
    return 'Hello World!';
  }
}

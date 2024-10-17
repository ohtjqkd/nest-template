import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDto } from './entity/user.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async findAll(): Promise<string> {
    return 'Hello World!';
  }

  async createUser(dto: UserDto): Promise<UserDto> {
    await this.userModel.create({ name: dto.name });
    return await this.userModel.findOne({ name: dto.name });
  }
}

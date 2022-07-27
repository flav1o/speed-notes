import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ENTITIES_KEYS } from 'src/constants';
import { User } from 'src/graphql/graphql-schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(ENTITIES_KEYS.USERS_MODEL)
    private readonly usersModel: Model<User>,
  ) {}

  async createUser(authCredentials): Promise<void> {
    await new this.usersModel({
      ...authCredentials,
    }).save();
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.usersModel.findOne({ email });
  }
}

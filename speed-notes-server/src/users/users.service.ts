import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    const { email } = authCredentials;

    const doesEmailExist = await this.usersModel.findOne({ email });

    if (!!doesEmailExist)
      throw new HttpException(
        'USERS.EMAIL_ALREADY_EXISTS',
        HttpStatus.CONFLICT,
      );

    await new this.usersModel({
      ...authCredentials,
    }).save();
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.usersModel.findOne({ email });
  }

  async confirmUser(email: string, token: string): Promise<User> {
    const user = await this.findUserByEmail(email);

    if (!user)
      throw new HttpException('USERS.USER_NOT_FOUND', HttpStatus.NOT_FOUND);

    if (user.confirmationCode !== token)
      throw new HttpException('USERS.INVALID_TOKEN', HttpStatus.BAD_REQUEST);

    return await this.usersModel.findOneAndUpdate(
      { email },
      { confirmed: true },
      { new: true },
    );
  }
}

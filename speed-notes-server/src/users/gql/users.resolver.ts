import { Resolver, Query, Args } from '@nestjs/graphql';
import { User } from 'src/graphql/graphql-schema';
import { UsersService } from '../users.service';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query('confirmUser')
  async confirmUser(
    @Args('email') email: string,
    @Args('token') token: string,
  ): Promise<User> {
    return this.usersService.confirmUser(email, token);
  }
}

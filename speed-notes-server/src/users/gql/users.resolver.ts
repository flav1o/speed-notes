import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from '../users.service';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
}

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './gql/users.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ENTITIES_KEYS } from 'src/constants';
import { UsersSchema } from './document.model';

@Module({
  providers: [UsersResolver, UsersService],
  imports: [
    MongooseModule.forFeature([
      { name: ENTITIES_KEYS.USERS_MODEL, schema: UsersSchema },
    ]),
  ],
  exports: [UsersService],
})
export class UsersModule {}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/graphql/graphql-schema';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './dto/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      secretOrKey: 'IS_THIS_A_SECRET_KEY_OHHHHHH_NOOOOO',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload;
    const user: User = await this.usersService.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

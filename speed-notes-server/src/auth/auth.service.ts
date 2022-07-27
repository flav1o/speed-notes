import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { password } = authCredentialsDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.usersService.createUser({
      ...authCredentialsDto,
      password: hashedPassword,
      confirmationCode: uuidv4().split('-')[0],
      confirmed: false,
    });
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.usersService.findUserByEmail(
      authCredentialsDto.email,
    );

    if (
      !user &&
      !(await bcrypt.compare(authCredentialsDto.password, user.password))
    )
      throw new HttpException(
        'AUTH.INVALID_CREDENTIALS',
        HttpStatus.UNAUTHORIZED,
      );

    const payload: JwtPayload = { email: user.email };
    const accessToken: string = await this.jwtService.sign(payload);

    return { accessToken };
  }
}

import { Controller, Post, Body, Query, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/graphql/graphql-schema';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() userCreation: AuthCredentialsDto) {
    return this.authService.signUp(userCreation);
  }

  @Post('signin')
  async signIn(
    @Body() authCredentials: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentials);
  }

  @Post('confirmAccount')
  async confirmAccount(
    @Query() query: { token: string; email: string },
  ): Promise<{ accessToken }> {
    const { email, token } = query;
    return await this.authService.confirmAccount(email, token);
  }

  @UseGuards(AuthGuard())
  @Get('me')
  getUser(@GetUser() user: User): string {
    return user.email;
  }
}

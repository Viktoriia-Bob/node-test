import {
  Controller,
  Post,
  Body,
  UseGuards,
  Headers,
  Get,
  Param,
} from '@nestjs/common';
import AuthService from './auth.service';
import SignInDto from './dto/sign-in.dto';
import SignUpDto from './dto/sign-up.dto';
import JwtAuthGuard from './guards/jwt-auth.guard';

@Controller()
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in-by-dto')
  async signInByDto(@Body() signInDto: SignInDto) {
    return this.authService.signInByDto(signInDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/signin')
  async signInByToken(@Headers('authorization') token) {
    return this.authService.signInByToken(token);
  }

  @Post('/signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/logout/:all')
  logout(@Param('all') all: string, @Headers('authorization') token) {
    return this.authService.logout(all, token);
  }
}

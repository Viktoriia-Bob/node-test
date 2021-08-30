import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as Redis from 'ioredis';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'nestjs-redis';
import UserService from '../user/user.service';
import SignInDto from './dto/sign-in.dto';
import SignUpDto from './dto/sign-up.dto';
import ITokenPayload from './interfaces/token-payload.interface';
import { IUser } from '../user/interfaces/user.interface';

@Injectable()
export default class AuthService {
  private readonly redisClient: Redis.Redis;
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private userService: UserService,
  ) {
    this.redisClient = redisService.getClient();
  }

  async signInByDto({ id, password }: SignInDto) {
    const user = await this.userService.findOne(id);
    if (user && user.password === password) {
      return this.signUser(user);
    }
    throw new BadRequestException('Invalid credentials');
  }

  async signInByToken(token: string) {
    token = token.slice(7);
    return this.verifyToken(token);
  }

  async signUp(signUpDto: SignUpDto) {
    const user = await this.userService.create(signUpDto);
    return this.signUser(user);
  }

  async logout(all: string, token: string) {
    token = token.slice(7);
    return this.removeToken(all, token);
  }

  async signUser(user: IUser) {
    const tokenPayload: ITokenPayload = {
      id: user.id,
      password: user.password,
    };
    const token = this.jwtService.sign(tokenPayload, {
      expiresIn: '10 min',
    });
    await this.redisClient.set(token, 'token', 'EX', 60 * 10);
    return token;
  }

  async verifyToken(token): Promise<any> {
    if (await this.redisClient.get(token)) {
      const payload = await this.jwtService.verify(token);
      const data = payload as ITokenPayload;
      if (this.userService.findOne(data.id)) {
        return this.userService.findOne(data.id);
      }
    }
    throw new UnauthorizedException();
  }

  async removeToken(all: string, token?: string) {
    if (all === 'true') {
      return this.redisClient.flushall();
    } else {
      return this.redisClient.del(token);
    }
  }
}

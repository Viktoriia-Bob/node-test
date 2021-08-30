import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import ITokenPayload from '../interfaces/token-payload.interface';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('SECRET_OR_KEY'),
    });
  }

  async validate(payload: ITokenPayload) {
    return {
      id: payload.id,
      password: payload.password,
    };
  }
}

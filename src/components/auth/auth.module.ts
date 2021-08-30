import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import AuthService from './auth.service';
import AuthController from './auth.controller';
import JwtStrategy from './strategies/jwt.strategy';
import UserModule from '../user/user.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    ConfigModule,
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_OR_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [AuthService],
})
export default class AuthModule {}

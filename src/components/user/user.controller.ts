import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import UserService from './user.service';
import JwtAuthGuard from '../auth/guards/jwt-auth.guard';

@Controller()
@UseGuards(JwtAuthGuard)
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user/')
  findAll() {
    return this.userService.findAll();
  }

  @Get('user/find/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Delete('user/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Get('/info/')
  async info(@Request() req) {
    const user = await this.userService.findOne(req.user.id);
    return this.userService.info(user.id);
  }
}

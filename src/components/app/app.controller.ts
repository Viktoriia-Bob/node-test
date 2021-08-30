import { Controller, Get, UseGuards } from '@nestjs/common';
import JwtAuthGuard from '../auth/guards/jwt-auth.guard';
import AppService from './app.service';

@Controller()
export default class AppController {
  constructor(public appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/latency')
  async checkLatency() {
    return this.appService.getLatency();
  }
}

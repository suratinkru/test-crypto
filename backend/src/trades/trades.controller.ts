import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { TradesService } from './trades.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { request } from 'express';

@Controller('trades')
export class TradesController {
  constructor(private readonly tradesService: TradesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  findAll() {
    return this.tradesService.findAll(request);
  }

 @UseGuards(JwtAuthGuard)
  @Post('buy')
  buy(@Body() body: any ) {
    return this.tradesService.buy(body, request);
  }

  @UseGuards(JwtAuthGuard)
  @Post('sell')
  sell(@Body() body: any ) {
    return this.tradesService.sell(body, request);
  }
}

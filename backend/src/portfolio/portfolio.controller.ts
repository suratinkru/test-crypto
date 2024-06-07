/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post('create')
  createPortfolio(@Body() portfolio) {
    return this.portfolioService.createPortfolio(portfolio);
  }

  @Get(':userId')
  getPortfolioByUserId(@Param('userId') userId: string) {
    return this.portfolioService.getPortfolioByUserId(userId);
  }

  // เพิ่ม route อื่น ๆ ตามที่ต้องการ
}

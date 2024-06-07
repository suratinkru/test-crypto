/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class PortfolioService {
  private portfolios = []; // ตัวอย่างข้อมูลพอร์ตโฟลิโอ

  createPortfolio(portfolio) {
    this.portfolios.push(portfolio);
  }

  getPortfolioByUserId(userId) {
    return this.portfolios.filter(portfolio => portfolio.userId === userId);
  }

  // เพิ่มฟังก์ชันอื่น ๆ ตามที่ต้องการ
}

/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Get()
  getCryptos() {

    return this.cryptoService.getCryptos();
  }


  @UseGuards(JwtAuthGuard)
  @Get()
  getCryptosPermiss() {
    
    return this.cryptoService.getCryptos();
  }
}

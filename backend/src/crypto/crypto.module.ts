
import { MyGateway } from './../gateway/gateway';
import { Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { CryptoController } from './crypto.controller';
import { HttpModule } from '@nestjs/axios';
import { CryptoGateway } from './crypto.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crypto } from './crypto.entity';
import { Favorite } from '../favorites/entities/favorite.entity';
import { Trade } from '../trades/entities/trade.entity';


@Module({
  imports: [HttpModule,TypeOrmModule.forFeature([Crypto,Favorite,Trade])],
  providers: [CryptoService, CryptoGateway, MyGateway],
  controllers: [CryptoController],
  exports: [CryptoService]
})
export class CryptoModule {}

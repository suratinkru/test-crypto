import { Module } from '@nestjs/common';
import { TradesService } from './trades.service';
import { TradesController } from './trades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trade } from './entities/trade.entity';
import { User } from 'src/user/user.entity';
import { Crypto } from 'src/crypto/crypto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trade, User, Crypto])],
  controllers: [TradesController],
  providers: [TradesService],
})
export class TradesModule {}

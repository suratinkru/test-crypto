import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trade } from './entities/trade.entity';
import { User } from '../user/user.entity';
import { Crypto } from '../crypto/crypto.entity';

@Injectable()
export class TradesService {
  constructor(
    @InjectRepository(Trade)
    private tradeRepository: Repository<Trade>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Crypto)
    private cryptoRepository: Repository<Crypto>,
  ) {}

  // get all trades for a user by user id and crypto id (optional) and type (optional) and status (optional) 
  async findAll(request: any): Promise<any> {

    return this.tradeRepository
    .createQueryBuilder('trade')
    .leftJoinAndSelect('trade.user', 'user')
    .leftJoinAndSelect('trade.crypto', 'crypto')
    .where('user.id = :userId', { userId: request['user'].sub })
    .getMany();
  }



  async buy(body: any, request: any): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id: request['user'].sub } });
    const crypto = await this.cryptoRepository.findOne({ where: { idCrypto: body.cryptoId } });

    if (!crypto) {
      throw new BadRequestException('Crypto not found');
    }

    // const totalCost = body.amount * crypto.price;
    if (user.credit < body.amount) {
      throw new BadRequestException('Insufficient credit');
    }

    user.credit -= body.amount;
    await this.userRepository.save(user);

    const trade = this.tradeRepository.create({
      user: user,
      crypto: crypto,
      amount: body.amount,
      price: body.price,
      type: 'buy',
      status: 'open'
    });

    return this.tradeRepository.save(trade);
  }

  async sell(body: any, request: any): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id: request['user'].sub } });
    const crypto = await this.cryptoRepository.findOne({ where: { idCrypto: body.cryptoId } });

    if (!crypto) {
      throw new BadRequestException('Crypto not found');
    }

    // const totalRevenue = body.amount * crypto.price;
    user.credit -= body.amount;
    await this.userRepository.save(user);

    const trade = this.tradeRepository.create({
      user: user,
      crypto: crypto,
      amount: body.amount,
      price: body.price,
      type: 'sell',
      status: 'open'
    });

    return this.tradeRepository.save(trade);
  }
}

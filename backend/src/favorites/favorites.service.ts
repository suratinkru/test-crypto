import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';
import { User } from '../user/user.entity';
import { Crypto } from '../crypto/crypto.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Crypto)
    private cryptoRepository: Repository<Crypto>,
  ) {}

  async addFavorite(body: any, request: any): Promise<any> {
    const user = request['user'];


    // Check if the crypto already exists
    let crypto = await this.cryptoRepository.findOne({
      where: { idCrypto: body.id },
    });

    if (!crypto) {
      const newCryptoSet = {
        idCrypto: body.id,
        name: body.name,
        symbol: body.symbol,
        price: 0,
        market_cap: 0,
        logo: body.logo,
      };
      crypto = this.cryptoRepository.create(newCryptoSet);
      await this.cryptoRepository.save(crypto);
    }

    // Check if the favorite already exists
    let favorite = await this.favoriteRepository.findOne({
      where: { user: { id: user.sub }, crypto: { id: crypto.id } },
    });

    if (!favorite) {
      // Create a new favorite entry if it doesn't exist
      favorite = this.favoriteRepository.create({
        user: await this.userRepository.findOne({ where: { id: user.sub } }),
        crypto: crypto,
        favorite: true,
      });
    } else {
      // Update the favorite entry if it exists
      favorite.favorite = body.favorite;
    }

    console.log('Favorite:', favorite);
    return this.favoriteRepository.save(favorite);
  }

  async getFavorites(userId: number): Promise<Favorite[]> {
    return this.favoriteRepository.find({
      where: { user: { id: userId } },
      relations: ['crypto'],
    });
  }

  findAll() {
    return `This action returns all favorites`;
  }

  findOne(id: number) {
    return `This action returns a #${id} favorite`;
  }

  remove(id: number) {
    return `This action removes a #${id} favorite`;
  }
}

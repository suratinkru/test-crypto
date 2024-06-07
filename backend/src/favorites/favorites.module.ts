import { Module } from '@nestjs/common';

import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { User } from '../user/user.entity';
import { Crypto } from '../crypto/crypto.entity';
import { FavoritesService } from './favorites.service';



@Module({
  imports: [TypeOrmModule.forFeature([Favorite, User, Crypto])],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService]
})
export class FavoritesModule {}

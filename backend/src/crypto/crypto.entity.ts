// src/crypto/crypto.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Favorite } from '../favorites/entities/favorite.entity';
import { Trade } from 'src/trades/entities/trade.entity';

@Entity()
export class Crypto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idCrypto: number;

  @Column()
  name: string;

  @Column()
  symbol: string;

  @Column('decimal')
  price: number;

  @Column()
  market_cap: number;

  @Column()
  logo: string;

  @OneToMany(() => Favorite, favorite => favorite.crypto)
  favorites: Favorite[];

  @OneToMany(() => Trade, trade => trade.crypto)
  trades: Trade[];
}

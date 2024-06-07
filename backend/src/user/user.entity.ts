
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Favorite } from '../favorites/entities/favorite.entity';
import { Trade } from '../trades/entities/trade.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ default: 10000 })
  credit: number;


  @OneToMany(() => Favorite, favorite => favorite.user)
  favorites: Favorite[];

  @OneToMany(() => Trade, trade => trade.user)
  trades: Trade[];
}

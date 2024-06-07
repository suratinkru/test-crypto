
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../../user/user.entity';
import { Crypto } from '../../crypto/crypto.entity';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  favorite: boolean;

  @ManyToOne(() => User, user => user.favorites)
  user: User;

  @ManyToOne(() => Crypto, crypto => crypto.favorites)
  crypto: Crypto;


}
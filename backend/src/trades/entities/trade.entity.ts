import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../../user/user.entity';
import { Crypto } from '../../crypto/crypto.entity';

@Entity()
export class Trade {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user: any) => user.trades)
  user: User;

  @ManyToOne(() => Crypto, (crypto: any) => crypto.trades)
  crypto: Crypto;

  @Column('double precision')
  amount: number;

  @Column('double precision')
  price: number;

  @Column()
  type: string; // 'buy' or 'sell'

  @Column()
  status: string; // 'open' or 'closed'

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

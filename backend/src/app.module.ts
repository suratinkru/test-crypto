
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { CryptoModule } from './crypto/crypto.module';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from './gateway/gateway.module';
import { FavoritesModule } from './favorites/favorites.module';
// import { User } from './user/user.entity';
// import { Favorite } from './favorites/entities/favorite.entity';
import { TradesModule } from './trades/trades.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'p0stgres',
      database: process.env.DATABASE_NAME || 'crypto_tracker',
      autoLoadEntities: true,
      // entities: [
      //   User,
      //   Crypto,
      //   Favorite,
      // ],
      synchronize: true,
    }),
    GatewayModule,
    UserModule,
    AuthModule,
    HttpModule,
    UserModule,
    PortfolioModule,
    CryptoModule,
    FavoritesModule,
    TradesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

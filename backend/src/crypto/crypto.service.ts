/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { interval, throwError } from 'rxjs';
import { catchError, delay, retryWhen } from 'rxjs/operators';
import { MyGateway } from '../gateway/gateway';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crypto } from './crypto.entity';

@Injectable()
export class CryptoService implements OnModuleInit {
  // private readonly apiKey = '33c5697a-ae41-4e82-86cd-58aeea515057';
  private readonly apiKey = '666a415b-51bd-488d-8d7f-7c89b6bcc780';
  
  private readonly baseUrl = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';

  @WebSocketServer()
  private server: Server;

  constructor(
    private readonly httpService: HttpService,
    private readonly gateway: MyGateway,
    @InjectRepository(Crypto)
    private cryptoRepository: Repository<Crypto>,
  ) {}

  onModuleInit() {
    this.startFetchingCryptos();
  }

  async getCryptos(): Promise<any> {
    try {
      console.log('ok');
      
      const response = await this.httpService
        .get(this.baseUrl, {
          headers: {
            'X-CMC_PRO_API_KEY': this.apiKey,
          },
          params: {
            start: '1',
            limit: '100',
            convert: 'THB',
          },
        })
        .pipe(
          retryWhen((errors) =>
            errors.pipe(
              delay(1000), // รอ 1 วินาทีแล้ว retry
              catchError((err) => {
                console.error('Retry failed', err);
                return throwError(err);
              }),
            ),
          ),
        )
        .toPromise();
        console.log('response', response.data.data[0]);

      // insert data to database here if needed 

      for (const iterator of response.data.data) {

        const newCryptoSet = {
          idCrypto: iterator.id,
          name: iterator.name,
          symbol: iterator.symbol,
          price: 0,
          market_cap: 0,
          logo: `https://s2.coinmarketcap.com/static/img/coins/64x64/${iterator.id}.png`,
        };
       

        // check if the crypto already exists
        let crypto = await this.cryptoRepository.findOne({
          where: { idCrypto: iterator.id },
        });

        if (!crypto) {
          crypto = this.cryptoRepository.create(newCryptoSet);
          await this.cryptoRepository.save(crypto);
        } else {
          crypto.price = newCryptoSet.price;
          crypto.market_cap = newCryptoSet.market_cap;
          await this.cryptoRepository.save(crypto);
        }
        
      }

  
        

      return response.data.data.map((crypto: any) => ({
        id: crypto.id,
        name: crypto.name,
        symbol: crypto.symbol,
        price: crypto.quote.THB.price,
        market_cap: crypto.quote.THB.market_cap,
        logo: `https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`,
      }));
    } catch (error) {
      console.error('Error fetching data from CoinMarketCap:', error);
      throw error;
    }
  }

  private async fetchCryptos(): Promise<any> {
    return await this.getCryptos();
  }

  private startFetchingCryptos() {
    interval(1000000).subscribe(async () => {
      try {
        const cryptos = await this.fetchCryptos();
       
        console.log("cryp:",cryptos);
        
        // gateway is used to emit the data to the client
        this.gateway.server.emit('cryptos', cryptos);
      } catch (error) {
        console.error('Error emitting cryptos', error);
      }
    });
  }
}

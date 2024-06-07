import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Injectable } from '@nestjs/common';

@WebSocketGateway()
@Injectable()
export class CryptoGateway {
  @WebSocketServer()
  server: Server;

  sendCryptos(cryptos: any) {
    this.server.emit('cryptos', cryptos);
  }
}

import { makeAutoObservable } from 'mobx';
import axios from 'axios';

class TradesStore {
  credit: number = 0;
  feeRate: number = 0.001; // Binance's trading fee rate is 0.1%

  constructor() {
    makeAutoObservable(this);
  }

  async loadCredit() {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    const response = await axios.get('http://localhost:4000/api/users/credit',config);
    this.credit = response.data.credit;
  }

  async buyCrypto(cryptoId: string, amount: number, price: number) {



    // header for token
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }


    if (this.credit < amount) {
      throw new Error('Insufficient credit');
    }

    const response = await axios.post('http://localhost:4000/api/trades/buy', { cryptoId, amount, price }, config);
    this.credit -= amount;
    return response.data;
  }

  async sellCrypto(cryptoId: string, amount: number, price: number) {
    // header for token
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }


    const response = await axios.post('http://localhost:4000/api/trades/sell', { cryptoId, amount, price }, config);
    this.credit -= amount;
    return response.data;
  }
}

export default TradesStore;
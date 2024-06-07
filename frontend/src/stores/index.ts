
import TradesStore from './tradesStore';

class RootStore {
  tradesStore: TradesStore;


  constructor() {
    this.tradesStore = new TradesStore();
 
  }
}

const stores = new RootStore();

export const useStores = () => stores;

import { makeAutoObservable } from "mobx";

interface Crypto {
  id: number;
  idCrypto: number;
  name: string;
  symbol: string;
  price: string;
  market_cap: number;
  logo: string;
}

interface Favorite {
  id: number;
  favorite: boolean;
  crypto: Crypto;
}

class FavoritesStore {
  favorites: Favorite[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setFavorites(favorites: Favorite[]) {
    console.log("Setting favorites:", favorites);
    this.favorites = favorites;
  }

  toggleFavorite(crypto: Crypto) {
    console.log("Toggling favorite for:", crypto);
    const index = this.favorites.findIndex(fav => fav.crypto.idCrypto === crypto.idCrypto);
    if (index > -1) {
      this.favorites[index].favorite = !this.favorites[index].favorite;
    } else {
      this.favorites.push({ id: this.favorites.length + 1, favorite: true, crypto });
    }
    console.log("Updated favorites:", this.favorites);
  }

  isFavorite(cryptoId: number): boolean {
    return this.favorites.some(fav => fav.crypto.idCrypto === cryptoId && fav.favorite);
  }
}

const favoritesStore = new FavoritesStore();
export default favoritesStore;

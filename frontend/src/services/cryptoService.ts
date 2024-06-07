import axios from "axios";

const BASE_URL = 'http://localhost:4000/api/crypto';

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  price: GLfloat;
  market_cap?: GLfloat;
  logo: string;
  favorite?: boolean;
}

export const getCryptos = async (): Promise<Crypto[]> => {
    try {
        // Send a GET request to the API at http://localhost:4000/crypto
        const response = await axios.get(BASE_URL);

        console.log(response);
        
        return response.data.map((crypto: Crypto) => ({
            id: crypto.id,
            name: crypto.name,
            symbol: crypto.symbol,
            price: crypto.price,
            logo: crypto.logo,
            market_cap: crypto.market_cap,
        }));

    } catch (error) {
        console.error('Error fetching data from CoinMarketCap:', error);
        return []; // Return an empty array in case of error
    }
};
// src/components/FavoriteCoins.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import favoritesStore from "../stores/FavoritesStore";
import { getCryptos } from "../services/cryptoService";
import { io } from "socket.io-client";
import { Box, Grid, ListItem, ListItemText, Typography } from "@mui/material";

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  price: number;
  logo: string;
  market_cap?: number;
  indexId?: number;
  favorite?: boolean;
}

const FavoriteCoins: React.FC = () => {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [favorites, setFavorites] = useState<Crypto[]>([]);

  const handleGetFavorites = async () => {
    try {
      // get token to local storage
      const token = localStorage.getItem("token");

      // set token to header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        "http://localhost:4000/api/favorites",
        config
      );

      await favoritesStore.setFavorites(response.data);

      // set to state mobx favorites array

      await fetchCryptos();
    } catch (error: any) {
      if (error.response.status === 401) {
        // redirect to login page and remove token from local storage
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }
      console.error("Failed to get favorites", error);
    }
  };

  const fetchCryptos = async () => {
    try {
      const data: Crypto[] = await getCryptos();

      // map favorites to cryptos
      if (favoritesStore.favorites.length > 0) {
        const dataset: Crypto[] = favoritesStore.favorites.map(
          (crypto: any, index: number) => {
            const resp: any = data.find((c) => c.id === crypto.crypto.idCrypto);

            return {
              id: resp.id,
              name: resp.name,
              symbol: resp.symbol,
              price: resp.price,
              logo: resp.logo,
              favorite: crypto.favorite,
            };
          }
        );

        setFavorites(dataset.filter((crypto) => crypto.favorite === true));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createRows = (data: Crypto[]) => {
    if (favoritesStore.favorites.length > 0) {
      const dataset: Crypto[] = favoritesStore.favorites.map(
        (crypto: any, index: number) => {
          const resp: any = data.find((c) => c.id === crypto.crypto.idCrypto);

          return {
            id: resp.id,
            name: resp.name,
            symbol: resp.symbol,
            price: resp.price,
            logo: resp.logo,
            favorite: crypto.favorite,
          };
        }
      );

      return dataset.filter((crypto) => crypto.favorite === true);
    } else {
      return [];
    }
  };

  useEffect(() => {
    handleGetFavorites();
    const socket = io("http://localhost:4000");

    socket.on("cryptos", (data: Crypto[]) => {
      if (!data) {
        console.error("Received undefined data");
        return;
      }

      setFavorites(createRows(data));
    });

    socket.on("connect_error", (err) => {
      console.error("Connection failed", err);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <Typography variant="h6" sx={{ color: "#00BCD4", mt: 5 }}>
        Favorites Coins
      </Typography>

      {favorites.map((crypto: any) => (
        <ListItem key={crypto.id} sx={{ p: 0 }}>
          <Box
            sx={{
              flexGrow: 1,
              borderRadius: "8px",
              backgroundColor: "#27293a",
              mb: 1,
              p: 1,
              color: "white",
            }}
          >
            <Grid container spacing={1} columns={16}>
              <Grid item xs={1}>
                <Grid
                  sx={{
                    textAlign: "right",
                    paddingTop: "5px",
                    paddingRight: "3px",
                  }}
                >
                  <img src={crypto.logo} alt={crypto.name} width="20" />
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid>
                  <ListItemText
                    primary={
                      <>
                        <span style={{ color: "yellowgreen" }}>
                          {crypto.name}
                        </span>{" "}
                        {crypto.symbol}
                      </>
                    }
                  />
                </Grid>
              </Grid>
              <Grid item xs={9} sm={9} md={11}>
                <Grid>
                  <ListItemText
                    primary={
                      <>
                        <span style={{ color: "yellowgreen" }}>฿</span>{" "}
                        {crypto.price}
                      </>
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </ListItem>
      ))}
    </>
  );
};

export default FavoriteCoins;

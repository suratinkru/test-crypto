import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import {
  alpha,
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";

import { Chart, registerables } from "chart.js";
import TradeButton from "../components/TradeButton";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { getCryptos } from "../services/cryptoService";
import favoritesStore from "../stores/FavoritesStore";

Chart.register(...registerables);

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  price: GLfloat;
  logo: string;
  market_cap?: GLfloat;
  indexId?: number;
  favorite?: boolean;
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "12px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Trading: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);


  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [chartData, setChartData] = useState<any>({});
  const [cryptosFull, setCryptosFull] = useState<Crypto[]>([]);

  const createChartData = (data: Crypto[]) => {
    const labels = data.map((crypto) => crypto.symbol);
    const prices = data.map((crypto) => crypto.price);

    return {
      labels,
      datasets: [
        {
          label: "Crypto Prices",
          data: prices,
          fill: false,
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(75,192,192,1)",
        },
      ],
    };
  };

  const createRows = (data: Crypto[]) => {
    if (favoritesStore.favorites.length === 0) {
      return data.map((crypto, index) => ({ ...crypto, indexId: index + 1 }));
    }

    data.forEach((crypto) => {
      const favorite = favoritesStore.favorites.find(
        (f: any) => f.crypto.idCrypto === crypto.id
      );
      crypto.favorite = favorite ? favorite.favorite : false;
    });

    return data.map((crypto, index) => ({ ...crypto, indexId: index + 1 }));
  };

  const fetchCryptos = async () => {
    try {
      setIsLoading(true);
      const data: Crypto[] = await getCryptos();
      console.log("ok1");
      // map favorites to cryptos

      if (favoritesStore.favorites.length === 0) {
        setCryptos(
          data.map((crypto, index) => ({ ...crypto, indexId: index + 1 }))
        );
        setCryptosFull(
          data.map((crypto, index) => ({ ...crypto, indexId: index + 1 }))
        )
        // return;
      }

      data.forEach((crypto) => {
        const favorite = favoritesStore.favorites.find(
          (f: any) => f.crypto.idCrypto === crypto.id
        );
        crypto.favorite = favorite ? favorite.favorite : false;
      });

      setCryptos(
        data.map((crypto, index) => ({ ...crypto, indexId: index + 1 }))
      );
      setCryptosFull(
        data.map((crypto, index) => ({ ...crypto, indexId: index + 1 }))
      )

      console.log("ok");
      
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleGetFavorites = async () => {
    try {
      setIsLoading(true);
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

      favoritesStore.setFavorites(response.data);

      // set to state mobx favorites array

      await fetchCryptos();
    } catch (error: any) {
      setIsLoading(true);

      if (error.response.status === 401) {
        // redirect to login page and remove token from local storage
        localStorage.removeItem("token");
        window.location.href = "/login";

        return;
      }
      console.error("Failed to get favorites", error);
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

      setCryptos(createRows(data));
      setChartData(createChartData(data));
    });

    socket.on("connect_error", (err) => {
      console.error("Connection failed", err);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleFavorite = async (crypto: Crypto) => {
    const updatedCrypto = { ...crypto, favorite: !crypto.favorite };

    try {
      // get token to local storage
      const token = localStorage.getItem("token");

      // set token to header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post(
        "http://localhost:4000/api/favorites",
        updatedCrypto,
        config
      );

      // update favorite status in cryptos state

      await handleGetFavorites();
      setCryptos((prevCryptos) =>
        prevCryptos.map((c) => (c.id === crypto.id ? updatedCrypto : c))
      );
    } catch (error: any) {
      console.error("Failed to update favorite status", error);
      if (error.response.status === 401) {
        // redirect to login page and remove token from local storage
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    if (search === "") {
      setCryptos(cryptosFull);
    } else {
      const filteredCryptos = cryptosFull.filter((crypto) =>
        crypto.name.toLowerCase().includes(search.toLowerCase())
      );
      setCryptos(filteredCryptos);
    }
  };

  return (
    <>
      {!isLoading ? (
        <Container maxWidth="md"  sx={{ backgroundColor: "#1d1e29", borderRadius: "8px" ,pt:3,mt:5,height:"auto"}}>
              <Typography variant="h6" sx={{textAlign:"center",color:"whitesmoke"}}>Top 100 Cryptocurrencies</Typography>
    
    <div style={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          p: 1,
          m: 1,
          borderRadius: 1,
        }}
      >
        <Grid>
          <Typography variant="h6" component="div" sx={{color:"whitesmoke"}}>
          Assets
          </Typography>
        </Grid>
        <Grid sx={{ flexGrow: 1 }}>
          {" "}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearch}
            />
          </Search>
        </Grid>
      </Box>
    </div>

          <div style={{ height: 600, width: "100%" }}>
            <List dense={false}>
              {cryptos.map((crypto) => (
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
                    <Grid container spacing={2} columns={16}>
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
                      <Grid item xs={3}>
                        <Grid>
                          <ListItemText primary={crypto.name} 
                           secondary={crypto.symbol}
                          />
                        </Grid>
                      </Grid>
                     
                      <Grid item xs={9} sm={9} md={4.5}>
                        <Grid>
                          <ListItemText
                            primary={
                              <>
                                <span style={{ color: "yellowgreen" }}>฿</span>{" "}
                                {crypto.price}
                              </>
                            }
                            secondary={crypto.market_cap}
                          />
                        </Grid>
                      </Grid>
                      

                      <Grid item xs={8} sm={8} md={4.5}>
                        <Grid>
                          <TradeButton crypto={crypto as Crypto} />
                        </Grid>
                      </Grid>

                      <Grid item xs={8} sm={8} md={1}>
                        <Grid>
                          <IconButton onClick={() => handleFavorite(crypto)}>
                            {crypto.favorite ? (
                              <Favorite style={{ color: "red" }} />
                            ) : (
                              <FavoriteBorder />
                            )}
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </ListItem>
              ))}

              {/* <DataGrid
              rows={cryptos}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 100 },
                },
              }}
              pageSizeOptions={[5, 10]}
              // checkboxSelection
            /> */}
            </List>
          </div>

          {/* <div style={{ marginTop: 50 }}>
            {chartData.labels && chartData.datasets && (
              <Line data={chartData} />
            )}
          </div> */}
        </Container>
      ) : (
        <Backdrop open={true}>
          <CircularProgress sx={{ color: "whitesmoke" }} />
        </Backdrop>
      )}
    </>
  );
};

export default Trading;

// src/components/Dashboard.tsx
import React, { useEffect, useState } from "react";
import {  GridRenderCellParams } from "@mui/x-data-grid";
import io from "socket.io-client";
import { getCryptos } from "../services/cryptoService";
import SearchIcon from "@mui/icons-material/Search";
import {
  alpha,

  Backdrop,
  Box,
  CircularProgress,
  Container,
  Grid,
  InputBase,
  List,
  ListItem,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  price: GLfloat;
  logo: string;
  market_cap?: GLfloat;
  indexId?: number;
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

const Dashboard: React.FC = () => {
  const [dense, setDense] = React.useState(false);
  const [isLoaded, setIsLoaded] = useState(false);


  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [cryptosFull, setCryptosFull] = useState<Crypto[]>([]);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        setIsLoaded(true);
        const data: Crypto[] = await getCryptos();

        setCryptosFull(
          data.map((crypto, index) => ({ ...crypto, indexId: index + 1 }))
        );
        setCryptos(
          data.map((crypto, index) => ({ ...crypto, indexId: index + 1 }))
        )
        setIsLoaded(false);
      } catch (error) {
        console.error(error);
        setIsLoaded(false);
      }
    };
    fetchCryptos();
console.log("ddddddddddddddddd",process.env.ENPOIN_BACKEND);

    const socket = io("http://localhost:4000");

    socket.on("cryptos", (data: Crypto[]) => {
      setCryptosFull((prevCryptos) =>
        data.map((crypto, index) => ({ ...crypto, indexId: index + 1 }))
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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
      <Container
        maxWidth="md"
        sx={{ backgroundColor: "#1d1e29", borderRadius: "8px" ,pt:3,mt:5}}
      >
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

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
    
              <Grid>
                <List dense={dense}>

                  {
                    // loading cryptos.length > 0 ?
                    !isLoaded ? (
                      cryptos.map((crypto) => (
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
                                  <img
                                    src={crypto.logo}
                                    alt={crypto.name}
                                    width="20"
                                  />
                                </Grid>
                              </Grid>
                              <Grid item xs={4}>
                                <Grid>
                                  <ListItemText primary={crypto.name} />
                                </Grid>
                              </Grid>
                              <Grid item xs={2}>
                                <Grid>
                                  <ListItemText
                                    sx={{ color: "#6b6baf" }}
                                    primary={crypto.symbol}
                                  />
                                </Grid>
                              </Grid>
                              <Grid item xs={9} sm={9} md={4.5}>
                                <Grid>
                                  <ListItemText
                                    primary={
                                      <>
                                        <span style={{ color: "yellowgreen" }}>
                                          ฿
                                        </span>{" "}
                                        {crypto.price}
                                      </>
                                    }
                                  />
                                </Grid>
                              </Grid>
                              <Grid item xs={16} sm={16} md={4.5}>
                                <Grid>
                                  <ListItemText
                                    sx={{ color: "#6b6baf" }}
                                    primary={crypto.market_cap}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Box>
                        </ListItem>
                      ))
                    ) : (
                      <ListItem>
                       <Backdrop open={true}>
                      <CircularProgress sx={{color:"whitesmoke"}} />
                    </Backdrop>
                      </ListItem>
                    )
                  }

                  
                  
                 
                </List>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Dashboard;

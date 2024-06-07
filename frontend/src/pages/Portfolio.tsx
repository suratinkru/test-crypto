import React, { useEffect, useState } from "react";
import FavoriteCoins from "../components/FavoriteCoins";
import TradeDetails from "../components/TradeDetails";
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Grid,
  ListItem,
  Typography,
} from "@mui/material";

const Portfolio: React.FC = () => {
  const [trades, setTrades] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetchTrades();
  }, []);

  const fetchTrades = async () => {
    setIsLoaded(true);
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const resp = await fetch("http://localhost:4000/api/trades", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await resp.json();
      setTrades(data);
      setIsLoaded(false);
    } catch (error) {
      setIsLoaded(false);
    }
  };

  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  return !isLoaded ? (
    <Container
      maxWidth="md"
      sx={{
        backgroundColor: "#1d1e29",
        borderRadius: "8px",
        pt: 3,
        mt: 5,
        height: "auto",
        p: 3,
      }}
    >
      <div style={{ width: "100%" }}>
        <Grid
          container
          // spacing={2}
          sx={{ borderRadius: "12px", backgroundColor: "#191b1e", p: 1 }}
        >
          <Grid item xs={12}>
            <Typography
              variant="h5"
              sx={{ color: "whitesmoke", mb: 2, textAlign: "center" }}
            >
              My Profile
            </Typography>
          </Grid>

          <Grid item xs={6} sm={6}>
            <Typography
              variant="h6"
              sx={{ fontSize: "1rem", color: "#326893", textAlign: "right" }}
            >
              Name:
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Typography
              variant="h6"
              sx={{ fontSize: "1rem", color: "whitesmoke" }}
            >
              {firstName} {lastName}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Typography
              variant="h6"
              sx={{ fontSize: "1rem", color: "#326893", textAlign: "right" }}
            >
              Username:
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Typography
              variant="h6"
              sx={{ fontSize: "1rem", color: "whitesmoke" }}
            >
              {username}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Typography
              variant="h6"
              sx={{ fontSize: "1rem", color: "#326893", textAlign: "right" }}
            >
              Email:
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Typography
              variant="h6"
              sx={{ fontSize: "1rem", color: "whitesmoke" }}
            >
              {email}
            </Typography>
          </Grid>
        </Grid>
      </div>

      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={4} sm={4} md={6}>
            <Grid>
              <FavoriteCoins />
            </Grid>
          </Grid>
          <Grid item xs={4} sm={4} md={6}>
            <Grid>{trades.length > 0 && <TradeDetails trades={trades} />}</Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  ) : (
    <ListItem>
      <Backdrop open={true}>
        <CircularProgress sx={{ color: "whitesmoke" }} />
      </Backdrop>
    </ListItem>
  );
};

export default Portfolio;

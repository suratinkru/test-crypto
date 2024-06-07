import { Box, Grid, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";

interface Trade {
  cryptoId: string;
  amount: number;
  price: number;
  type: string;
}

interface TradeDetailsProps {
  trades: Trade[];
}

const TradeDetails: React.FC<TradeDetailsProps> = ({ trades }) => {
  return (
    <div>
      <Typography variant="h6" sx={{ color: "#00BCD4", mt: 5 }}>
        Trade Details
      </Typography>

      {/* แก้จาก table to list เหมือน favoitecoins */}

      {trades?.map((trade: any, index) => (
        <ListItem key={index} sx={{ p: 0 }}>
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
                  <img
                    src={trade.crypto.logo}
                    alt={trade.crypto.name}
                    width="20"
                  />
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid>
                  <ListItemText
                    primary={
                      <>
                        <span style={{ color: "#2196F3" }}>
                          {trade.crypto.name}
                        </span>{" "}
                        {trade.crypto.symbol}
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
                        <span style={{ color: "#2196F3" }}>฿</span>{" "}
                        {trade.price}
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
                        {trade.type} {trade.amount} ฿.
                      </>
                    }
                    sx={{ color: trade.type === "buy" ? "#4CAF50" : "#F44336" }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </ListItem>
      ))}
    </div>
  );
};

export default TradeDetails;

import React, { useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStores } from '../stores';

interface TradeButtonProps {
  crypto: {
    id: string;
    name: string;
    symbol: string;
    price: GLfloat;
    logo: string;
    market_cap?: GLfloat;
    indexId?: number;
    favorite?: boolean;
  };
}

const TradeButton: React.FC<TradeButtonProps> = ({ crypto }) => {
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = React.useState(0);
  const { tradesStore } = useStores();

  useEffect(() => {
    tradesStore.loadCredit();
  }, [tradesStore]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBuy = async () => {
    try {
      await tradesStore.buyCrypto(crypto.id, amount, crypto.price);
      console.log(`Buying ${amount} of ${crypto.name} at ${crypto.price} per unit`);
    } catch (error) {
      console.error('Buy error:', error);
    }
    handleClose();
  };

  const handleSell = async () => {
    try {
      await tradesStore.sellCrypto(crypto.id, amount, crypto.price);
      console.log(`Selling ${amount} of ${crypto.name} at ${crypto.price} per unit`);
    } catch (error) {
      console.error('Sell error:', error);
    }
    handleClose();
  };

  return (
    <>
      <Button variant="contained"  onClick={handleClickOpen}
      sx={{backgroundColor:"rgb(130 133 158)",textDecoration:'none',color:"whitesmoke",borderRadius:"16px",textTransform:"none"}} 
      size='small'
      >
        Trade
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Trade {crypto.name}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <div>Current Credit: {tradesStore.credit}</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleBuy} color="primary">
            Buy
          </Button>
          <Button onClick={handleSell} color="secondary">
            Sell
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default observer(TradeButton);

// src/pages/Login.tsx
import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, ThemeProvider, createTheme, withStyles, styled } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { login } from '../services/usersService';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';

interface LoginResponse {
  message: string;
  respCode: number;
  data: [
    {
      asccessToken: string;
      user?: any;
    }
  ];
}

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgb(39, 41, 58)',
    borderRadius: 16,
    color: 'white',
  },
  '& .MuiOutlinedInput-input': {
    color: 'white',
    '&:-webkit-autofill': {
      backgroundColor: 'rgb(39, 41, 58)',
      borderRadius: 16,
      color: 'white',
    },
    '&:-webkit-autofill:selected': {
      backgroundColor: 'rgb(39, 41, 58)',
      borderRadius: 16,
      color: 'white',
    },
  },
  '& .MuiInputBase-root': {
    backgroundColor: 'rgb(39, 41, 58)',
    borderRadius: 16,
    color: 'white',
  },
  '& .MuiInput-input': {
    color: 'white',
    backgroundColor:'rgb(39, 41, 58)'
  },
  '& .MuiFormLabel-root': {
    color: 'white',
  },
});

const theme = createTheme();

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validate = (): boolean => {
    let isValid = true;
    setUsernameError('');
    setPasswordError('');

    if (!username) {
      setUsernameError('username is required');
      isValid = false;
    } 

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) {
      const resp:AxiosResponse<LoginResponse> = await login({ username, password });
      if (resp.data.respCode === 200) {
        // set token to local storage 
        localStorage.setItem('token', resp.data.data[0].asccessToken);
        localStorage.setItem('username', resp.data.data[0].user.username);
        localStorage.setItem('email', resp.data.data[0].user.email);
        localStorage.setItem('firstName', resp.data.data[0].user.firstName);
        localStorage.setItem('lastName', resp.data.data[0].user.lastName);

 
        navigate('/')
      } else {
        // alert('Login failed:', resp.data.message);
        console.error('Login failed:', resp.data.message);
      }
     }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{color:"whitesmoke"}}>
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <StyledTextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="username Address"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={!!usernameError}
              helperText={usernameError}
              size='small'
            />
            <StyledTextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"

              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
              size='small'
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,backgroundColor:"rgb(39, 41, 58)",color:"whitesmoke",borderRadius:"16px" }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link href="register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;

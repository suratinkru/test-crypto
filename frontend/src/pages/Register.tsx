// src/pages/Register.tsx
import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, ThemeProvider, createTheme, styled } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createUser } from '../services/usersService';
import { useNavigate } from 'react-router-dom';

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

const Register: React.FC = () => {
    const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = () => {
    let errors = { firstName: '', lastName: '', username: '', email: '', password: '', confirmPassword: '' };
    let isValid = true;

    if (!formValues.firstName) {
      errors.firstName = 'First Name is required';
      isValid = false;
    }
    if (!formValues.lastName) {
      errors.lastName = 'Last Name is required';
      isValid = false;
    }
    if (!formValues.username) {
      errors.username = 'Username is required';
      isValid = false;
    }
    if (!formValues.email) {
        // check format email with regex here 
        
      errors.email = 'Email is required';
      isValid = false;
    }
    if (formValues.email) {
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formValues.email)) {
            errors.email = 'Invalid email format';
            isValid = false;
        }
    }
    
    if (!formValues.password) {
      errors.password = 'Password is required';
      isValid = false;
    }

    // Test@088
 
    if (formValues.password) {
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(formValues.password)) {
            errors.password = 'Password must be at least 8 characters long and contain at least one number, one lowercase letter, one uppercase letter, and one special character';
            isValid = false;
        }
    }
    if (!formValues.confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required';
      isValid = false;
    } else if (formValues.password !== formValues.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) {
      console.log(formValues);
      const resp:any = await createUser(formValues);
        console.log(resp);

       if (resp.data.respCode === 201) {
           // navigate to login page
           navigate('/login')
       } else {
           // show error message
           alert(resp.data.message);
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
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  size='small'
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={formValues.firstName}
                  onChange={handleChange}
                  error={!!formErrors.firstName}
                  helperText={formErrors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  size='small'
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formValues.lastName}
                  onChange={handleChange}
                  error={!!formErrors.lastName}
                  helperText={formErrors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  required
                  size='small'
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={formValues.username}
                  onChange={handleChange}
                  error={!!formErrors.username}
                  helperText={formErrors.username}
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  required
                  size='small'
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formValues.email}
                  onChange={handleChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  required
                  size='small'
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formValues.password}
                  onChange={handleChange}
                  error={!!formErrors.password}
                  helperText={formErrors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  required
                  size='small'
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={formValues.confirmPassword}
                  onChange={handleChange}
                  error={!!formErrors.confirmPassword}
                  helperText={formErrors.confirmPassword}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,backgroundColor:"rgb(39, 41, 58)",color:"whitesmoke",borderRadius:"16px" }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Register;

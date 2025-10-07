import React from 'react';
import { Box, Typography, Button, Container, Grid, Paper, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
import { useAuth } from '../context/auth/AuthContext';
import { Link as RouterLink } from 'react-router-dom';
import Recommendations from '../features/recommendations/Recommendations';
import { Logout, Recommend } from '@mui/icons-material';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            E-commerce Dashboard
          </Typography>
          <Typography variant="subtitle1" sx={{ mr: 2 }}>
            Welcome, {user?.name || 'User'}!
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ mt: 10, p: 3 }}>
        <Grid container spacing={3}>
          {/* Sidebar */}
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" gutterBottom>
                Navigation
              </Typography>
              <Stack spacing={2}>
                <Button
                  component={RouterLink}
                  to="/recommendations"
                  variant="contained"
                  startIcon={<Recommend />}
                  fullWidth
                >
                  Recommendations
                </Button>
              </Stack>
            </Paper>
          </Grid>
          
          {/* Main Content */}
          <Grid item xs={12} md={9}>
            <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h5" gutterBottom>
                Your Personalized Recommendations
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Recommendations />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;

import React from 'react';
import { Box, Typography, Button, Container, Grid, Paper, Stack } from '@mui/material';
import { useAuth } from '../context/auth/AuthContext';
import { Link as RouterLink } from 'react-router-dom';
import Recommendations from '../features/recommendations/Recommendations';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
        Welcome to Your Dashboard, {user?.name || 'User'}!
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 4 }}>
        You are now logged in with the email: {user?.email}
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 3fr' }, gap: 3 }}>
        {/* Sidebar */}
        <Box>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Navigation
            </Typography>
            <Stack spacing={1}>
              <Button 
                component={RouterLink} 
                to="/recommendations" 
                variant="outlined" 
                fullWidth
                sx={{ justifyContent: 'flex-start' }}
              >
                Recommended For You
              </Button>
              <Button 
                onClick={handleLogout} 
                variant="outlined" 
                color="error"
                fullWidth
                sx={{ justifyContent: 'flex-start', mt: 2 }}
              >
                Logout
              </Button>
            </Stack>
          </Paper>
        </Box>
        
        {/* Main Content */}
        <Box>
          <Paper sx={{ p: 3, minHeight: '60vh' }}>
            <Typography variant="h5" gutterBottom>
              Your Personalized Recommendations
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Recommendations />
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;

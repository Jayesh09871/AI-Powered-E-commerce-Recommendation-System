import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Button,
  Rating,
} from '@mui/material';
import { fetchRecommendations, selectAllRecommendations, selectRecommendationsStatus, selectRecommendationsError } from './recommendationsSlice';
import { useTrackProductViewMutation } from '../api/apiSlice';

const ProductCard = ({ product }) => {
  const [trackProductView] = useTrackProductViewMutation();

  useEffect(() => {
    // Track when this product is viewed
    trackProductView(product.id);
  }, [product.id, trackProductView]);

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="140"
        image={product.image || '/placeholder-product.jpg'}
        alt={product.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {product.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={product.rating || 0} precision={0.5} readOnly size="small" />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({product.reviewCount || 0})
          </Typography>
        </Box>
        <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
          ${product.price?.toFixed(2) || 'N/A'}
        </Typography>
      </CardContent>
    </Card>
  );
};

const Recommendations = () => {
  const dispatch = useDispatch();
  const recommendations = useSelector(selectAllRecommendations);
  const status = useSelector(selectRecommendationsStatus);
  const error = useSelector(selectRecommendationsError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRecommendations());
    }
  }, [status, dispatch]);

  let content;

  if (status === 'loading') {
    content = (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  } else if (status === 'succeeded') {
    // Safely handle cases where recommendations might be undefined or null
    const hasRecommendations = Array.isArray(recommendations) && recommendations.length > 0;
    
    if (hasRecommendations) {
      content = (
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)'
          },
          gap: 3
        }}>
          {recommendations.map((product) => (
            <Box key={product.id}>
              <ProductCard product={product} />
            </Box>
          ))}
        </Box>
      );
    } else {
      content = (
        <Box textAlign="center" p={4}>
          <Typography variant="h6" color="textSecondary">
            No recommendations available yet. Start browsing products to get personalized recommendations!
          </Typography>
        </Box>
      );
    }
  } else if (status === 'failed') {
    content = (
      <Box textAlign="center" p={4}>
        <Typography color="error" gutterBottom>
          {error || 'Failed to load recommendations'}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch(fetchRecommendations())}
          sx={{ mt: 2 }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Recommended For You
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Discover products tailored just for you based on your browsing and purchase history.
      </Typography>
      {content}
    </Box>
  );
};

export default Recommendations;

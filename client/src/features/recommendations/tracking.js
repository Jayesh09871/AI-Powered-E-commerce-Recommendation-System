import { useTrackProductView, useTrackPurchase } from '../api/apiSlice';

// Track when a product is viewed
export const useProductViewTracker = (productId) => {
  const [trackView] = useTrackProductView();
  
  const trackProductView = React.useCallback(() => {
    if (productId) {
      trackView(productId).unwrap()
        .catch(error => {
          console.error('Failed to track product view:', error);
        });
    }
  }, [productId, trackView]);

  // Track when the component mounts or productId changes
  React.useEffect(() => {
    trackProductView();
  }, [trackProductView]);

  return { trackProductView };
};

// Track when a product is purchased
export const usePurchaseTracker = () => {
  const [trackPurchase] = useTrackPurchase();
  
  const trackProductPurchase = React.useCallback((productId) => {
    if (productId) {
      trackPurchase(productId).unwrap()
        .catch(error => {
          console.error('Failed to track product purchase:', error);
        });
    }
  }, [trackPurchase]);

  return { trackProductPurchase };
};

// Higher-order component for tracking product views
export const withProductTracking = (WrappedComponent) => {
  return function WithProductTracking(props) {
    const { productId } = props;
    useProductViewTracker(productId);
    
    return <WrappedComponent {...props} />;
  };
};

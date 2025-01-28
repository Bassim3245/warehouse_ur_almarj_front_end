import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';
const TRACKING_ID = "G-2H0DW1GEQW"; // Replace with your Google Analytics Tracking ID
ReactGA.initialize(TRACKING_ID);
const GoogleAnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname + location.search;
    ReactGA.set({ page: currentPath });
    ReactGA.pageview(currentPath);
  }, [location]);

  return null;
};

export default GoogleAnalyticsTracker;

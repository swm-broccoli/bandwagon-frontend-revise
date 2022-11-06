import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

function RouteChangeTracker () {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!window.location.href.includes('localhost')) {
      ReactGA.initialize(import.meta.env.VITE_GOOGLE_ANALYTICS_ID);
      setInitialized(true);
    };
  }, []);

  useEffect(() => {
    if (initialized) {
      ReactGA.send({hitType: "pageView", page: location.pathname + location.search})
    }
  }, [initialized, location]);
}

export default RouteChangeTracker;
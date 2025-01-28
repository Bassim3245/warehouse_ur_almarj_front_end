import React, { useState, useEffect } from 'react';

// Utility function to check if cookies are enabled
const checkCookiesEnabled = () => {
  const testCookie = 'testCookie=1';
  document.cookie = testCookie;

  // Check if cookie is set
  return document.cookie.includes(testCookie);
};

const CookieStatus = () => {
  const [cookiesEnabled, setCookiesEnabled] = useState(null);

  useEffect(() => {
    // Check if cookies are enabled when the component mounts
    setCookiesEnabled(checkCookiesEnabled());
  }, []);

  return (
    <div>
      {cookiesEnabled === null ? (
        <p>Loading...</p>
      ) : cookiesEnabled ? (
        <p>Cookies are enabled!</p>
      ) : (
        <p>Cookies are not enabled. Please enable cookies to proceed.</p>
      )}
    </div>
  );
};

export default CookieStatus;

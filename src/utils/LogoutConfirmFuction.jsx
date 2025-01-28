import React, { useEffect } from "react";

const ConfirmLogoutOnClose = () => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Show confirmation dialog
      const message = "Are you sure you want to leave? You will be logged out.";
      event.preventDefault();
      event.returnValue = message; // For most browsers
      return message; // For some older browsers
    };

    // Add the event listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>Close the tab or browser to test the alert.</p>
    </div>
  );
};

export default ConfirmLogoutOnClose;

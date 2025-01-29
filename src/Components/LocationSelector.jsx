import React, { useState } from "react";
import axios from "axios";

const LocationSelector = () => {
  const [location, setLocation] = useState("");

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Latitude:", latitude, "Longitude:", longitude);

          // Send lat/lon to your backend or get address using a geocoding API
          const response = await axios.get(
            `/api/reverse-geocode?lat=${latitude}&lon=${longitude}`
          );
          setLocation(response.data.address); // Display the address
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div>
      <button onClick={getLocation}>📍 Use My Current Location</button>
      {location && <p>Your Address: {location}</p>}
    </div>
  );
};

export default LocationSelector;
import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "580px",
  height: "290px",
};

const mobileContainerStyle = {
  width: "100%",
  height: "250px",
};

const mapOptions = {
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  zoomControl: false,
  draggable: false,
};

function DeliveryLocationMap({ address_info }) {
  const { isLoaded } = useLoadScript({
    // googleMapsApiKey: "AIzaSyBCllVZsJjrhrGSJLJTE5NzPNt94ChqHc8",
    googleMapsApiKey:"AIzaSyBhUqdMX-GUuJUlMuEj7oggAkLuDkVdjbU",
  });

  const [location, setLocation] = useState(null);

  const fetchLatLngFromAddress = async (address) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=AIzaSyBhUqdMX-GUuJUlMuEj7oggAkLuDkVdjbU`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK") {
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
      } else {
        console.error(`Geocoding failed for ${address}:`, data.status);
        return null;
      }
    } catch (error) {
      console.error(`Error fetching geocode for ${address}:`, error);
      return null;
    }
  };

  useEffect(() => {
    const fetchLocation = async () => {
      if (address_info) {
        const result = await fetchLatLngFromAddress(address_info);
        setLocation(result);
      }
    };

    fetchLocation();
  }, [address_info]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <div className="google-map-desktop">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location || { lat: 37.7749, lng: -122.4194 }} // Default center if location is not available
          zoom={location ? 15 : 7}
          options={mapOptions}
        >
          {location && <Marker position={{ lat: 37.7749, lng: -122.4194 }} />}
        </GoogleMap>
      </div>
      <div className="google-map-mobile">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location || { lat: 37.7749, lng: -122.4194 }} // Default center if location is not available
          zoom={location ? 15 : 7}
          options={mapOptions}
        >
          {location && <Marker position={{ lat: 37.7749, lng: -122.4194 }} />}
        </GoogleMap>
      </div>
    </>
  );
}

export default DeliveryLocationMap;

// import React, { useRef, useEffect } from "react";
// import { GoogleMap, LoadScript } from "@react-google-maps/api";

// const DeliveryLocationMap = () => {
//   const mapContainerStyle = {
//     width: "100%",
//     height: "500px",
//   };

//   const center = {
//     lat: 37.7749,
//     lng: -122.4194,
//   };

//   const apiKey = "AIzaSyB9nW_l7Dw8WnnSCOJyJSGjtTYyF9ct3qk";

//   const mapRef = useRef(null);

//   useEffect(() => {
//     if (mapRef.current && window.google) {
//       // Create the AdvancedMarkerElement
//       const marker = new google.maps.marker.AdvancedMarkerElement({
//         position: center,
//         map: mapRef.current,
//       });
//     }
//   }, [mapRef]);

//   return (
//     <LoadScript googleMapsApiKey={apiKey}>
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         center={center}
//         zoom={13}
//         onLoad={(map) => (mapRef.current = map)}
//       >
//         {/* No need for a Marker component */}
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default DeliveryLocationMap;

import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const mapOptions = {
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  zoomControl: true,
  draggable: true,
  disableDefaultUI: true,
};

function StoreLocationMap({ storesData,selectedLocation }) {




  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyB9nW_l7Dw8WnnSCOJyJSGjtTYyF9ct3qk",
  });

  const [location, setLocation] = useState(null);
  console.log("stores Data in map ", storesData)
  // const 

  // const handleMarkerClick = (location) => {
  //   setCenter(location); // Update center to zoom in on the clicked marker
  // };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={(selectedLocation.lat ===null || selectedLocation.lng ===null) ? { lat: 39.9526, lng: -75.1652 } : selectedLocation} // Default center
      zoom={(selectedLocation.lat ===null || selectedLocation.lng ===null) ? 8.6 : 18} // Adjust zoom on selection
      options={mapOptions}
    >
      {storesData?.map((location, index) => (
        <Marker
          key={index}
          position={{ lat: parseFloat(location.latitude), lng: parseFloat(location.longitude) }}
        />
      ))}
    </GoogleMap>
  );
}

export default StoreLocationMap;

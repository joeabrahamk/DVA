import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const map = () => {
  useEffect(() => {
    const map = L.map("map");
    map.setView([51.505, -0.09], 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    let marker, circle, zoomed;

    const success = (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      const accuracy = pos.coords.accuracy;

      if (marker) {
        map.removeLayer(marker);
        map.removeLayer(circle);
      }

      marker = L.marker([lat, lng]).addTo(map);
      circle = L.circle([lat, lng], { radius: accuracy }).addTo(map);

      if (!zoomed) {
        zoomed = map.fitBounds(circle.getBounds());
      }

      map.setView([lat, lng]);
    };

    const error = (err) => {
      if (err.code === 1) {
        alert("Please allow geolocation access");
      } else {
        alert("Cannot get current location");
      }
    };

    navigator.geolocation.watchPosition(success, error);

    return () => {
      if (map) map.remove();
    };
  }, []);

  return (
    <div
      id="map"
      style={{
        height: "350px",
      }}
    ></div>
  );
};

export default map;

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

// Fix for default Leaflet marker icon not displaying
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// RoutingMachine Component
const RoutingMachine = ({
  startPoint,
  endPoint,
  setStationsOnRoute,
  fuelStations,
}) => {
  const map = useMap();

  useEffect(() => {
    if (!startPoint || !endPoint) return;

    // Remove any existing routing controls
    if (map._routingControl) {
      map.removeControl(map._routingControl);
    }

    // Add a new routing control
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(startPoint), // Start Point
        L.latLng(endPoint), // End Point
      ],
      routeWhileDragging: true, // Allow dragging waypoints
      showAlternatives: false, // Disable alternative routes
      lineOptions: {
        styles: [{ color: "blue", opacity: 0.7, weight: 4 }], // Style for the main route
      },
    })
      .on("routesfound", (e) => {
        const route = e.routes[0];
        const routeCoordinates = route.coordinates;

        // Find fuel stations within 5km of the route
        const stationsOnRoute = [];
        fuelStations.forEach((station) => {
          const stationLatLng = L.latLng(station.lat, station.lon);
          const isCloseToRoute = routeCoordinates.some((coord) => {
            const routeLatLng = L.latLng(coord.lat, coord.lng);
            return stationLatLng.distanceTo(routeLatLng) <= 1000; // 5km buffer
          });

          if (isCloseToRoute) {
            stationsOnRoute.push(station);
          }
        });

        setStationsOnRoute(stationsOnRoute); // Update the state with stations on the route
      })
      .addTo(map);

    // Store the routing control on the map instance for future reference
    map._routingControl = routingControl;

    return () => {
      if (map._routingControl) {
        map.removeControl(map._routingControl);
      }
    };
  }, [startPoint, endPoint, map, setStationsOnRoute, fuelStations]);

  return null;
};

// Main Map Component
const Map = () => {
  const [startPoint, setStartPoint] = useState(null); // Default start point (user's location)
  const [endPoint, setEndPoint] = useState(null); // Destination point
  const [searchInput, setSearchInput] = useState(""); // Search input for the destination
  const [searchResults, setSearchResults] = useState([]); // Search results for the destination
  const [fuelStations, setFuelStations] = useState([]); // Fuel stations data
  const [stationsOnRoute, setStationsOnRoute] = useState([]); // Fuel stations within 5km of the route

  useEffect(() => {
    // Fetch user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setStartPoint([latitude, longitude]); // Set the starting point to the user's location
      },
      (error) => {
        console.error("Error fetching location:", error);
        alert(
          "Unable to fetch your location. Please enable location services."
        );
      }
    );
  }, []);

  useEffect(() => {
    // Fetch fuel stations in Kerala
    const fetchFuelStations = async () => {
      try {
        const bbox1 = "8.0883,74.5236,12.8185,77.5857"; // Kerala bounding box
        const apiUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node["amenity"="fuel"](${bbox1});out body;`;
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch fuel stations");

        const data = await response.json();
        const stations = data.elements.map((station) => ({
          lat: station.lat,
          lon: station.lon,
          name: station.tags?.name || "Unknown Fuel Station",
        }));
        setFuelStations(stations);
      } catch (error) {
        console.error("Error fetching fuel station data:", error);
      }
    };

    fetchFuelStations();
  }, []);

  const handleSearch = async () => {
    if (!searchInput) return;

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${searchInput}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSelectLocation = (lat, lon) => {
    setEndPoint([lat, lon]); // Update the destination point
    setSearchResults([]); // Clear search results
  };

  return (
    <div className="h-full w-screen ">
      {/* Search Bar for Destination */}
      <div className="absolute bottom-4 left-4 z-10 bg-white p-2 rounded shadow-md w-72">
        <input
          type="text"
          placeholder="Search destination"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border p-2 w-full rounded mb-2"
        />
        <button
          onClick={handleSearch}
          className="mb-2 bg-green-500 text-white px-4 py-2 rounded w-full"
        >
          Search Destination
        </button>
        {searchResults.length > 0 && (
          <ul className="bg-white border rounded shadow-md max-h-40 overflow-auto">
            {searchResults.map((result, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() =>
                  handleSelectLocation(
                    parseFloat(result.lat),
                    parseFloat(result.lon)
                  )
                }
              >
                {result.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Map */}
      {startPoint && (
        <MapContainer
          center={startPoint}
          zoom={11}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={startPoint}>
            <Popup>You are here!</Popup>
          </Marker>
          {fuelStations.map((station, index) => (
            <Marker
              key={index}
              position={[station.lat, station.lon]}
              icon={L.icon({
                iconUrl: stationsOnRoute.includes(station)
                  ? "https://cdn-icons-png.flaticon.com/512/190/190411.png" // Icon for stations within 5km
                  : "https://cdn-icons-png.flaticon.com/512/854/854878.png", // Icon for other stations
                iconSize: [25, 25],
              })}
            >
              <Popup>{station.name}</Popup>
            </Marker>
          ))}
          {endPoint && (
            <RoutingMachine
              startPoint={startPoint}
              endPoint={endPoint}
              setStationsOnRoute={setStationsOnRoute}
              fuelStations={fuelStations}
            />
          )}
        </MapContainer>
      )}
    </div>
  );
};

export default Map;

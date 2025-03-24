import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapPin, Home, Briefcase, Plus, Edit } from "lucide-react";

// Sample avatar images
const sampleAvatars = [
  "https://r.res.easebar.com/pic/20241112/7579c053-af78-4683-83b5-831606009640.png",
  "https://www.nme.com/wp-content/uploads/2024/07/marvel-rivals-characters-doctor-strange.jpg",
  "https://static1.thegamerimages.com/wordpress/wp-content/uploads/wm/2024/07/marvel-rivals-spider-man-guide-featured-image.jpg",
  "https://images2.minutemediacdn.com/image/upload/c_crop,w_2560,h_1440,x_0,y_0/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/voltaxMediaLibrary/mmsport/video_games/01j3rfce4r6cfx12n354.jpg",
];

const API_BASE_URL = "http://127.0.0.1:5000"; // Ensure this matches your backend

function ProfilePage() {
  const [user, setUser] = useState({
    name: "Loading...",
    email: "Loading...",
    avatar: sampleAvatars[0], // Default avatar
  });
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState(""); // User-defined location name
  const [newLat, setNewLat] = useState(""); // Latitude for new location
  const [newLong, setNewLong] = useState(""); // Longitude for new location
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false); // State to control map modal

  const userId = localStorage.getItem("user_id");

  // Fetch user data from backend
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/user/${userId}`, { withCredentials: true })
      .then((response) => {
        setUser({
          name: response.data.name,
          email: response.data.email,
          avatar: response.data.avatar || sampleAvatars[2],
        });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userId]);

  // Fetch saved locations from backend
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/saved_locs/${userId}`, { withCredentials: true })
      .then((response) => {
        const fetchedLocations = response.data.locations.map((loc) => ({
          name: loc.location_name,
          lat: loc.lat,
          long: loc.long,
          icon: <MapPin />,
          editable: false,
        }));

        // Ensure "Home" and "Work" exist
        const defaultLocations = [
          { name: "Home", icon: <Home />, editable: false },
          { name: "Work", icon: <Briefcase />, editable: false },
        ];

        const mergedLocations = [...defaultLocations, ...fetchedLocations];
        setLocations(mergedLocations);
      })
      .catch((error) => {
        console.error("Error fetching saved locations:", error);
      });
  }, [userId]);

  // Add a new location
  const addLocation = () => {
    if (newLat && newLong) {
      const newLoc = {
        user_id: userId,
        location_name: newLocation || "Unnamed Location", // Default to "Unnamed Location" if no name is provided
        lat: parseFloat(newLat),
        long: parseFloat(newLong),
      };
  
      axios
        .post(`${API_BASE_URL}/add_saved_loc`, newLoc, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          setLocations([
            ...locations,
            {
              name: newLocation || "Unnamed Location", // Use the same default name here
              lat: parseFloat(newLat),
              long: parseFloat(newLong),
              icon: <MapPin />,
              editable: true,
            },
          ]);
          setNewLocation("");
          setNewLat("");
          setNewLong("");
        })
        .catch((error) => {
          console.error("Error adding new location:", error);
        });
    } else {
      alert("Please choose a location on the map.");
    }
  };

  const handleAvatarClick = (selectedAvatar) => {
    setUser({ ...user, avatar: selectedAvatar });
    setIsEditingAvatar(false);
  };

  const openMap = () => {
    setIsMapOpen(true);
  };

  const closeMap = () => {
    setIsMapOpen(false);
  };

  const handleMapSelection = (lat, long) => {
    setNewLat(lat);
    setNewLong(long);
    closeMap();
  };

  return (
    <div id="user" className="profile-sec">
      {/* Header */}
      <header className="header">
        <div className="location">
          <MapPin size={20} />
          <span className="location-text">Vytilla, Kochi</span>
          <span className="distance">61.6 km</span>
        </div>
        <div className="profile">
          <div className="avatar-container">
            <img src={user.avatar} alt="Avatar" className="avatar" />
            <button
              className="edit-avatar-btn"
              onClick={() => setIsEditingAvatar(!isEditingAvatar)}
            >
              <Edit size={16} />
            </button>
            {isEditingAvatar && (
              <div className="avatar-selection">
                {sampleAvatars.map((avatarUrl, index) => (
                  <img
                    key={index}
                    src={avatarUrl}
                    alt={`Avatar ${index + 1}`}
                    className="avatar-option"
                    onClick={() => handleAvatarClick(avatarUrl)}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="profile-info">
            <h2 className="profile-name">{user.name}</h2>
            <p className="profile-email">{user.email}</p>
          </div>
        </div>
      </header>

      {/* Saved Locations */}
      <section className="saved-locations">
        {locations.map((loc, index) => (
          <div key={index} className="location-card">
            <div className="location-info">
              {loc.icon}
              {loc.editable ? (
                <input
                  type="text"
                  className="location-input"
                  value={loc.name}
                  onChange={(e) => {
                    const updatedLocations = [...locations];
                    updatedLocations[index].name = e.target.value;
                    setLocations(updatedLocations);
                  }}
                />
              ) : (
                <span className="location-name">{loc.name}</span>
              )}
            </div>
            <button className="choose-map-btn" onClick={openMap}>
              Choose on map
            </button>
          </div>
        ))}

        {/* Add New Location */}
        <div className="add-location">
          <div className="location-info">
          <input
            type="text"
            placeholder="Add new location (optional)"
            className="location-input"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
          />
          <button className="choose-map-btn" onClick={openMap}>
            Choose from Map
          </button>
          </div>
          <button className="add-btn" onClick={addLocation}>
            + Add More
          </button>
        </div>
      </section>

      {/* Map Modal */}
      {isMapOpen && (
        <div className="map-modal">
          <div className="map-container">
            <h3>Select Location on Map</h3>
            {/* Replace this with an actual map component */}
            <div
              className="mock-map"
              onClick={() => handleMapSelection(10.015, 76.341)}
            >
              Click to select (Mock Map)
            </div>
            <button className="close-map-btn" onClick={closeMap}>
              Close Map
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;

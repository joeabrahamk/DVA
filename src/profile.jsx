import React, { useState } from "react";
import { MapPin, Home, Briefcase, Plus, Edit } from "lucide-react";

// Sample avatar images
const sampleAvatars = [
  "https://r.res.easebar.com/pic/20241112/7579c053-af78-4683-83b5-831606009640.png",
  "https://www.nme.com/wp-content/uploads/2024/07/marvel-rivals-characters-doctor-strange.jpg",
  "https://static1.thegamerimages.com/wordpress/wp-content/uploads/wm/2024/07/marvel-rivals-spider-man-guide-featured-image.jpg",
  "https://images2.minutemediacdn.com/image/upload/c_crop,w_2560,h_1440,x_0,y_0/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/voltaxMediaLibrary/mmsport/video_games/01j3rfce4r6cfx12n354.jpg",
];

function ProfilePage() {
  const [locations, setLocations] = useState([
    { name: "Home", icon: <Home />, editable: false },
    { name: "Work", icon: <Briefcase />, editable: false },
  ]);
  const [newLocation, setNewLocation] = useState("");
  const [avatar, setAvatar] = useState(sampleAvatars[0]); // Default avatar
  const [isEditingAvatar, setIsEditingAvatar] = useState(false); // State for avatar edit mode

  const addLocation = () => {
    if (newLocation.trim() !== "") {
      setLocations([
        ...locations,
        { name: newLocation, icon: <MapPin />, editable: true },
      ]);
      setNewLocation("");
    }
  };

  const handleAvatarClick = (selectedAvatar) => {
    setAvatar(selectedAvatar); // Update the avatar
    setIsEditingAvatar(false); // Close the avatar selection modal
  };

  return (
    <div id="user" className="profile-sec">
      {/* Header */}
      <header className="header">
        <div className="location">
          <MapPin size={20} />
          <span className="location-text">Vytilla, Kochi</span>
          <span className="distance">28.36 km</span>
        </div>
        <div className="profile">
          <div className="avatar-container">
            <img src={avatar} alt="Avatar" className="avatar" />
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
            <h2 className="profile-name">Liya Sara Thomas</h2>
            <p className="profile-email">liyasarathomas2@gmail.com</p>
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
            <button className="choose-map-btn">Choose on map</button>
          </div>
        ))}

        {/* Add New Location */}
        <div className="add-location">
          <input
            type="text"
            placeholder="Add new location"
            className="location-input"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
          />
          <button className="add-btn" onClick={addLocation}>
            + Add More
          </button>
        </div>
      </section>
    </div>
  );
}

export default ProfilePage;
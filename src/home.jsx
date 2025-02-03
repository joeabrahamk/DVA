import { MapPin,  } from "lucide-react";
import Map from "./map";
import React from "react";

function Home() {
return (
    <div id="home" className="home-sec">
        {/* Header */}
        <header className="header">
            <div className="location">
                <span className="icon"><MapPin size={20} /></span>
                <span className="location-text">Vytilla, Kochi</span>
                <span className="distance">28.36 km</span>
            </div>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search Destinations"
                    className="search-input"
                />
            </div>
        </header>

        {/* Live Map */}
        <section className="live-map">
            <h2 className="section-title">Live Map</h2>
            <div className="map-container">
                <Map />
                <div className="map-info">
                    <div className="duration">32 min</div>
                    <div className="details">17 mi - 8:09 PM</div>
                </div>
            </div>
        </section>

        {/* Nearest Pumps */}
        <section className="nearest-pumps">
            <h2 className="section-title">Nearest Pumps</h2>
            <div className="pump-list">
                {[
                    { name: "Indian Oil", location: "Palarivattom", distance: "1.6 KM" },
                    { name: "Nayara Fuels", location: "Edappally", distance: "3.1 KM" },
                    { name: "Essar Fuels", location: "Palarivattom", distance: "4.7 KM" },
                ].map((pump, index) => (
                    <div key={index} className="pump-card">
                        <div className="pump-info">
                            <h3 className="pump-name">{pump.name}</h3>
                            <p className="pump-location">{pump.location}</p>
                        </div>
                        <div className="pump-distance">{pump.distance} AHEAD</div>
                    </div>
                ))}
            </div>

            {/* Fuel Types */}
            <div className="fuel-types">
                {["PETROL", "DIESEL", "CNG", "ELECTRIC"].map((type, index) => (
                    <button key={index} className="fuel-button">
                        {type}
                    </button>
                ))}
            </div>
        </section>
    </div>
);
}

export default Home;

import { IoLocationSharp } from "react-icons/io5";

import React from "react";

function Home() {
return (
    <div id="home" className="home-sec">
        {/* Header */}
        <header className="header">
            <div className="location">
                <span className="icon"><IoLocationSharp /></span>
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
                <iframe
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509374!2d144.9630579153167!3d-37.81410797975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d1f9f1b1c1e!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1633072800000!5m2!1sen!2sau"
                    width="600"
                    height="350"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
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

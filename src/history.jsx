import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Calendar, Clock } from "lucide-react";

const API_BASE_URL = "http://127.0.0.1:5000"; // Ensure this matches your backend

function HistoryPage() {
  const [fuelHistory, setFuelHistory] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [fuelType, setFuelType] = useState("Petrol");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("Rupees");
  const [dateTime, setDateTime] = useState(new Date().toLocaleString());
  const navigate = useNavigate();
  // const userId = 1; // Replace with actual user ID

  // Fetch fuel history from backend
  const userId=localStorage.getItem("user_id")
  const fetchHistory = async () => {
    console.log("History called")
    try {
      const response = await fetch(`${API_BASE_URL}/fuel_history/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setFuelHistory(data.fuel_history);
        console.log(data)
        // setFuelHistory(data);
      } else {
        console.error("Failed to fetch fuel history");
      }
    } catch (error) {
      console.error("Error fetching fuel history:", error);
    }
  };

  useEffect(() => {

    fetchHistory();
  }, []);

  // Add new fuel history entry
  const addFuelHistory = async () => {
    if (!quantity || !price) {
      alert("Please fill in all fields.");
      return;
    }
 
    const newEntry = {
      user_id: userId,
      fuel_type: fuelType,
      quantity: parseFloat(quantity), // Ensure number format
      price: parseFloat(price),
      currency: currency,
      date_time: new Date().toISOString(),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/add_fuel_history`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
      });

      if (response.ok) {
        const addedEntry = await response.json();
        // setFuelHistory([addedEntry, ...fuelHistory]);
        setIsAdding(false);
        fetchHistory()
        resetForm();
      } else {
        console.error("Failed to add fuel history:", await response.json());
      }
    } catch (error) {
      console.error("Error adding fuel history:", error);
    }
  };

  const resetForm = () => {
    setFuelType("Petrol");
    setQuantity("");
    setPrice("");
    setCurrency("Rupees");
    setDateTime(new Date().toLocaleString());
  };

  const getFontColor = (fuelType) => {
    switch (fuelType) {
      case "Petrol":
        return "#4CAF50";
      case "Diesel":
        return "#2196F3";
      case "CNG":
        return "#9E9E9E";
      case "Electric":
        return "#8BC34A";
      default:
        return "#FFFFFF";
    }
  };

  return (
    <div id="history" className="history-sec">
      <header className="header">
        <h1>Fueling History</h1>
        <button className="add-btn" onClick={() => setIsAdding(!isAdding)}>
          <Plus size={16} /> ADD FUELING HISTORY
        </button>
      </header>

      {isAdding && (
        <div className="add-history-form">
          <div className="form-group">
            <label>Fuel Type</label>
            <select
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
            >
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="CNG">CNG</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              placeholder={`Enter quantity in ${fuelType === "Electric" ? "kWh" : "L"}`}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Price</label>
            <div className="price-input">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="Rupees">Rupees</option>
                <option value="Dollar">Dollar</option>
              </select>
              <input
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Date & Time</label>
            <div className="date-time-input">
              <Calendar size={16} />
              <input
                type="text"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
              />
              <Clock size={16} />
            </div>
          </div>

          <button className="submit-btn" onClick={addFuelHistory}>
            Save Entry
          </button>
        </div>
      )}

      <section className="history-list">
        {fuelHistory.length === 0 ? (
          <p>No fuel history found</p>
        ) : (
          fuelHistory.map((entry) => (
            <div key={entry.id} className="history-card">
              <div className="history-info">
                <h3 style={{ color: getFontColor(entry.fuel_type) }}>
                  {entry.fuel_type}
                </h3>
                <p>Quantity: {entry.quantity} {entry.fuel_type === "Electric" ? "kWh" : "L"}</p>
                <p>Price: {entry.currency} {entry.price}</p>
                <p>Date & Time: {new Date(entry.date_time).toLocaleString()}</p>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default HistoryPage;

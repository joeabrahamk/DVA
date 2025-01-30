import React, { useState } from "react";
import { Plus, Calendar, Clock } from "lucide-react";

function HistoryPage() {
  const [fuelHistory, setFuelHistory] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [fuelType, setFuelType] = useState("Petrol");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("Rupees");
  const [dateTime, setDateTime] = useState(new Date().toLocaleString());

  const addFuelHistory = () => {
    if (quantity && price) {
      const newEntry = {
        id: Date.now(),
        fuelType,
        quantity: `${quantity} ${fuelType === "Electric" ? "kWh" : "L"}`,
        price: `${currency} ${price}`,
        dateTime,
      };
      setFuelHistory([newEntry, ...fuelHistory]); // Add new entry to the top (LIFO)
      setIsAdding(false); // Close the form
      resetForm(); // Reset form fields
    }
  };

  const resetForm = () => {
    setFuelType("Petrol");
    setQuantity("");
    setPrice("");
    setCurrency("Rupees");
    setDateTime(new Date().toLocaleString());
  };

  // Function to get font color based on fuel type
  const getFontColor = (fuelType) => {
    switch (fuelType) {
      case "Petrol":
        return "#4CAF50"; // Green
      case "Diesel":
        return "#2196F3"; // Blue
      case "CNG":
        return "#9E9E9E"; // Gray
      case "Electric":
        return "#8BC34A"; // Light Green
      default:
        return "#FFFFFF"; // Default White
    }
  };

  return (
    <div id="history" className="history-sec">
      {/* Header */}
      <header className="header">
        <h1>Fueling History</h1>
        <button className="add-btn" onClick={() => setIsAdding(!isAdding)}>
          <Plus size={16} /> ADD FUELING HISTORY
        </button>
      </header>

      {/* Add Fueling History Form */}
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

      {/* Fueling History List */}
      <section className="history-list">
        {fuelHistory.map((entry) => (
          <div key={entry.id} className="history-card">
            <div className="history-info">
              <h3 style={{ color: getFontColor(entry.fuelType) }}>
                {entry.fuelType}
              </h3>
              <p>Quantity: {entry.quantity}</p>
              <p>Price: {entry.price}</p>
              <p>Date & Time: {entry.dateTime}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default HistoryPage;
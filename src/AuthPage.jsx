import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, Mail, Calendar } from "lucide-react";
import axios from "axios";
import logo from "/src/assets/logo.webp";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  // If your backend requires email, you might want to add:
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const url = isLogin ? "/login" : "/signup";
    const payload = isLogin
      ? { username, password }
      : { name, username, password, age }; // Add email if required

    console.log("Payload:", payload);
    try {
      const response = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Success:", response.data);
      localStorage.setItem("user_id", response.data.user_id);

      navigate("/menu");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      console.error("Error:", err);
    } 
  };

  return (
    <div className="auth-sec">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>

      <form className="auth-form" onSubmit={handleSubmit}>
        {!isLogin && (
          <>
           
            <div className="form-group">
              <label>Name</label>
              <div className="input-group">
                <User size={16} />
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            
            <div className="form-group">
              <label>Email</label>
              <div className="input-group">
                <Mail size={16} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
          </>
        )}

        <div className="form-group">
          <label>Username</label>
          <div className="input-group">
            <Mail size={16} />
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="input-group">
            <Lock size={16} />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {!isLogin && (
          <div className="form-group">
            <label>Age</label>
            <div className="input-group">
              <Calendar size={16} />
              <input
                type="number"
                placeholder="Enter your age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
          </div>
        )}

        {error && <p className="error">{error}</p>}

        <button type="submit" className="submit-btn">
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>

      {/* Link to switch between Login and Sign Up */}
      <p className="switch-text">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <span onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer", color: "blue" }}>
          {isLogin ? "Sign Up" : "Login"}
        </span>
      </p>
    </div>
  );
}

export default AuthPage;

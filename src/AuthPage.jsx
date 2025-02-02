import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { User, Lock, Mail, Calendar } from "lucide-react";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Handle login logic
      console.log("Logging in with:", { username, password });
      navigate("/menu"); // Navigate to the Menu page after login
    } else {
      // Handle signup logic
      console.log("Signing up with:", { name, username, password, age });
      navigate("/menu"); // Navigate to the Menu page after signup
    }
  };

  return (
    <div className="auth-sec">
      <div className="auth-toggle">
        <button
          className={`toggle-btn ${isLogin ? "active" : ""}`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`toggle-btn ${!isLogin ? "active" : ""}`}
          onClick={() => setIsLogin(false)}
        >
          Sign Up
        </button>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        {!isLogin && (
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

        <button type="submit" className="submit-btn">
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default AuthPage;
import React, { useState, useEffect } from "react";
import {
  registerUser,
  loginUser,
  getUserById,
  updateUser,
} from "../services/AuthApi";

export default function AuthForm() {
  const [isRegister, setIsRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // check localStorage
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      const userObj = JSON.parse(saved);
      fetchUserDetails(userObj.id);
    }
  }, []);

  const fetchUserDetails = async (id) => {
    try {
      const data = await getUserById(id);
      setUser(data);
      setIsLoggedIn(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAuth = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      if (isRegister) {
        if (formData.password !== formData.confirmPassword) {
          setMessage("Passwords do not match!");
          setLoading(false);
          return;
        }

        const res = await registerUser(formData);
        setMessage("✅ Registered successfully! Please log in.");
        setIsRegister(false);
      } else {
        const res = await loginUser({
          email: formData.email,
          password: formData.password,
        });

        // Assuming your login response has user id
        localStorage.setItem("user", JSON.stringify(res));
        await fetchUserDetails(res.id || res.userId || 1);
        setMessage("✅ Logged in successfully!");
      }
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  const handleUpdate = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const updated = await updateUser(user);
      setUser(updated);
      localStorage.setItem("user", JSON.stringify(updated));
      setMessage("✅ Profile updated successfully!");
    } catch (err) {
      setMessage("❌ Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
  };

  // Render when logged in
  if (isLoggedIn && user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100" style = {{paddingTop:"100px"}}>
        <div className="bg-white p-6 rounded-2xl shadow-lg w-96" style = {{paddingTop:"200px"}}>
          <h2 className="text-2xl font-bold mb-4 text-center">
            Welcome, {user.name} 👋
          </h2>

          <div className="mb-3">
            <label className="block font-medium">Name</label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div className="mb-3">
            <label className="block font-medium">Email</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            {loading ? "Updating..." : "Update Details"}
          </button>

          <button
            onClick={handleLogout}
            className="w-full mt-3 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>

          {message && (
            <p
              className={`text-center mt-3 text-sm ${
                message.includes("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Render login/register form
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100" style = {{paddingTop:"100px"}}>
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isRegister ? "Register" : "Login"}
        </h2>

        <form onSubmit={handleAuth}>
          {isRegister && (
            <div className="mb-3">
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-2"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2"
            />
          </div>

          {isRegister && (
            <div className="mb-4">
              <label className="block mb-1 font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-2"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            {loading
              ? "Please wait..."
              : isRegister
              ? "Register"
              : "Login"}
          </button>
        </form>

        {message && (
          <p
            className={`text-center mt-3 text-sm ${
              message.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <p className="text-center mt-4 text-sm">
          {isRegister ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-600 underline"
          >
            {isRegister ? "Login here" : "Register here"}
          </button>
        </p>
      </div>
    </div>
  );
}

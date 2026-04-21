import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("profile");
    if (data) setUser(JSON.parse(data));
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container">
        <h2>Profile</h2>

        <div className="card">
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Mobile: {user.mobile}</p>
          <p>Address: {user.address}</p>
          <p>Gender: {user.gender}</p>
          <p>Age: {user.age}</p>
          <p>Occupation: {user.occupation}</p>
        </div>

        <button onClick={() => navigate("/edit-profile")}>
          Edit Profile
        </button>
      </div>
    </div>
  );
}
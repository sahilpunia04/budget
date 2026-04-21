import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const save = () => {
    localStorage.setItem("profile", JSON.stringify(user));
    navigate("/profile");
  };

  return (
    <div>
      <Navbar />

      <div className="container">
        <h2>Edit Profile</h2>

        <input placeholder="Name" onChange={(e)=>setUser({...user,name:e.target.value})}/>
        <input placeholder="Email" onChange={(e)=>setUser({...user,email:e.target.value})}/>
        <input placeholder="Mobile" onChange={(e)=>setUser({...user,mobile:e.target.value})}/>
        <input placeholder="Address" onChange={(e)=>setUser({...user,address:e.target.value})}/>
        <input placeholder="Gender" onChange={(e)=>setUser({...user,gender:e.target.value})}/>
        <input placeholder="Age" onChange={(e)=>setUser({...user,age:e.target.value})}/>
        <input placeholder="Occupation" onChange={(e)=>setUser({...user,occupation:e.target.value})}/>

        <button onClick={save}>Save</button>
      </div>
    </div>
  );
}
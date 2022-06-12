import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.clear();
    navigate("/Login");
  };
  return (
    <button
      onClick={handleLogout}
      style={{ backgroundColor: "transparent", borderColor: "transparent" }}
    >
      <BiPowerOff size={28} />
    </button>
  );
}

export default Logout;

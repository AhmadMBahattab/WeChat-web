import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import { MdLogout } from "react-icons/md";

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
      <MdLogout size={30} />
    </button>
  );
}

export default Logout;

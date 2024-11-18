import React from "react"
import { FaBell, FaTh, FaUserCircle } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

export default function BusinessHeader() {
  const navigate = useNavigate()

  const handleProfileClick = () => {
    navigate("/business/profile")
  }

  return (
    <header className="flex items-center justify-between p-4 bg-[#971132] text-white shadow-md h-[6rem]">
      <h1 className="text-lg font-bold">BUSINESS DASHBOARD</h1>
      <div className="flex items-center space-x-6">
        <FaBell className="text-2xl cursor-pointer hover:opacity-80" title="Notifications" />
        <FaTh className="text-2xl cursor-pointer hover:opacity-80" title="More Options" />
        <FaUserCircle
          className="text-2xl cursor-pointer hover:opacity-80"
          title="Profile"
          onClick={handleProfileClick}
        />
      </div>
    </header>
  )
}
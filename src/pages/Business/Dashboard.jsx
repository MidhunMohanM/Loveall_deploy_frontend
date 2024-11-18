import React from "react";

const Dashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Welcome to LoveAll Dashboard!</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="font-bold">Create Offers</h3>
          <p className="text-gray-600">Set up a new offer for your customers</p>
          <button className="mt-4 px-4 py-2 text-white rounded-lg" style={{
            background: "linear-gradient(280deg, rgba(255,164,141,1) 0%, rgba(253,59,132,1) 100%)"
          }}>Create New Offer</button>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="font-bold">View Analytics</h3>
          <p className="text-gray-600">Check your business performance</p>
          <button className="mt-4 px-4 py-2 text-white rounded-lg" style={{
            background: "linear-gradient(280deg, rgba(255,164,141,1) 0%, rgba(253,59,132,1) 100%)"
          }}>View Analytics</button>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="font-bold">Manage Profile</h3>
          <p className="text-gray-600">Update your business information</p>
          <button className="mt-4 px-4 py-2 text-white rounded-lg" style={{
            background: "linear-gradient(280deg, rgba(255,164,141,1) 0%, rgba(253,59,132,1) 100%)"
          }}>Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
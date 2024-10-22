import React from 'react';
import { Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';

const AccountSection = ({ title, children, editLink }) => (
  <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <Link to={editLink} className="text-gray-400 hover:text-gray-600">
        <Pencil size={18} />
      </Link>
    </div>
    {children}
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="grid grid-cols-2 gap-4 mb-2">
    <p className="text-gray-500">{label}</p>
    <p>{value}</p>
  </div>
);

const Account = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Hi, Karthik 👋</h1>
        
        <AccountSection title="Account" editLink="/profile/account/edit-personal-info">
          <div className="flex items-center">
            <img
              src="/placeholder.svg?height=64&width=64"
              alt="Karthik Krishnamoorthi"
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h3 className="font-semibold">Karthik Krishnamoorthi</h3>
              <p className="text-gray-500">Anand nagar, Hebbal, Bangalore 52</p>
            </div>
          </div>
        </AccountSection>

        <AccountSection title="Personal Information" editLink="/profile/account/edit-personal-info">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoRow label="First name" value="Karthik" />
            <InfoRow label="Last name" value="Krishnamoorthi" />
            <InfoRow label="E-mail address" value="itskarthik@atria.com" />
            <InfoRow label="Phone number" value="9999-888-888" />
            <InfoRow label="Date of Birth" value="17 October 1990" />
            <InfoRow label="Gender" value="Male" />
          </div>
        </AccountSection>

        <AccountSection title="Address" editLink="/profile/account/edit-address">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoRow label="Country" value="India" />
            <InfoRow label="State" value="Karnataka" />
            <InfoRow label="City" value="Bengaluru" />
            <InfoRow label="District" value="Bengaluru" />
            <InfoRow label="Area" value="Anand Nagar" />
            <InfoRow label="Street / House no." value="#12 2nd main" />
          </div>
        </AccountSection>
      </div>
    </div>
  );
};

export default Account;
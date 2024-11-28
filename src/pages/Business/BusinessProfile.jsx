import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import BusinessProfileHeader from '../../components/BusinessProfileHeader';
import { getToken } from '../../utils/tokenManager';

const BusinessProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    business_name: '',
    business_email: '',
    business_type: '',
    entity_type: '',
    contact_number: '',
    business_address: '',
    city: '',
    state: '',
    zip_code: '',
    gstin: '',
    tan: '',
    business_purpose: '',
    owner_name: '',
    owner_contact_number: ''
  });
  const [lastUpdated, setLastUpdated] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated]);

  const fetchBusinessProfile = async () => {
    const token = getToken();
    if (!token) {
      console.error('No authentication token found');
      throw new Error('No authentication token found');
    }

    console.log('Token:', token);

    const response = await fetch(`${process.env.REACT_APP_API_URL}/Buss/profile`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch business profile');
    }

    return response.json();
  };

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await fetchBusinessProfile();
      console.log('Fetched profile data:', data); // Add this line for debugging
      setFormData(data);
      setLastUpdated(new Date(data.updated_at).toLocaleDateString());
      setError(null);
    } catch (err) {
      console.error('Error fetching profile:', err); // Add this line for debugging
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = getToken();
      if (!token) {
        console.error('No authentication token found');
        throw new Error('No authentication token found');
      }

      console.log('Token:', token);

      const response = await fetch(`${process.env.REACT_APP_API_URL}/Buss/update-profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update business profile');
      }

      const updatedData = await response.json();
      setFormData(updatedData);
      setLastUpdated(new Date(updatedData.updated_at).toLocaleDateString());
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BusinessProfileHeader />

      <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-600">Updated last on: {lastUpdated}</p>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-6 py-2 text-white rounded-md"
            style={{
              background: 'linear-gradient(180deg, rgba(71,0,28,1) 0%, rgba(151,17,50,1) 60%)'
            }}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.entries(formData).map(([key, value]) => (
            key !== 'updated_at' && (
              <div key={key}>
                <label htmlFor={key} className="block text-sm font-medium mb-1">
                  {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </label>
                <input
                  type={key.includes('email') ? 'email' : 'text'}
                  id={key}
                  name={key}
                  value={value || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded-md focus:ring-1 focus:ring-red-900 disabled:bg-gray-50"
                />
              </div>
            )
          ))}

          {isEditing && (
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-6 py-2 text-white rounded-md"
                style={{
                  background: 'linear-gradient(180deg, rgba(71,0,28,1) 0%, rgba(151,17,50,1) 60%)'
                }}
              >
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default BusinessProfile;
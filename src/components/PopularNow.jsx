import React, { useEffect, useState } from 'react';

export default function LoveAllCard() {
  const [cardDetails, setCardDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // State to handle errors

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const response = await fetch('/api/profile/love-all-card', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        // Check if the response is not OK (e.g., 404 or 500)
        if (!response.ok) {
          const errorText = await response.text();  // Read the response as text
          console.error('Error fetching card details:', response.statusText, errorText);
          setError('Failed to fetch card details. Please try again later.');  // Update error state
          return;  // Exit the function if there's an error
        }

        const data = await response.json();  // Parse the JSON response
        if (data.success) {
          setCardDetails(data.data);
        } else {
          setError(data.message || 'Unknown error occurred');
        }
      } catch (error) {
        console.error('Error fetching card details:', error);
        setError('Failed to fetch card details. Please try again later.');  // Update error state
      } finally {
        setLoading(false);  // Set loading to false when done
      }
    };

    fetchCardDetails();
  }, []);

  // Render loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  // Render error state
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  // Render no card details state
  if (!cardDetails) {
    return <p>No card details available.</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Your Love All Card</h1>
      <div className="mb-6">
        <div className="bg-gradient-to-br from-pink-300 via-pink-200 to-pink-300 rounded-xl p-4 shadow-lg w-full max-w-sm aspect-[1.6/1] relative overflow-hidden">
          <div className="flex flex-col justify-between h-full">
            <div className="flex justify-between items-start pt-2">
              <p className="text-xs font-semibold uppercase text-black">Social Loyalty Card</p>
              <p className="text-lg font-bold text-black leading-tight">
                L<span className="text-red-500">❤</span>VE<br />ALL
              </p>
            </div>
            <div className="flex justify-start items-center -mt-2 mb-6 ml-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex mr-4">
                  {[...Array(4)].map((_, j) => (
                    <span key={j} className="w-2 h-2 bg-black rounded-full mr-1"></span>
                  ))}
                </div>
              ))}
              <div className="flex">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="w-2 h-2 text-black text-xs font-bold flex items-center justify-center mr-1">X</span>
                ))}
              </div>
            </div>
            <p className="text-sm font-bold text-left text-red-500">
              {cardDetails.first_name} {cardDetails.last_name}
            </p>
          </div>
          <div className="absolute top-1/2 -left-2 w-4 h-8 bg-white rounded-r-full transform -translate-y-1/2"></div>
          <div className="absolute top-1/2 -right-2 w-4 h-8 bg-white rounded-l-full transform -translate-y-1/2"></div>
        </div>
        <p className="text-sm text-green-600 mt-2">Active</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Love All Card Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Card Owner</p>
            <p className="font-medium">{cardDetails.first_name} {cardDetails.last_name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Card Number</p>
            <p className="font-medium">XXXX-XXXX-XXXX-{cardDetails.card_number.slice(-4)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Purchase Date</p>
            <p className="font-medium">{new Date(cardDetails.purchase_date).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Expiry Date</p>
            <p className="font-medium">{new Date(cardDetails.expiry_date).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

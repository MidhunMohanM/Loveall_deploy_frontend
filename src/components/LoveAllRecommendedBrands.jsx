import React, { useEffect, useState } from 'react';
import logo1 from '../images/logo1.jpg'; // Import the image

export default function LoveAllRecommendedBrands(props) {
  const [brands, setBrands] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setBrands(props.data);
    setError(props.error);
  }, [props]);

  if (error) return <div className="text-center py-8 text-red-600">Error: {error.message}. Please check your server connection and try again.</div>;

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">LoveAll Recommended Brands</h2>
      {brands.length === 0 ? (
        <p className="text-gray-500">Loading brands...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {brands.map((brand) => (
            <div key={brand.store_id} className="flex flex-col items-center">
              <div className="w-24 h-24 relative mb-2 rounded-lg overflow-hidden">
                <img
                  src={logo1} // Use the imported image
                  alt={`${brand.store_name} Logo`} // Dynamic alt text
                  className="w-full h-full object-cover bg-[#971132]"
                />
              </div>
              <span className="text-sm text-center font-medium">{brand.store_name}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

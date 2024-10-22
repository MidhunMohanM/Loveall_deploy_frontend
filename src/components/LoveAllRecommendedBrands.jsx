import React, { useEffect, useState } from 'react';

export default function LoveAllRecommendedBrands(props) {
  const [brands, setBrands] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // console.log(props)
    setBrands(props.data);
    setError(props.error);
    // console.log(brands)

  }, [props, brands])


  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

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
                  src=''
                  alt=''
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
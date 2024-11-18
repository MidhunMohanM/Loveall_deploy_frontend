// import React, { useEffect, useState } from 'react';

// export default function LoveAllCard() {
//   const [cardDetails, setCardDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);  // State to handle errors

//   useEffect(() => {
//     const fetchCardDetails = async () => {
//       try {
//         const response = await fetch('/api/profile/love-all-card', {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         });

//         // Check if the response is not OK (e.g., 404 or 500)
//         if (!response.ok) {
//           const errorText = await response.text();  // Read the response as text
//           console.error('Error fetching card details:', response.statusText, errorText);
//           setError('Failed to fetch card details. Please try again later.');  // Update error state
//           return;  // Exit the function if there's an error
//         }

//         const data = await response.json();  // Parse the JSON response
//         if (data.success) {
//           setCardDetails(data.data);
//         } else {
//           setError(data.message || 'Unknown error occurred');
//         }
//       } catch (error) {
//         console.error('Error fetching card details:', error);
//         setError('Failed to fetch card details. Please try again later I am in PopularNow.');  // Update error state
//       } finally {
//         setLoading(false);  // Set loading to false when done
//       }
//     };

//     fetchCardDetails();
//   }, []);

//   // Render loading state
//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   // Render error state
//   if (error) {
//     return <p className="text-red-500">{error}</p>;
//   }

//   // Render no card details state
//   if (!cardDetails) {
//     return <p>No card details available.</p>;
//   }

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h1 className="text-2xl font-bold mb-4">Your Love All Card</h1>
//       <div className="mb-6">
//         <div className="bg-gradient-to-br from-pink-300 via-pink-200 to-pink-300 rounded-xl p-4 shadow-lg w-full max-w-sm aspect-[1.6/1] relative overflow-hidden">
//           <div className="flex flex-col justify-between h-full">
//             <div className="flex justify-between items-start pt-2">
//               <p className="text-xs font-semibold uppercase text-black">Social Loyalty Card</p>
//               <p className="text-lg font-bold text-black leading-tight">
//                 L<span className="text-red-500">❤</span>VE<br />ALL
//               </p>
//             </div>
//             <div className="flex justify-start items-center -mt-2 mb-6 ml-2">
//               {[...Array(3)].map((_, i) => (
//                 <div key={i} className="flex mr-4">
//                   {[...Array(4)].map((_, j) => (
//                     <span key={j} className="w-2 h-2 bg-black rounded-full mr-1"></span>
//                   ))}
//                 </div>
//               ))}
//               <div className="flex">
//                 {[...Array(4)].map((_, i) => (
//                   <span key={i} className="w-2 h-2 text-black text-xs font-bold flex items-center justify-center mr-1">X</span>
//                 ))}
//               </div>
//             </div>
//             <p className="text-sm font-bold text-left text-red-500">
//               {cardDetails.first_name} {cardDetails.last_name}
//             </p>
//           </div>
//           <div className="absolute top-1/2 -left-2 w-4 h-8 bg-white rounded-r-full transform -translate-y-1/2"></div>
//           <div className="absolute top-1/2 -right-2 w-4 h-8 bg-white rounded-l-full transform -translate-y-1/2"></div>
//         </div>
//         <p className="text-sm text-green-600 mt-2">Active</p>
//       </div>
//       <div className="bg-gray-100 p-4 rounded-lg">
//         <h2 className="text-xl font-semibold mb-4">Love All Card Details</h2>
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <p className="text-sm text-gray-600">Card Owner</p>
//             <p className="font-medium">{cardDetails.first_name} {cardDetails.last_name}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-600">Card Number</p>
//             <p className="font-medium">XXXX-XXXX-XXXX-{cardDetails.card_number.slice(-4)}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-600">Purchase Date</p>
//             <p className="font-medium">{new Date(cardDetails.purchase_date).toLocaleDateString()}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-600">Expiry Date</p>
//             <p className="font-medium">{new Date(cardDetails.expiry_date).toLocaleDateString()}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function PopularNow(props) {
  const [topStores, setTopStores] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTopStores(props.data);
    setError(props.error)
    setIsLoading(false)
    console.log(props.data)
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading top stores...</div>;
  }

  if (error) return <div className="text-center py-8 text-red-600">Error: {error.message}. Please check your server connection and try again.</div>;

  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">Popular Now</h2>
      {topStores.length === 0 ? (
        <p className="text-center py-4">No top stores found.</p>
      ) : (
        <div className="relative popular-now-slider">
          <Slider {...settings}>
            {topStores.map((store) => (
              <div key={store.store_id} className="px-4">
                <div className="bg-[#F6F6F6] rounded-lg border border-gray-300 shadow-md p-4 flex flex-col items-center h-full max-w-[200px] mx-auto">
                  <div className="w-full h-32 mb-4 flex items-center justify-center overflow-hidden rounded-lg bg-white border border-gray-300">
                    <img
                      src={store.store_logo || '/placeholder.svg'}
                      alt={store.store_name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="text-center">
                    <span className="block mb-1 font-poppins text-[16px] font-semibold text-[#000000]">{store.store_name}</span>
                    <span className="block font-poppins text-[14px] font-semibold text-[#606060]">
                      DISCOUNT {store.discount_percentage}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');
        
        .popular-now-slider :global(.slick-prev),
        .popular-now-slider :global(.slick-next) {
          background-color: #87CEEB;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          z-index: 1;
        }
        .popular-now-slider :global(.slick-prev:hover),
        .popular-now-slider :global(.slick-next:hover) {
          background-color: #5F9EA0;
        }
        .popular-now-slider :global(.slick-prev:before),
        .popular-now-slider :global(.slick-next:before) {
          color: #FFFFFF;
        }
        .popular-now-slider :global(.slick-prev) {
          left: -35px;
        }
        .popular-now-slider :global(.slick-next) {
          right: -35px;
        }
        .popular-now-slider :global(.slick-slide > div) {
          height: 100%;
        }
        .popular-now-slider :global(.slick-slide > div > div) {
          height: 100%;
        }
        .popular-now-slider :global(.slick-list) {
          margin: 0 -16px;
        }
      `}</style>
    </section>
  );
}
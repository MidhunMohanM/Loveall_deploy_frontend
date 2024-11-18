import React from 'react';
import { Search, Plus, User } from "lucide-react";
import storeImage from '../../assets/images/Midhun.jpeg';

const YourOffers = () => {
  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Manage Offers for your stores</h1>
      </div>
      
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">🎫 Your Offers</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input 
              className="pl-10 w-[300px] h-10 border border-gray-300 rounded-md"
              placeholder="Search Offers"
            />
          </div>
          <button className="p-2 border border-gray-300 rounded-md">
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Store 1 */}
        <div className="border rounded-lg p-6">
          <div className="flex items-start gap-8">
            <div className="w-2/5">
              <img
                src={storeImage}
                alt="Store illustration"
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="w-3/5">
              <div className="mb-4">
                <div className="text-sm text-gray-500">Store name</div>
                <div className="text-lg font-semibold">Store 1</div>
              </div>
              <div className="mb-4">
                <div className="text-sm text-gray-500">Store address</div>
                <div>456 Heritage Lane, Koramangala,</div>
                <div>Bangalore, Karnataka 560095.</div>
              </div>
              <div className="flex gap-12">
                <div>
                  <div className="text-sm text-gray-500">Manager / Incharge</div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Santosh</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Contact Number</div>
                  <div>9882100001</div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">Offer</div>
                  <div className="font-semibold">Buy 2 Get 1 Free</div>
                  <div className="text-sm text-gray-500">Valid till 21 December 2024</div>
                </div>
                <button 
                  className="bg-[#FD3B84] hover:bg-[#FD3B84]/90 text-white px-4 py-2 rounded-md"
                >
                  Edit Offer
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Store 2 */}
        <div className="border rounded-lg p-6">
          <div className="flex items-start gap-8">
            <div className="w-2/5">
              <img
                src={storeImage}
                alt="Store illustration"
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="w-3/5">
              <div className="mb-4">
                <div className="text-sm text-gray-500">Store name</div>
                <div className="text-lg font-semibold">Store 2</div>
              </div>
              <div className="mb-4">
                <div className="text-sm text-gray-500">Store address</div>
                <div>456 Heritage Lane, Koramangala,</div>
                <div>Bangalore, Karnataka 560095.</div>
              </div>
              <div className="flex gap-12">
                <div>
                  <div className="text-sm text-gray-500">Manager / Incharge</div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Santosh</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Contact Number</div>
                  <div>9882100001</div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">Offer</div>
                  <div className="font-semibold">50% Discount</div>
                  <div className="text-sm text-gray-500">Valid till 21 December 2024</div>
                </div>
                <button 
                  className="bg-[#FD3B84] hover:bg-[#FD3B84]/90 text-white px-4 py-2 rounded-md"
                >
                  Edit Offer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourOffers;
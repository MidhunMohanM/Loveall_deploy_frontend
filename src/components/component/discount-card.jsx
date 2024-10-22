import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Discount = ({ detail, style }) => {
  const navigate = useNavigate();
  const handleRedeem = () => {
    navigate("/redeem");
  };
  return (
    <div
      className={
        `flex flex-col w-72 h-72 gap-1 shadow-lg rounded-md overflow-hidden hover:scale-105 transition-transform duration-300` +
        style
      }
    >
      <div className="w-full h-3/4 bg-[#971132]"></div>
      <div className="grid grid-rows-3 grid-cols-2 px-2">
        <div className="justify-self-start w-full truncate">
          {detail.store.store_name}
        </div>
        <button
          type="button"
          className="text-white justify-self-end rounded-lg bg-[#f24880] p-2"
          onClick={handleRedeem}
        >
          Redeem Now
        </button>
        <div className="justify-self-start text-[#ababab]">
          ⭐{detail.store.rating}
        </div>
        <Link
          to={`/offer/${detail.offer_id}`}
          className="justify-self-end underline"
        >
          More Info
        </Link>

        <div className="col-span-2 w-full truncate text-[#007c1f]">
          {detail.description}
        </div>
      </div>
    </div>
  );
};

export default Discount;

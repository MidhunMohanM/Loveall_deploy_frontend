import React, { useState } from "react";

const Charity = () => {
  // State for tab selection
  const [type, setType] = useState("all");

  const media = [
    {
      type: "image",
      media: "https://via.placeholder.com/210", // Replace with actual image path
      story:
        "This is an impactful image of our team distributing food to communities in need.",
      date: "2 day ago",
    },
    {
      type: "video",
      media: "https://www.example.com/video.mp4", // Replace with actual video URL
      story:
        "Watch how we work tirelessly to ensure food reaches those in need.",
      date: "3 day ago",
    },
  ];

  // Filter media based on selected type
  const filteredMedia =
    type === "all" ? media : media.filter((item) => item.type === type);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="h-40 bg-[#6d071a] flex justify-center items-center">
        <h1 className="text-4xl text-white underline font-bold">
          Charity Media
        </h1>
      </div>

      {/* Intro Text */}
      <div className="pt-5">
        <p className="text-center max-w-3xl mx-auto text-[#666b74] text-lg leading-relaxed">
          Charity Media is a dedicated space where we share the powerful
          stories, images, and videos of our ongoing efforts to combat hunger.
          It's a visual journey that highlights the impact of our mission and
          the people whose lives have been transformed through your effort.
        </p>
      </div>

      {/* Tab Buttons */}
      <main className="px-6 pt-10">
        <div className="flex flex-row border-b-2 border-[#d2d2d2] mb-8">
          <button
            className={`px-2 py-1 md:px-8 md:py-3 font-semibold transition-colors ${
              type === "all"
                ? "bg-[#6d071a] text-white"
                : "bg-white text-gray-500"
            } border-[#d2d2d2] border-l-2 border-t-2 border-r-2 rounded-tl-lg`}
            onClick={() => setType("all")}
          >
            All
          </button>
          <button
            className={`px-2 py-1 md:px-8 md:py-3 font-semibold transition-colors ${
              type === "image"
                ? "bg-[#6d071a] text-white"
                : "bg-white text-gray-500"
            } border-[#d2d2d2] border-t-2 border-r-2`}
            onClick={() => setType("image")}
          >
            Images
          </button>
          <button
            className={`px-2 py-1 md:px-8 md:py-3 font-semibold transition-colors ${
              type === "video"
                ? "bg-[#6d071a] text-white"
                : "bg-white text-gray-500"
            } border-[#d2d2d2] border-t-2 border-r-2`}
            onClick={() => setType("video")}
          >
            Videos
          </button>
          <button
            className={`px-2 py-1 md:px-8 md:py-3 font-semibold transition-colors ${
              type === "story"
                ? "bg-[#6d071a] text-white"
                : "bg-white text-gray-500"
            } border-[#d2d2d2] border-t-2 border-r-2 rounded-tr-lg`}
            onClick={() => setType("story")}
          >
            Stories
          </button>
        </div>

        {/* Media Section */}
        <div id="media" className="grid grid-cols-1 gap-8">
          {filteredMedia.map((item, index) => (
            <div
              key={index}
              className="grid gap-6 grid-cols-1 md:grid-cols-2 bg-slate-50"
            >
              {/* Conditional rendering for image, video, or story */}
              {item.type === "image" && (
                <div className="bg-[#6d071a] p-5 rounded-lg shadow-md">
                  <img
                    src={item.media}
                    alt="Charity media"
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
              )}
              {item.type === "video" && (
                <div className="bg-[#6d071a] p-5 rounded-lg shadow-md">
                  <video
                    src={item.media}
                    controls
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              )}
              <div className="bg-white p-6 rounded-lg shadow-md overflow-y-auto max-h-96">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {item.story}
                </p>
              </div>
            </div>
          ))}
          {type === "story" &&
            media.map((item, index) => (
              <div
                key={index}
                className="grid gap-6 grid-cols-1 md:grid-cols-2 bg-slate-50"
              >
                <p className="text-gray-700 text-lg leading-relaxed">
                  {item.story}
                </p>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default Charity;

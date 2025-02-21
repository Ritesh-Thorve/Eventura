import React from "react";
import { motion } from "framer-motion";

const venueCategories = [
  {
    title: "Hotels",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3",
    description: "Luxury hotels for your events",
  },
  {
    title: "Gardens",
    image: "garden_img_featured_venue.jpg",
    description: "Beautiful outdoor spaces",
  },
  {
    title: "Wedding ",
    image:
      "wedding_Event.webp",
    description: "Perfect for your special day",
  },
  {
    title: "Banquet Halls",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3",
    description: "Halls for large gatherings",
  },
];

const VenueCategories = () => {
  return (
    <div className="bg-white py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Fancy Heading */}
        <motion.h2
          className="text-4xl font-extrabold text-gray-800 mb-12 text-center relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
            Venue Categories
          </span>
          <span className="block w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mt-2"></span>
        </motion.h2>

        {/* Mapping Venue Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {venueCategories.map((category, index) => (
            <motion.div
              key={index}
              className="relative rounded-lg overflow-hidden group shadow-md hover:shadow-lg transition-shadow duration-300 cursor-auto"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-64 object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity group-hover:bg-opacity-50" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-200">{category.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VenueCategories;

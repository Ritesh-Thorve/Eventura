import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // For animations

function FeaturedVenues() {
    const navigate = useNavigate();

    const venues = [
        {
            title: "Hotel Silver Palace",
            image: "hotel_silver_palace.jpg",
            description: "Premium venues, flawless experiences, unforgettable events!",
            location: "Jalgaon, MH",
            path: '/venues',
        },
        {
            title: "Aditya Garden",
            image: "garden1.avif",
            description: "Luxury Venues, Unforgettable Moments",
            location: "Pune, MH",
            path: '#',
        },
        {
            title: "Royal Darbar",
            image: "hotel1.jpg",
            description: "Transforming ideas into perfect events!",
            location: "Mumbai, MH",
            path: '#',
        },
        {
            title: "Banquet Halls",
            image: "banquet_1.webp",
            description: "Elevate your events with effortless planning!",
            location: "Ahilyanagar, MH",
            path: '#',
        },
        {
            title: "The Maharaja",
            image: "Hotel_2.jpg",
            description: "Luxury venues, seamless booking – Your event, your way!",
            location: "Ch.Sambhajinagar, MH",
            path: '#',
        },
        {
            title: "Krushna Farm",
            image: "garden_2.jpg",
            description: "Where Hospitality Meets Exceptional Event Planning",
            location: "Jalgaon, MH",
            path: '#',
        },
        {
            title: "Wedding Point",
            image: "bunquet_2.jpg",
            description: "Turning Hotel Spaces into Magical Events!",
            location: "Nagpur, MH",
            path: '#',
        },
        {
            title: "Banquet Halls",
            image: "wedding_img_1.jpg",
            description: "Seamless planning for picture-perfect celebrations!",
            location: "Nashik, MH",
            path: '#',
        },
    ];

    const handleClick = (path) => {
        if (path.startsWith('http')) {
            window.location.href = path;
        } else {
            navigate(path);
        }
    };

    // Animation variants for Framer Motion
    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
        hover: { scale: 1.05, transition: { duration: 0.2 } },
    };

    return (
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-12 text-center relative">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
                      Featured Venues 
                    </span>
                    <span className="block w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mt-2"></span>
                </h2>


                {/* Mapping all Venues */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {venues.map((venue, index) => (
                        <motion.div
                            key={index}
                            className="group relative rounded-lg overflow-hidden shadow-lg cursor-pointer border-2 border-transparent hover:border-gradient bg-clip-padding transition-shadow duration-300 hover:shadow-2xl"
                            onClick={() => handleClick(venue.path)}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            whileHover="hover"
                            viewport={{ once: true }}
                            style={{
                                background: `linear-gradient(white, white) padding-box,
                                linear-gradient(45deg, #6EE7B7, #3B82F6, #9333EA) border-box`,
                                border: '2px solid transparent',
                            }}
                        >
                            <img
                                src={venue.image}
                                alt={venue.title}
                                className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-110"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity group-hover:bg-opacity-60"></div>

                            {/* Location on Hover */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pb-5">
                                <p className="text-lg font-semibold text-white bg-black bg-opacity-70 px-4 py-2 rounded-lg">
                                    {venue.location}
                                </p>
                            </div>

                            {/* Content at Bottom */}
                            <div className="absolute inset-0 flex flex-col justify-end p-6">
                                <h3 className="text-2xl font-bold text-white mb-2">{venue.title}</h3>
                                <p className="text-gray-200 text-sm">{venue.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FeaturedVenues;

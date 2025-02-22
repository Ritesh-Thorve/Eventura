import React from 'react';
import { Calendar, MapPin, Users, DollarSign } from 'lucide-react';
import { format } from 'date-fns';

export default function EventCard({
  title,
  description,
  venue,
  date,
  price,
  image,
  capacity
}) {
  return (
    <div className="bg-white rounde d-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center text-gray-700">
            <MapPin className="h-5 w-5 mr-2 text-indigo-600" />
            <span>{venue}</span>
          </div>
          
          <div className="flex items-center text-gray-700">
            <Calendar className="h-5 w-5 mr-2 text-indigo-600" />
            <span>{format(new Date(date), 'PPP')}</span>
          </div>
          
          <div className="flex items-center text-gray-700">
            <Users className="h-5 w-5 mr-2 text-indigo-600" />
            <span>Capacity: {capacity} people</span>
          </div>
          
          <div className="flex items-center text-gray-700">
            <DollarSign className="h-5 w-5 mr-2 text-indigo-600" />
            <span>${price.toLocaleString()}</span>
          </div>
        </div>
        
        <button className="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
          Book Now
        </button>
      </div>
    </div>
  );
}
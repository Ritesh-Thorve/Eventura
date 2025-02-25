import React from 'react';
import { Users, Utensils, Music, ChevronRight } from 'lucide-react';

export function VenueCard({ id, name, imageUrl, capacity, services, onViewProfile }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative h-48">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
        
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <Users size={18} />
          <span>Up to {capacity} guests</span>
        </div>

        <div className="space-y-2 mb-4">
          {services.map((service, index) => (
            <div key={index} className="flex items-center gap-2 text-gray-600">
              {service.includes('Catering') && <Utensils size={16} />}
              {service.includes('Entertainment') && <Music size={16} />}
              <span>{service}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => onViewProfile(id)}
          className="w-full mt-2 flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          View Profile
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

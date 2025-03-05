import React from "react";
import { CheckCircle, MapPin, Calendar, CreditCard, Smile, ClipboardList } from "lucide-react";

const steps = [
  {
    icon: <MapPin className="h-10 w-10 text-indigo-600" />, 
    title: "Choose Destination", 
    description: "Select your preferred venue from our curated list of event spaces."
  },
  {
    icon: <ClipboardList className="h-10 w-10 text-indigo-600" />, 
    title: "Select Event Type", 
    description: "Specify the type of event you are planning to host."
  },
  {
    icon: <Calendar className="h-10 w-10 text-indigo-600" />, 
    title: "Book Appointment", 
    description: "Schedule an appointment to discuss your event details."
  },
  {
    icon: <CreditCard className="h-10 w-10 text-indigo-600" />, 
    title: "Make a Payment", 
    description: "Complete your booking securely through personal visit."
  },
  {
    icon: <CheckCircle className="h-10 w-10 text-indigo-600" />, 
    title: "Confirm Booking", 
    description: "Receive confirmation and additional details for your event."
  },
  {
    icon: <Smile className="h-10 w-10 text-indigo-600" />, 
    title: "Enjoy Your Event", 
    description: "Celebrate and create lasting memories at your chosen venue."
  }
];

export default function BookingSteps() {
  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 mt-20 bg-gradient-to-r from-indigo-50 to-blue-50 shadow-lg rounded-2xl p-10 pb-16">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">How to Book Your Event</h2>
      
      <div className="flex overflow-x-auto space-x-8 scrollbar-hide pb-6">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center bg-white p-5 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 w-64 min-w-[200px]">
            <div className="p-4 bg-indigo-100 rounded-full flex items-center justify-center">
              {step.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 text-center mt-4">{step.title}</h3>
            <p className="text-gray-600 text-sm text-center mt-2">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

import BookingsManagement from "@/components/Booking/BookinsManagement";
import VenuesManagement from "../components/venues/VenuesManagement"; 

export default function AdminDashboard() {
  
  return (
    <>
    <div className="min-h-screen bg-white py-24 px-6"> 
      <VenuesManagement />
    <BookingsManagement /> 
    </div>
    </>
  );
}

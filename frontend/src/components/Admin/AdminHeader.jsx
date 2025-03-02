import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row justify-between items-center mb-6">
      <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
      <div className="mt-4 md:mt-0 flex gap-4">
        <button 
          onClick={() => navigate("/admin/venues")} 
          className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition"
        >
          View All Venues
        </button>
        <button 
          onClick={() => navigate("/admin/add-venue")} 
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-600 transition"
        >
          Add Venue
        </button>
      </div>
    </div>
  );
};

export default AdminHeader;

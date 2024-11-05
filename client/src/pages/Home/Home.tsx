import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Patient Management System</h1>
      <div className="space-x-4">
        <button
          onClick={() => navigate("/patient")}
          className="px-6 py-3 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Register Patient
        </button>
        <button
          onClick={() => navigate("/patient-listing")}
          className="px-6 py-3 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Patient Listing
        </button>
        <button
          onClick={() => navigate("/visit")}
          className="px-6 py-3 text-white bg-yellow-500 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        >
          Visits Page
        </button>
      </div>
    </div>
  );
};

export default Home;

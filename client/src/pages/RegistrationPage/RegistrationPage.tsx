import React from "react";

const RegistrationPage: React.FC = (): JSX.Element => {
  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Registration Page
        </h2>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-gray-600 font-medium mb-1"
            >
              First Name:
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-gray-600 font-medium mb-1"
            >
              Last Name:
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label
              htmlFor="dateOfBirth"
              className="block text-gray-600 font-medium mb-1"
            >
              DOB:
            </label>
            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              value={currentDate}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block text-gray-600 font-medium mb-1"
            >
              Gender:
            </label>
            <select
              name="gender"
              id="gender"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Select Gender</option>
              <option value="male">M</option>
              <option value="female">F</option>
            </select>
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-400"
            >
              Clear
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-400"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;

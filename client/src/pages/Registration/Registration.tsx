import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

interface PatientFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
}

const RegistrationPage: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const currentDate = new Date().toISOString().split("T")[0];

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required."),
    lastName: Yup.string().required("Last name is required."),
    dateOfBirth: Yup.string().required("Date of birth is required."),
    gender: Yup.string().required("Gender is required."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      dateOfBirth: currentDate,
    },
  });

  const onSubmit = async (data: PatientFormData) => {
    try {
      const response = await fetch("http://localhost:3000/api/patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        navigate(`/visit/${responseData.patientId}`);
      } else {
        console.error("Registration failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Registration Page
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="firstName"
              className="block text-gray-600 font-medium mb-1"
            >
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              {...register("firstName")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.firstName && (
              <p className="text-red-600 text-sm">{errors.firstName.message}</p>
            )}
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
              id="lastName"
              {...register("lastName")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.lastName && (
              <p className="text-red-600 text-sm">{errors.lastName.message}</p>
            )}
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
              id="dateOfBirth"
              {...register("dateOfBirth")}
              max={currentDate}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.dateOfBirth && (
              <p className="text-red-600 text-sm">
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block text-gray-600 font-medium mb-1"
            >
              Gender:
            </label>
            <select
              id="gender"
              {...register("gender")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Select Gender</option>
              <option value="male">M</option>
              <option value="female">F</option>
            </select>
            {errors.gender && (
              <p className="text-red-600 text-sm">{errors.gender.message}</p>
            )}
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-400"
              onClick={() => navigate("/")}
            >
              Home Page
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

import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Visit: React.FC = (): JSX.Element => {
  const { patientId } = useParams();
  const currentDate = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    date: currentDate,
    height: "",
    weight: "",
    bmi: "",
    generalHealth: "",
    dietedBefore: "",
    takingDrugs: "",
    comments: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const calculateBmi = (height: string, weight: string) => {
    if (height && weight) {
      const heightInMeters = parseFloat(height) / 100;
      const calculatedBmi =
        parseFloat(weight) / (heightInMeters * heightInMeters);
      return parseFloat(calculatedBmi.toFixed(2));
    }
    return 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };

      if (name === "height" || name === "weight") {
        const bmi = calculateBmi(updatedData.height, updatedData.weight);
        return { ...updatedData, bmi: bmi.toString() };
      }

      return updatedData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.height) {
      setErrors({ height: "Height is required" });
    }

    if (!formData.weight) {
      setErrors({ weight: "Weight is required" });
    }
    const data = {
      ...formData,
      patientId: patientId,
    };

    try {
      const response = await fetch("http://localhost:3000/api/visit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
      } else {
        console.error(response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Vitals
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="date"
              className="block text-gray-600 font-medium mb-1"
            >
              Date:
            </label>
            <input
              type="date"
              name="date"
              id="date"
              value={currentDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label
              htmlFor="height"
              className="block text-gray-600 font-medium mb-1"
            >
              Height(cm):
            </label>
            <input
              type="text"
              name="height"
              id="height"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.height && (
              <p className="text-red-600 text-sm">{errors.height}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="weight"
              className="block text-gray-600 font-medium mb-1"
            >
              Weight(kg)
            </label>
            <input
              type="text"
              name="weight"
              id="weight"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.weight && (
              <p className="text-red-600 text-sm">{errors.weight}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="bmi"
              className="block text-gray-600 font-medium mb-1"
            >
              BMI
            </label>
            <input
              type="text"
              name="bmi"
              id="bmi"
              value={formData.bmi}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            {parseFloat(formData.bmi) >= 25 ? (
              <div className="space-y-4 mt-4">
                <div>
                  <p className="text-gray-700 font-medium mb-1">
                    General Health?
                  </p>
                  <div className="flex space-x-4">
                    <label className="flex items-center text-gray-600">
                      <input
                        type="radio"
                        name="generalHealth"
                        value="good"
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Good
                    </label>
                    <label className="flex items-center text-gray-600">
                      <input
                        type="radio"
                        name="generalHealth"
                        value="poor"
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Poor
                    </label>
                  </div>
                </div>
                <div>
                  <p className="text-gray-700 font-medium mb-1">
                    Are you currently taking any drugs?
                  </p>
                  <div className="flex space-x-4">
                    <label className="flex items-center text-gray-600">
                      <input
                        type="radio"
                        name="takingDrugs"
                        value="yes"
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Yes
                    </label>
                    <label className="flex items-center text-gray-600">
                      <input
                        type="radio"
                        name="takingDrugs"
                        value="no"
                        onChange={handleChange}
                        className="mr-2"
                      />
                      No
                    </label>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="comments"
                    className="block text-gray-600 font-medium mb-1"
                  >
                    Comments
                  </label>
                  <input
                    type="text"
                    name="comments"
                    id="comments"
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4 mt-4">
                <div>
                  <p className="text-gray-700 font-medium mb-1">
                    General Health?
                  </p>
                  <div className="flex space-x-4">
                    <label className="flex items-center text-gray-600">
                      <input
                        type="radio"
                        name="generalHealth"
                        value="good"
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Good
                    </label>
                    <label className="flex items-center text-gray-600">
                      <input
                        type="radio"
                        name="generalHealth"
                        value="poor"
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Poor
                    </label>
                  </div>
                </div>
                <div>
                  <p className="text-gray-700 font-medium mb-1">
                    Have you ever been on diet to loose weight?
                  </p>
                  <div className="flex space-x-4">
                    <label className="flex items-center text-gray-600">
                      <input
                        type="radio"
                        name="diet"
                        value="yes"
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Yes
                    </label>
                    <label className="flex items-center text-gray-600">
                      <input
                        type="radio"
                        name="diet"
                        value="no"
                        onChange={handleChange}
                        className="mr-2"
                      />
                      No
                    </label>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="comments"
                    className="block text-gray-600 font-medium mb-1"
                  >
                    Comments
                  </label>
                  <input
                    type="text"
                    name="comments"
                    id="comments"
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-400"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Visit;

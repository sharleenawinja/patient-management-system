import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Visit: React.FC = (): JSX.Element => {
  const { patientId } = useParams();
  const navigate = useNavigate();
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

  const [formErrors, setFormErrors] = useState<{
    [key: string]: string;
  }>({});
  const [apiErrors, setApiErrors] = useState<string | null>(null);

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
      setFormErrors({ height: "Height is required" });
    }

    if (!formData.weight) {
      setFormErrors({ weight: "Weight is required" });
    }
    const data = {
      ...formData,
      patientId,
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
        setFormData({
          date: currentDate,
          height: "",
          weight: "",
          bmi: "",
          generalHealth: "",
          dietedBefore: "",
          takingDrugs: "",
          comments: "",
        });

        navigate("/patient-listing");
      } else {
        setApiErrors("Data has not been sent. Please try again.");
        console.error(response.statusText);
      }
    } catch (error) {
      setApiErrors("Error submitting form. Please try again.");
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
              value={formData.date}
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
              value={formData.height}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            {formErrors.height && (
              <p className="text-red-600 text-sm">{formErrors.height}</p>
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
              value={formData.weight}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            {formErrors.weight && (
              <p className="text-red-600 text-sm">{formErrors.weight}</p>
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
          {apiErrors && (
            <div
              className={`mb-4 p-4 border rounded-lg text-center flex items-center justify-between bg-red-100 border-red-400 text-red-600`}
            >
              <span>{apiErrors}</span>
              <button
                onClick={() => setApiErrors("")}
                className="ml-4 px-3 py-1 text-sm font-semibold rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 focus:outline-none focus:ring focus:ring-gray-400"
              >
                Close
              </button>
            </div>
          )}
          <button
            type="submit"
            className="px-4 mr-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-400"
          >
            Save
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-400"
            onClick={() => navigate("/")}
          >
            Home Page
          </button>
        </form>
      </div>
    </div>
  );
};

export default Visit;

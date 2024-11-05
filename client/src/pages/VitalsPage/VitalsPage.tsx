import React, { useState } from "react";

const VitalsPage: React.FC = (): JSX.Element => {
  const [bmi, setbmi] = useState(20);
  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Vitals
        </h2>
        <form className="space-y-4">
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
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
              value={bmi}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            {bmi >= 25 ? (
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
                        className="mr-2"
                      />
                      Good
                    </label>
                    <label className="flex items-center text-gray-600">
                      <input
                        type="radio"
                        name="generalHealth"
                        value="poor"
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
                        className="mr-2"
                      />
                      Yes
                    </label>
                    <label className="flex items-center text-gray-600">
                      <input
                        type="radio"
                        name="takingDrugs"
                        value="no"
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
                        className="mr-2"
                      />
                      Good
                    </label>
                    <label className="flex items-center text-gray-600">
                      <input
                        type="radio"
                        name="generalHealth"
                        value="poor"
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
                        className="mr-2"
                      />
                      Yes
                    </label>
                    <label className="flex items-center text-gray-600">
                      <input
                        type="radio"
                        name="diet"
                        value="no"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default VitalsPage;

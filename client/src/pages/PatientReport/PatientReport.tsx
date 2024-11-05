import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  bmi: number;
  entryDate: string;
}

const PatientReport: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [filterDate, setFilterDate] = useState<string>("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/patients");

        if (response.ok) {
          const data = await response.json();
          setPatients(data.results);
          setFilteredPatients(data.results);
        } else {
          console.error(
            `Failed to fetch patients: ${response.status} - ${response.statusText}`
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPatients();
  }, []);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterDate(e.target.value);
  };

  const handleFilter = () =>
    setFilteredPatients(
      filterDate
        ? patients.filter(
            (patient) =>
              new Date(patient.entryDate).toLocaleDateString("en-CA") ===
              filterDate
          )
        : patients
    );

  const getBmiStatus = (bmi: number) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi >= 18.5 && bmi < 25) return "Normal";
    return "Overweight";
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Patient Report</h1>

      <input
        type="date"
        value={filterDate}
        onChange={handleDateChange}
        className="mb-4 p-2 border border-gray-300 rounded mr-4"
      />
      <button
        onClick={handleFilter}
        className="mb-4 p-2 bg-blue-500 text-white rounded mr-4"
      >
        Filter
      </button>

      <button
        onClick={() => {
          setFilterDate("");
          setFilteredPatients(patients);
        }}
        className="mb-4 p-2 bg-blue-500 text-white rounded mr-4"
      >
        Clear Filter
      </button>

      <button
        type="button"
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-400"
        onClick={() => navigate("/")}
      >
        Home Page
      </button>

      <table className="min-w-full bg-white border border-gray-300 table-fixed">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b w-1/3 text-left">Full Name</th>
            <th className="py-2 px-4 border-b w-1/4 text-left">Age</th>
            <th className="py-2 px-4 border-b w-1/4 text-left">BMI Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <tr key={patient.id}>
                <td className="py-2 px-4 border-b text-left">{`${patient.firstName} ${patient.lastName}`}</td>
                <td className="py-2 px-4 border-b text-left">{patient.age}</td>
                <td className="py-2 px-4 border-b text-left">
                  {getBmiStatus(patient.bmi)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="py-2 px-4 text-center">
                No records found for this date.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientReport;

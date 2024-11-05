import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegistrationPage from "./pages/Registration/Registration";
import Visit from "./pages/Visit/Visit";
import PatientReport from "./pages/PatientReport/PatientReport";
import Home from "./pages/Home/Home";

const App: React.FC = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/patient" element={<RegistrationPage />} />
        <Route path="/visit/:patientId" element={<Visit />} />
        <Route path="/patient-listing" element={<PatientReport />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import React from "react";
import RegistrationPage from "./pages/Registration/Registration";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Visit from "./pages/Visit/Visit";

const App: React.FC = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<RegistrationPage />} />
        <Route path="/visit" element={<Visit />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

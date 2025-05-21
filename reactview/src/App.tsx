import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage/AuthPage";
import VillasPage from "./pages/VillasPage/VillasPage";
import VillasApiPage from "./pages/VillasApiPage/VillasApiPage";
import CreateVillaPage from "./pages/CreateVillaPage/CreateVillaPage";
import VillasNumberApiPage from "./pages/VillasNumbersApiPage/VillasNumbersApiPage";
import CreateVillaNumberPage from "./pages/CreateVillaNumberPage/CreateVillaNumberPage";

const App: React.FC = () => {
  return (
    <div>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={<VillasPage />} />
            <Route path="/villasApi" element={<VillasApiPage />} />
            <Route path="/createVilla" element={<CreateVillaPage />} />
            <Route path="/villaNumberApi" element={<VillasNumberApiPage />} />
            <Route
              path="/createVillaNumber"
              element={<CreateVillaNumberPage />}
            />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
};

export default App;

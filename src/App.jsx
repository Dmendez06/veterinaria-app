import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";  

import Home from "./pages/Home";

// Dueño
import DuenoMascotas from "./pages/DuenoMascotas";
import DuenoDetalle from "./pages/DuenoDetalle";
import DuenoHistorial from "./pages/DuenoHistorial";
import DuenoSeguimiento from "./pages/DuenoSeguimiento";

// Veterinario
import VetMascotas from "./pages/VetMascotas";
import VetDetalle from "./pages/VetDetalle";
import VetHistorial from "./pages/VetHistorial";
import VetSeguimiento from "./pages/VetSeguimiento";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Dueño */}
          <Route path="/dueno/mascotas" element={<DuenoMascotas />} />
          <Route path="/dueno/mascota/:id" element={<DuenoDetalle />} />
          <Route path="/dueno/historial" element={<DuenoHistorial />} />
          <Route path="/dueno/seguimiento" element={<DuenoSeguimiento />} />

          {/* Veterinario */}
          <Route path="/veterinario/mascotas" element={<VetMascotas />} />
          <Route path="/veterinario/mascota/:id" element={<VetDetalle />} />
          <Route path="/veterinario/historial" element={<VetHistorial />} />
          <Route path="/veterinario/seguimiento" element={<VetSeguimiento />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
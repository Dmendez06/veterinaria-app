import { useState } from "react";
import Layout from "../components/Layout";
import "../styles/pages/seguimiento_vet.css";

function VetSeguimiento() {
  const [busqueda, setBusqueda] = useState("");
  const [filtroRaza, setFiltroRaza] = useState("Todas");

  // Base de datos de mascotas (Fuente de verdad para Dueños, Razas, etc.)
  const [mascotas] = useState([
    { id: 1, nombre: "Firu", especie: "Perro", raza: "Labrador", edad: 3, dueño: "Juan Pérez" },
    { id: 2, nombre: "Nami", especie: "Gato", raza: "Siames", edad: 6, dueño: "María Rodríguez" },
    ]);

  const [citas] = useState([
    { id: 101, mascota: "Firu", fecha: "2026-04-24", hora: "15:00", motivo: "Vacuna Rabia", notas: "Traer carnet.", estado: "Pendiente" },
    { id: 102, mascota: "Nami", fecha: "2026-04-26", hora: "10:30", motivo: "Revisión General", notas: "Ayuno 8h.", estado: "Pendiente" },
    { id: 103, mascota: "Firu", fecha: "2026-04-24", hora: "09:00", motivo: "Limpieza Dental", notas: "Encías inflamadas.", estado: "Urgente" }
  ]);

  const [seguimiento] = useState([
    { id: 1, mascota: "Firu", tipo: "Alimentación", detalle: "200g de alimento balanceado", fecha: "2026-03-24", hora: "08:00", icono: "🦴" },
    { id: 2, mascota: "Nami", tipo: "Observación", detalle: "Poco apetito y letargo", fecha: "2026-03-24", hora: "09:30", icono: "👁️" },
    ]);

  // Función para obtener los datos extendidos de una mascota por su nombre
  const obtenerDatosMascota = (nombre) => mascotas.find(m => m.nombre === nombre) || {};

  // Lógica de filtrado (Busca en Mascota, Dueño, Raza y Edad)
  const cumpleFiltros = (nombreMascota) => {
    const m = obtenerDatosMascota(nombreMascota);
    if (!m.id) return false;

    const term = busqueda.toLowerCase();
    const coincideBusqueda = 
      m.nombre.toLowerCase().includes(term) || 
      m.dueño.toLowerCase().includes(term) || 
      m.raza.toLowerCase().includes(term) ||
      m.edad.toString().includes(term);

    const coincideRaza = filtroRaza === "Todas" || m.raza === filtroRaza;
    return coincideBusqueda && coincideRaza;
  };

  const citasFiltradas = citas.filter(c => cumpleFiltros(c.mascota));
  const actividadesFiltradas = seguimiento.filter(s => cumpleFiltros(s.mascota));
  const razasUnicas = ["Todas", ...new Set(mascotas.map(m => m.raza))];

  return (
    <Layout role="veterinario">
      <div className="seguimiento-wrapper">
        <header className="seguimiento-header">
          <h1>Centro de Seguimiento</h1>
          
          <div className="barra-filtros-seguimiento">
            <input 
              type="text" 
              placeholder="Buscar por nombre, dueño, edad o raza..." 
              className="input-busqueda"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <select className="select-filtro" value={filtroRaza} onChange={(e) => setFiltroRaza(e.target.value)}>
              {razasUnicas.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        </header>

        <div className="seguimiento-grid">
          
          {/* COLUMNA IZQUIERDA: CITAS */}
          <aside className="proximas-citas-col">
            <div className="section-card">
              <h3>📅 Citas ({citasFiltradas.length})</h3>
              <div className="citas-list">
                {citasFiltradas.map(cita => {
                  const infoMascota = obtenerDatosMascota(cita.mascota);
                  return (
                    <div key={cita.id} className={`cita-item-card ${cita.estado.toLowerCase()}`}>
                      <div className="cita-badge">{cita.estado}</div>
                      <h4>{cita.mascota}</h4>
                      <p className="txt-dueño-item">👤 {infoMascota.dueño}</p>
                      <p className="cita-fecha">🕒 {cita.hora} — {cita.fecha}</p>
                      <p className="cita-motivo"><strong>{cita.motivo}</strong></p>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* COLUMNA DERECHA: HISTORIAL */}
          <main className="actividad-feed-col">
            <div className="section-card">
              <h3>📜 Actividad Reciente ({actividadesFiltradas.length})</h3>
              <div className="timeline">
                {actividadesFiltradas.map(reg => {
                  const infoMascota = obtenerDatosMascota(reg.mascota);
                  return (
                    <div key={reg.id} className="timeline-item">
                      <div className="timeline-icon">{reg.icono}</div>
                      <div className="timeline-content">
                        <div className="timeline-time">{reg.fecha} | {reg.hora}</div>
                        <h4>
                          {reg.mascota} 
                          <span className="dueño-timeline"> (Prop: {infoMascota.dueño})</span>
                          <span className="tipo-tag">{reg.tipo}</span>
                        </h4>
                        <p>{reg.detalle}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </main>

        </div>
      </div>
    </Layout>
  );
}

export default VetSeguimiento;
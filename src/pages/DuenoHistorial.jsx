import { useState } from "react";
import Layout from "../components/Layout";
import "../styles/pages/historial.css"; 
function DuenoHistorial() {
  const [mascotas] = useState([
    { id: 1, nombre: "Firu" },
    { id: 2, nombre: "Nami" }
  ]);

  const [mascotaSeleccionada, setMascotaSeleccionada] = useState("1");

  const [historialMedico] = useState([
    
    { id: 1, mascotaId: 1, tipo: "vacuna", nombre: "Parvovirus", fecha: "2026-01-15", proximaDosis: "2026-07-15" },
    { id: 2, mascotaId: 1, tipo: "vacuna", nombre: "Rabia (Anual)", fecha: "2025-11-20", proximaDosis: "2026-11-20" },
    { id: 3, mascotaId: 1, tipo: "tratamiento", nombre: "Antibiótico post-cirugía", fechaInicio: "2026-03-01", fechaFin: "2026-03-10", instrucciones: "1 tableta cada 8 horas con comida" },
    { id: 4, mascotaId: 1, tipo: "cita", motivo: "Revisión de puntos", fecha: "2026-03-28", hora: "15:00", estado: "Programada" },
    
  
    { id: 5, mascotaId: 2, tipo: "vacuna", nombre: "Triple Felina", fecha: "2026-02-10", proximaDosis: "2027-02-10" },
    { id: 6, mascotaId: 2, tipo: "tratamiento", nombre: "Gotas ópticas", fechaInicio: "2026-03-20", fechaFin: "2026-03-25", instrucciones: "2 gotas en oreja izquierda" },
    { id: 7, mascotaId: 2, tipo: "cita", motivo: "Limpieza dental", fecha: "2026-04-05", hora: "09:00", estado: "Pendiente" }
  ]);

  
  const registrosFiltrados = historialMedico.filter(r => r.mascotaId === parseInt(mascotaSeleccionada));

  return (
    <Layout role="dueno">
      <div className="historial-container">
        <h2>Historial Médico Detallado</h2>

        
        <div className="filtro-mascota">
          <label htmlFor="select-mascota">Mascota:</label>
          <select 
            id="select-mascota"
            value={mascotaSeleccionada} 
            onChange={(e) => setMascotaSeleccionada(e.target.value)}
          >
            {mascotas.map(m => (
              <option key={m.id} value={m.id}>{m.nombre}</option>
            ))}
          </select>
        </div>

        <div className="grid-historial">
         
          <section className="seccion-vacunas">
            <h3>💉 Vacunas</h3>
            {registrosFiltrados.filter(r => r.tipo === "vacuna").length > 0 ? (
              registrosFiltrados.filter(r => r.tipo === "vacuna").map(v => (
                <div key={v.id} className="card-registro">
                  <p><strong>{v.nombre}</strong></p>
                  <p>Aplicada: {v.fecha}</p>
                  <p className="proxima">Refuerzo: {v.proximaDosis}</p>
                </div>
              ))
            ) : (
              <p className="sin-datos">No hay vacunas registradas.</p>
            )}
          </section>

        
          <section className="seccion-tratamientos">
            <h3>💊 Tratamientos</h3>
            {registrosFiltrados.filter(r => r.tipo === "tratamiento").length > 0 ? (
              registrosFiltrados.filter(r => r.tipo === "tratamiento").map(t => (
                <div key={t.id} className="card-registro">
                  <p><strong>{t.nombre}</strong></p>
                  <p>{t.fechaInicio} al {t.fechaFin}</p>
                  <small>{t.instrucciones}</small>
                </div>
              ))
            ) : (
              <p className="sin-datos">Sin tratamientos activos.</p>
            )}
          </section>

          
          <section className="seccion-citas">
            <h3>📅 Citas Médicas</h3>
            {registrosFiltrados.filter(r => r.tipo === "cita").length > 0 ? (
              registrosFiltrados.filter(r => r.tipo === "cita").map(c => (
                <div key={c.id} className="card-registro">
                  <p><strong>{c.motivo}</strong></p>
                  <p>{c.fecha} — {c.hora}</p>
                  
                  <span className={`badge-estado ${c.estado}`}>
                    {c.estado}
                  </span>
                </div>
              ))
            ) : (
              <p className="sin-datos">No hay citas programadas.</p>
            )}
          </section>
        </div>
      </div>
    </Layout>
  );
}

export default DuenoHistorial;
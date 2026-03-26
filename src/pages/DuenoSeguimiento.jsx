import { useState } from "react";
import Layout from "../components/Layout";
import "../styles/pages/seguimiento.css";
function DuenoSeguimiento() {
  const [mascotas] = useState([
    { id: 1, nombre: "Firu" },
    { id: 2, nombre: "Nami" }
  ]);

  const [seguimientos, setSeguimientos] = useState([
    { id: 101, mascotaId: 1, tipo: "Alimentación", detalle: "Croquetas ProPlan", cantidad: "250g", fecha: "2026-03-24", hora: "08:00" },
    { id: 102, mascotaId: 1, tipo: "Actividad", detalle: "Caminata corta", intensidad: "Baja", fecha: "2026-03-24", hora: "09:30" },
    { id: 103, mascotaId: 2, tipo: "Observación", detalle: "Se nota un poco decaída hoy", fecha: "2026-03-24", hora: "10:00" }
  ]);

  const [formData, setFormData] = useState({
    mascotaId: "1",
    tipo: "Alimentación",
    detalle: "",
    cantidad: "",
    intensidad: "",
    fecha: new Date().toISOString().split('T')[0],
    hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
  });

  const manejarCambio = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const guardarRegistro = (e) => {
    e.preventDefault();
    const nuevoRegistro = {
      id: Date.now(),
      ...formData,
      mascotaId: parseInt(formData.mascotaId)
    };
    setSeguimientos([nuevoRegistro, ...seguimientos]);
    setFormData({ ...formData, detalle: "", cantidad: "", intensidad: "" });
  };

  return (
    <Layout role="dueno">
      <div className="seguimiento-container">
        <h1>Seguimiento Diario</h1>

        {/* FORMULARIO DE REGISTRO (RF-18, RF-19, RF-20) */}
        <section className="formulario-registro">
          <h3>Registrar Nueva Actividad</h3>
          <form onSubmit={guardarRegistro} className="form-seguimiento">
            <div className="campo">
              <label>Mascota:</label>
              <select name="mascotaId" value={formData.mascotaId} onChange={manejarCambio}>
                {mascotas.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
              </select>
            </div>

            <div className="campo">
              <label>Categoría:</label>
              <select name="tipo" value={formData.tipo} onChange={manejarCambio}>
                <option value="Alimentación">Alimentación</option>
                <option value="Actividad">Actividad</option>
                <option value="Observación">Observación</option>
              </select>
            </div>

            <div className="campo">
              <label>Descripción:</label>
              <input 
                type="text" 
                name="detalle" 
                placeholder="Ej: Caminata, Tipo de alimento..." 
                value={formData.detalle} 
                onChange={manejarCambio} 
                required 
              />
            </div>

            {formData.tipo === "Alimentación" && (
              <div className="campo">
                <label>Cantidad:</label>
                <input type="text" name="cantidad" placeholder="Ej: 200g" value={formData.cantidad} onChange={manejarCambio} />
              </div>
            )}

            {formData.tipo === "Actividad" && (
              <div className="campo">
                <label>Intensidad:</label>
                <select name="intensidad" value={formData.intensidad} onChange={manejarCambio}>
                  <option value="">Seleccione...</option>
                  <option value="Baja">Baja</option>
                  <option value="Media">Media</option>
                  <option value="Alta">Alta</option>
                </select>
              </div>
            )}

            <button type="submit" className="btn-guardar">Guardar Registro</button>
          </form>
        </section>

        <hr />

        {/* LISTADO DE SEGUIMIENTOS (RF-12) */}
        <section className="listado-seguimiento">
          <h3>Registros Recientes</h3>
          <div className="items-container">
            {seguimientos.map(reg => (
              <div key={reg.id} className={`tarjeta-seguimiento ${reg.tipo.toLowerCase()}`}>
                <div className="header-tarjeta">
                  <strong>{mascotas.find(m => m.id === reg.mascotaId)?.nombre}</strong>
                  <span>{reg.fecha} - {reg.hora}</span>
                </div>
                <p><strong>{reg.tipo}:</strong> {reg.detalle}</p>
                {reg.cantidad && <small>Cantidad: {reg.cantidad}</small>}
                {reg.intensidad && <small>Intensidad: {reg.intensidad}</small>}
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default DuenoSeguimiento;
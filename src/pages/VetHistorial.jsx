import { useState } from "react";
import Layout from "../components/Layout";
import "../styles/pages/historial_vet.css";

function VetHistorial() {
  const [mascotas] = useState([
    { id: 1, nombre: "Firu" },
    { id: 2, nombre: "Nami" }
  ]);

  const [registros, setRegistros] = useState([
    {
      id: 1,
      tipo: "vacuna",
      mascotaId: "1",
      mascotaNombre: "Firu",
      nombreVacuna: "Triple Felina",
      fechaAplicacion: "2026-03-15",
      necesitaProxima: true,
      proximaDosis: "2027-03-15",
      motivo: "", fecha: "", hora: "", tipoTratamiento: "", fechaInicio: "", fechaFin: ""
    },
    {
      id: 2,
      tipo: "tratamiento",
      mascotaId: "2",
      mascotaNombre: "Nami",
      tipoTratamiento: "Antibiótico para infección leve",
      fechaInicio: "2026-03-20",
      fechaFin: "2026-03-27",
      nombreVacuna: "", fechaAplicacion: "", proximaDosis: "", motivo: "", fecha: "", hora: ""
    },
    {
      id: 3,
      tipo: "cita",
      mascotaId: "1",
      mascotaNombre: "Firu",
      motivo: "Revisión post-operatoria",
      fecha: "2026-04-05",
      hora: "14:30",
      nombreVacuna: "", fechaAplicacion: "", proximaDosis: "", tipoTratamiento: "", fechaInicio: "", fechaFin: ""
    }
  ]);

  const [form, setForm] = useState({
    tipo: "vacuna",
    mascotaId: "",
    nombreVacuna: "",
    fechaAplicacion: "",
    proximaDosis: "",
    necesitaProxima: false, 
    tipoTratamiento: "",
    fechaInicio: "",
    fechaFin: "",
    motivo: "",
    fecha: "",
    hora: ""
  });

  const [editandoId, setEditandoId] = useState(null);

  // --- ESTADO PARA EL MODAL DE ELIMINAR ---
  const [modalEliminar, setModalEliminar] = useState({ abierto: false, id: null });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ 
      ...form, 
      [name]: type === "checkbox" ? checked : value 
    });
  };

  const guardar = (e) => {
    e.preventDefault();
    const mascota = mascotas.find(m => m.id == form.mascotaId);

    const nuevo = {
      ...form,
      id: editandoId || Date.now(),
      mascotaNombre: mascota?.nombre,
      proximaDosis: form.necesitaProxima ? form.proximaDosis : "No requiere otra dosis",
    };

    if (editandoId) {
      setRegistros(registros.map(r => r.id === editandoId ? nuevo : r));
    } else {
      setRegistros([nuevo, ...registros]);
    }
    limpiar();
  };

  const editar = (r) => {
    setForm(r);
    setEditandoId(r.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const abrirModal = (id) => {
    setModalEliminar({ abierto: true, id });
  };

  const cerrarModal = () => {
    setModalEliminar({ abierto: false, id: null });
  };

  const confirmarEliminar = () => {
    setRegistros(registros.filter(r => r.id !== modalEliminar.id));
    cerrarModal();
  };

  const limpiar = () => {
    setForm({
      tipo: "vacuna",
      mascotaId: "",
      nombreVacuna: "",
      fechaAplicacion: "",
      proximaDosis: "",
      necesitaProxima: false,
      tipoTratamiento: "",
      fechaInicio: "",
      fechaFin: "",
      motivo: "",
      fecha: "",
      hora: ""
    });
    setEditandoId(null);
  };

  return (
    <Layout role="veterinario">
      <div className="vet-historial-container">
        <h2>Historial Médico</h2>

        <form onSubmit={guardar}>
          <div className="form-group">
            <select name="tipo" value={form.tipo} onChange={handleChange}>
              <option value="vacuna">Vacuna</option>
              <option value="tratamiento">Tratamiento</option>
              <option value="cita">Cita</option>
            </select>

            <select name="mascotaId" value={form.mascotaId} onChange={handleChange} required>
              <option value="">Seleccione mascota</option>
              {mascotas.map(m => (
                <option key={m.id} value={m.id}>{m.nombre}</option>
              ))}
            </select>
          </div>

          {form.tipo === "vacuna" && (
            <>
              <input name="nombreVacuna" placeholder="Nombre de la vacuna" value={form.nombreVacuna} onChange={handleChange} required />
              <input type="date" name="fechaAplicacion" value={form.fechaAplicacion} onChange={handleChange} required />
              <label>
                <input type="checkbox" name="necesitaProxima" checked={form.necesitaProxima} onChange={handleChange} />
                ¿Requiere próxima dosis?
              </label>
              {form.necesitaProxima && (
                <input type="date" name="proximaDosis" value={form.proximaDosis} onChange={handleChange} required />
              )}
            </>
          )}

          {form.tipo === "tratamiento" && (
            <>
              <input name="tipoTratamiento" placeholder="Descripción del tratamiento" value={form.tipoTratamiento} onChange={handleChange} required />
              <div style={{display: 'flex', gap: '10px'}}>
                <input type="date" name="fechaInicio" value={form.fechaInicio} onChange={handleChange} required />
                <input type="date" name="fechaFin" value={form.fechaFin} onChange={handleChange} required />
              </div>
            </>
          )}

          {form.tipo === "cita" && (
            <>
              <input name="motivo" placeholder="Motivo de la consulta" value={form.motivo} onChange={handleChange} required />
              <div style={{display: 'flex', gap: '10px'}}>
                <input type="date" name="fecha" value={form.fecha} onChange={handleChange} required />
                <input type="time" name="hora" value={form.hora} onChange={handleChange} required />
              </div>
            </>
          )}

          <button type="submit">
            {editandoId ? "Actualizar Registro" : "Guardar en Historial"}
          </button>
        </form>

        <h3>Registros Recientes</h3>
        <div className="registros-list">
          {registros.map(r => (
            <div key={r.id} className="registro-card">
              <h4>{r.tipo}</h4>
              <p><strong>Paciente:</strong> {r.mascotaNombre}</p>

              {r.tipo === "vacuna" && (
                <>
                  <p>Vacuna: {r.nombreVacuna}</p>
                  <p>Aplicación: {r.fechaAplicacion}</p>
                  <p><strong>Refuerzo:</strong> {r.proximaDosis}</p>
                </>
              )}

              {r.tipo === "tratamiento" && (
                <>
                  <p>Tratamiento: {r.tipoTratamiento}</p>
                  <p>Periodo: {r.fechaInicio} al {r.fechaFin}</p>
                </>
              )}

              {r.tipo === "cita" && (
                <>
                  <p>Motivo: {r.motivo}</p>
                  <p>Fecha: {r.fecha} - {r.hora}hs</p>
                </>
              )}

              <div className="acciones-registro">
                <button onClick={() => editar(r)}>Editar</button>
                <button onClick={() => abrirModal(r.id)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL CORREGIDO */}
        {modalEliminar.abierto && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>¿Eliminar registro?</h3>
              </div>
              <p>Esta acción no se puede deshacer.</p>
              <div className="modal-footer">
                <button className="btn-cancelar" onClick={cerrarModal}>
                  Cancelar
                </button>
                <button className="btn-confirmar-borrado" onClick={confirmarEliminar}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default VetHistorial;
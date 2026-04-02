import { useState } from "react";
import Layout from "../components/Layout";
import "../styles/pages/mascotas.css";

function DuenoMascotas() {
  const [mascotas, setMascotas] = useState([
    { id: 1, nombre: "Firu", especie: "Perro", raza: "Labrador", edad: 3, foto: "/labrador.jpg" }
  ]);

  const [form, setForm] = useState({ nombre: "", especie: "", raza: "", edad: "", foto: null });
  const [editandoId, setEditandoId] = useState(null);
  const [preview, setPreview] = useState(null);

  // Estados del Modal
  const [showRetirarModal, setShowRetirarModal] = useState(false);
  const [pasoConfirmacion, setPasoConfirmacion] = useState(false);
  const [mascotaARetirar, setMascotaARetirar] = useState(null);
  const [retiroForm, setRetiroForm] = useState({ motivo: "fallecimiento", detallesOtro: "", mantenerHistorial: true });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, foto: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const guardarMascota = (e) => {
    e.preventDefault();
    const nueva = { id: editandoId || Date.now(), ...form, foto: preview || form.foto };
    if (editandoId) {
      setMascotas(mascotas.map(m => m.id === editandoId ? nueva : m));
    } else {
      setMascotas([...mascotas, nueva]);
    }
    limpiar();
  };

  const editar = (m) => {
    setForm(m);
    setPreview(m.foto);
    setEditandoId(m.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const limpiar = () => {
    setForm({ nombre: "", especie: "", raza: "", edad: "", foto: null });
    setPreview(null);
    setEditandoId(null);
  };

  // Lógica Retiro
  const abrirModalRetiro = (m) => {
    setMascotaARetirar(m);
    setShowRetirarModal(true);
  };

  const confirmarRetiro = () => {
    setMascotas(mascotas.filter(m => m.id !== mascotaARetirar.id));
    cerrarModal();
  };

  const cerrarModal = () => {
    setShowRetirarModal(false);
    setPasoConfirmacion(false);
    setMascotaARetirar(null);
  };

  return (
    <Layout role="dueno">
      <div className="dueno-mascotas-container">
        <h2>Mis Mascotas</h2>

        <form className="mascotas-form" onSubmit={guardarMascota}>
          <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
          <input name="especie" placeholder="Especie" value={form.especie} onChange={handleChange} required />
          <input name="raza" placeholder="Raza" value={form.raza} onChange={handleChange} required />
          <input name="edad" type="number" placeholder="Edad" value={form.edad} onChange={handleChange} required />
          
          <input type="file" accept="image/*" onChange={handleImage} />
          
          {preview && <img src={preview} alt="Preview" className="preview-img" />}

          <button type="submit">
            {editandoId ? "Actualizar Datos" : "Registrar Mascota"}
          </button>

          {editandoId && (
            <button type="button" className="cancel" onClick={limpiar}>
              Cancelar Edición
            </button>
          )}
        </form>

        <div className="mascotas-list">
          {mascotas.map(m => (
            <div key={m.id} className="mascota-card">
              <img src={m.foto || "/default-pet.png"} alt={m.nombre} />
              <h3>{m.nombre}</h3>
              <p><strong>{m.especie}</strong> — {m.raza}</p>
              <p>{m.edad} años</p>

              <div className="mascota-actions">
                <button className="edit" onClick={() => editar(m)}>Editar</button>
                <button className="delete" onClick={() => abrirModalRetiro(m)}>Retirar</button>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL DE RETIRO (Integrado con la estética) */}
        {showRetirarModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              {!pasoConfirmacion ? (
                <>
                  <h3>Retirar a {mascotaARetirar?.nombre}</h3>
                  <select 
                    className="modal-select"
                    value={retiroForm.motivo} 
                    onChange={(e) => setRetiroForm({...retiroForm, motivo: e.target.value})}
                  >
                    <option value="fallecimiento">Fallecimiento</option>
                    <option value="donacion">Donación / Cambio de dueño</option>
                    <option value="otro">Otro motivo...</option>
                  </select>

                  {retiroForm.motivo === "otro" && (
                    <textarea 
                      className="modal-textarea"
                      placeholder="Escribe el motivo aquí..."
                      value={retiroForm.detallesOtro}
                      onChange={(e) => setRetiroForm({...retiroForm, detallesOtro: e.target.value})}
                    />
                  )}

                  <div className="checkbox-group">
                    <label>
                      <input type="checkbox" checked={retiroForm.mantenerHistorial} onChange={(e) => setRetiroForm({...retiroForm, mantenerHistorial: e.target.checked})} />
                      Mantener historial archivado
                    </label>
                  </div>

                  <div className="modal-actions-vertical">
                    <button className="btn-next" onClick={() => setPasoConfirmacion(true)}>Siguiente</button>
                    <button className="btn-cancel-text" onClick={cerrarModal}>Volver</button>
                  </div>
                </>
              ) : (
                <div className="confirmacion-final">
                  <div className="warning-icon">⚠️</div>
                  <p>¿Seguro que deseas retirar a <strong>{mascotaARetirar?.nombre}</strong>?</p>
                  <div className="modal-actions-vertical">
                    <button className="btn-danger-final" onClick={confirmarRetiro}>Sí, retirar definitivamente</button>
                    <button className="btn-cancel-text" onClick={() => setPasoConfirmacion(false)}>Regresar</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default DuenoMascotas;
import { useState } from "react";
import Layout from "../components/Layout";
import "../styles/pages/mascotas.css";

function DuenoMascotas() {
  const [mascotas, setMascotas] = useState([
    {
      id: 1,
      nombre: "Firu",
      especie: "Perro",
      raza: "Labrador",
      edad: 3,
      foto: "/labrador.jpg" // Asegúrate de que la ruta sea accesible
    }
  ]);

  const [form, setForm] = useState({
    nombre: "",
    especie: "",
    raza: "",
    edad: "",
    foto: null
  });

  const [editandoId, setEditandoId] = useState(null);
  const [preview, setPreview] = useState(null);

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

    const nueva = {
      id: editandoId || Date.now(),
      ...form,
      foto: preview || form.foto
    };

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
  };

  const eliminar = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta mascota?")) {
      setMascotas(mascotas.filter(m => m.id !== id));
    }
  };

  const limpiar = () => {
    setForm({ nombre: "", especie: "", raza: "", edad: "", foto: null });
    setPreview(null);
    setEditandoId(null);
  };

  return (
    <Layout role="dueno">
      <div className="dueno-mascotas-container">
        <h2>Mis Mascotas</h2>

        <form className="mascotas-form" onSubmit={guardarMascota}>
          <input 
            name="nombre" 
            placeholder="Nombre de la mascota" 
            value={form.nombre} 
            onChange={handleChange} 
            required
          />
          <input 
            name="especie" 
            placeholder="Especie (Ej: Perro)" 
            value={form.especie} 
            onChange={handleChange} 
            required
          />
          <input 
            name="raza" 
            placeholder="Raza" 
            value={form.raza} 
            onChange={handleChange} 
            required
          />
          <input 
            name="edad" 
            type="number" 
            placeholder="Edad" 
            value={form.edad} 
            onChange={handleChange} 
            required
          />

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
              <p><strong>Especie:</strong> {m.especie}</p>
              <p><strong>Raza:</strong> {m.raza}</p>
              <p><strong>Edad:</strong> {m.edad} años</p>

              <div className="mascota-actions">
                <button className="edit" onClick={() => editar(m)}>Editar</button>
                <button className="delete" onClick={() => eliminar(m.id)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default DuenoMascotas;
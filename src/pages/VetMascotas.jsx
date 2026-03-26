import { useState } from "react";
import Layout from "../components/Layout";
import "../styles/pages/mascotas_vet.css";

function VetMascotas() {
  const [mascotas] = useState([
    {
      id: 1,
      nombre: "Firu",
      especie: "Perro",
      raza: "Labrador",
      edad: 3,
      foto: "/labrador.jpg"
    },
    {
      id: 2,
      nombre: "Nami",
      especie: "Gato",
      raza: "Siames",
      edad: 6,
      foto: "/nami.jpeg"
    }
  ]);

  const [seleccionada, setSeleccionada] = useState(null);

  // Datos de seguimiento (Registrados por el dueño: RF-18, RF-19, RF-20)
  const [seguimiento] = useState([
    { id: 1, tipo: "Alimentación", detalle: "200g de ProPlan", fecha: "2026-03-24", hora: "08:00" },
    { id: 2, tipo: "Actividad", detalle: "Juego con pelota", intensidad: "Alta", fecha: "2026-03-24", hora: "10:30" },
    { id: 3, tipo: "Observación", detalle: "Se rasca mucho la oreja derecha", fecha: "2026-03-24", hora: "14:00" }
  ]);

  return (
    <Layout role="veterinario">
      {!seleccionada ? (
        <div className="lista-mascotas-container">
          <h2>Listado de Mascotas</h2>
          <div className="grid-mascotas">
            {mascotas.map((m) => (
              <div key={m.id} className="tarjeta-mascota">
                <img src={m.foto} alt={m.nombre} className="foto-lista" />
                <h3>{m.nombre}</h3>
                <p>{m.especie} - {m.raza}</p>
                <button onClick={() => setSeleccionada(m)}>
                  Ver Perfil
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="perfil-mascota-container">
          <button className="btn-volver" onClick={() => setSeleccionada(null)}>
            ← Volver al Listado
          </button>

          <header className="perfil-header">
            <img src={seleccionada.foto} alt={seleccionada.nombre} className="foto-perfil" />
            <div className="info-basica">
              <h2>{seleccionada.nombre}</h2>
              <p><strong>Especie:</strong> {seleccionada.especie}</p>
              <p><strong>Raza:</strong> {seleccionada.raza}</p>
              <p><strong>Edad:</strong> {seleccionada.edad} años</p>
            </div>
          </header>

          <div className="secciones-perfil">
            {/* SECCIÓN: HISTORIAL MÉDICO (Gestionado por el veterinario) */}
            <section className="seccion-historial">
              <h3>Historial Médico</h3>
              <div className="contenedor-historial-medico">
                {/* Aquí integras tus funciones de vacunas, tratamientos y citas */}
                <p>Registros médicos de la mascota...</p>
              </div>
            </section>

            {/* SECCIÓN: SEGUIMIENTO DIARIO (Registrado por el dueño) */}
            <section className="seccion-seguimiento">
              <h3>Seguimiento Diario</h3>
              <div className="lista-seguimiento">
                {seguimiento.map((reg) => (
                  <div key={reg.id} className="item-seguimiento">
                    <div className="encabezado-item">
                      <span className="tipo-registro">{reg.tipo}</span>
                      <span className="fecha-registro">{reg.fecha} {reg.hora}</span>
                    </div>
                    <p className="detalle-registro">{reg.detalle}</p>
                    {reg.intensidad && (
                      <span className="intensidad">Intensidad: {reg.intensidad}</span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default VetMascotas;
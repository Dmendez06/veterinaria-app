import { useState } from "react";
import Layout from "../components/Layout";
import "../styles/pages/mascotas_vet.css";

function VetMascotas() {
  const [fechaActual, setFechaActual] = useState(new Date());
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [seleccionada, setSeleccionada] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [filtroRaza, setFiltroRaza] = useState("Todas");

  // Base de datos de prueba
  const [mascotas] = useState([
    { 
      id: 1, nombre: "Firu", especie: "Perro", raza: "Labrador", 
      edad: 3, dueño: "Juan Pérez", peso: "25kg", foto: "/labrador.jpg",
      historial: "Paciente con diagnóstico de insuficiencia renal leve. Dieta estrictamente medicada. Control de hidratación constante.",
      estado: "En Tratamiento", ultimaVisita: "15 Mar 2026"
    },
    { 
      id: 2, nombre: "Nami", especie: "Gato", raza: "Siames", 
      edad: 6, dueño: "María Rodríguez", peso: "4.2kg", foto: "/nami.jpeg",
      historial: "Vacunas al día. Presenta sensibilidad en la piel durante el verano. Requiere limpieza profunda de oídos cada 15 días.",
      estado: "Saludable", ultimaVisita: "20 Mar 2026"
    }
  ]);

  const [citas] = useState([
    { id: 101, mascota: "Firu", fecha: "2026-04-24", hora: "15:00", motivo: "Vacuna Rabia", notas: "Traer carnet físico.", tipo: "Vacunación" },
    { id: 102, mascota: "Nami", fecha: "2026-04-26", hora: "10:30", motivo: "Revisión General", notas: "Ayuno de 8 horas.", tipo: "Chequeo" }
  ]);

  // Lógica de Calendario
  const obtenerDiasMes = () => {
    const año = fechaActual.getFullYear();
    const mes = fechaActual.getMonth();
    const primerDia = new Date(año, mes, 1).getDay();
    const totalDias = new Date(año, mes + 1, 0).getDate();
    const dias = [];
    for (let i = 0; i < primerDia; i++) dias.push(null);
    for (let d = 1; d <= totalDias; d++) dias.push(new Date(año, mes, d));
    return dias;
  };

  const formatearFechaISO = (date) => {
    if (!date) return null;
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
    return adjustedDate.toISOString().split('T')[0];
  };

  const mascotasFiltradas = mascotas.filter(m => {
    const term = busqueda.toLowerCase();
    return (m.nombre.toLowerCase().includes(term) || m.dueño.toLowerCase().includes(term) || m.edad.toString().includes(term)) && (filtroRaza === "Todas" || m.raza === filtroRaza);
  });

  const razasUnicas = ["Todas", ...new Set(mascotas.map(m => m.raza))];
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  return (
    <Layout role="veterinario">
      {!seleccionada ? (
        <div className="lista-mascotas-container">
          <h1>Gestión Veterinaria</h1>

          {/* CALENDARIO */}
          <section className="calendario-seccion">
            <div className="calendario-container">
              <div className="calendario-header">
                <h2>{meses[fechaActual.getMonth()]} {fechaActual.getFullYear()}</h2>
                <div className="botones-navegacion">
                  <button onClick={() => setFechaActual(new Date(fechaActual.setMonth(fechaActual.getMonth() - 1)))}>{"<"}</button>
                  <button onClick={() => setFechaActual(new Date(fechaActual.setMonth(fechaActual.getMonth() + 1)))}>{">"}</button>
                </div>
              </div>
              <div className="calendario-grid">
                {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map(d => <div key={d} className="dia-semana">{d}</div>)}
                {obtenerDiasMes().map((dia, index) => {
                  const fechaISO = formatearFechaISO(dia);
                  const citasDelDia = citas.filter(c => c.fecha === fechaISO);
                  return (
                    <div key={index} className="celda-dia">
                      {dia && <span className="numero-dia">{dia.getDate()}</span>}
                      <div className="eventos-lista">
                        {citasDelDia.map(c => (
                          <div key={c.id} className="evento-min" onClick={() => setEventoSeleccionado(c)}>
                            {c.hora} - {c.mascota}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* FICHA DE CITA RÁPIDA */}
          {eventoSeleccionado && (
            <div className="cita-detalle-card">
              <div className="cita-card-header">
                <span className="tipo-cita-badge">{eventoSeleccionado.tipo}</span>
                <button className="btn-cerrar-cita" onClick={() => setEventoSeleccionado(null)}>&times;</button>
              </div>
              <div className="cita-card-body">
                <div className="cita-info-wrapper">
                  <div className="cita-main-col">
                    <small>PACIENTE</small>
                    <h3>{eventoSeleccionado.mascota}</h3>
                    <p className="cita-hora">🕒 {eventoSeleccionado.hora}</p>
                  </div>
                  <div className="cita-owner-col">
                    <small>PROPIETARIO</small>
                    <p className="txt-owner-name">
                      👤 {mascotas.find(m => m.nombre === eventoSeleccionado.mascota)?.dueño || "No asignado"}
                    </p>
                  </div>
                </div>
                <div className="cita-medical-info">
                  <p><strong>Motivo:</strong> {eventoSeleccionado.motivo}</p>
                  <div className="cita-notas-box"><strong>Notas:</strong> {eventoSeleccionado.notas}</div>
                </div>
                <button className="btn-action-expediente" onClick={() => {
                  const m = mascotas.find(pet => pet.nombre === eventoSeleccionado.mascota);
                  if(m) setSeleccionada(m);
                }}>Abrir Expediente Completo</button>
              </div>
            </div>
          )}

          {/* FILTROS Y GRID */}
          <div className="barra-filtros">
            <input type="text" placeholder="Buscar por mascota, dueño o edad..." className="input-busqueda" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
            <select className="select-filtro" value={filtroRaza} onChange={(e) => setFiltroRaza(e.target.value)}>
              {razasUnicas.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <div className="grid-mascotas">
            {mascotasFiltradas.map(m => (
              <div key={m.id} className="tarjeta-mascota">
                <div className="dueño-tag">Propietario: {m.dueño}</div>
                <img src={m.foto} alt={m.nombre} className="foto-lista" />
                <h3>{m.nombre}</h3>
                <p className="txt-secundario">{m.especie} • {m.raza}</p>
                <p className="txt-edad">{m.edad} años</p>
                <button onClick={() => setSeleccionada(m)}>Ver Perfil</button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* --- VISTA DE EXPEDIENTE DETALLADO (RELLENO) --- */
        <div className="perfil-mascota-container">
          <div className="perfil-top-bar">
            <button className="btn-volver" onClick={() => setSeleccionada(null)}>← Regresar al Panel</button>
            <span className="badge-expediente">EXPEDIENTE CLÍNICO #00{seleccionada.id}</span>
          </div>

          <div className="expediente-grid-layout">
            <aside className="expediente-sidebar">
              <div className="foto-perfil-wrapper">
                <img src={seleccionada.foto} alt={seleccionada.nombre} className="foto-perfil-grande" />
              </div>
              <div className="datos-principales">
                <h2>{seleccionada.nombre}</h2>
                <p className="especie-tag">{seleccionada.especie} • {seleccionada.raza}</p>
              </div>
              <div className="dueño-card">
                <label>PROPIETARIO</label>
                <p>{seleccionada.dueño}</p>
              </div>
            </aside>

            <main className="expediente-main">
              <section className="info-stats-grid">
                <div className="stat-item">
                  <label>Edad</label>
                  <p>{seleccionada.edad} años</p>
                </div>
                <div className="stat-item">
                  <label>Peso Actual</label>
                  <p>{seleccionada.peso}</p>
                </div>
                <div className="stat-item">
                  <label>Última Visita</label>
                  <p>{seleccionada.ultimaVisita}</p>
                </div>
                <div className="stat-item">
                  <label>Estado</label>
                  <p className={seleccionada.estado === 'Saludable' ? 'status-ok' : 'status-alert'}>
                    {seleccionada.estado}
                  </p>
                </div>
              </section>

              <section className="bloque-clinico">
                <h3>🩺 Resumen Médico</h3>
                <div className="papel-clinico">
                  <p>{seleccionada.historial}</p>
                </div>
              </section>

              <section className="bloque-clinico">
                <h3>💉 Calendario Preventivo</h3>
                <ul className="lista-procedimientos">
                  <li>Control de Parásitos - <span className="fecha-pro">Abril 2026</span></li>
                  <li>Refuerzo Multivitamínico - <span className="fecha-pro">Junio 2026</span></li>
                </ul>
              </section>
            </main>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default VetMascotas;
import { useState } from "react";
import Layout from "../components/Layout";
import "../styles/pages/seguimiento_vet.css";

function VetSeguimiento() {
  const [fechaActual, setFechaActual] = useState(new Date());
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

  const [citas] = useState([
    { id: 101, mascota: "Firu", fecha: "2026-03-24", hora: "15:00", motivo: "Vacuna Rabia", notas: "Traer carnet de vacunación completo." },
    { id: 102, mascota: "Nami", fecha: "2026-03-26", hora: "10:30", motivo: "Revisión General", notas: "Ayuno de 8 horas antes de la cita." },
    { id: 103, mascota: "Firu", fecha: "2026-03-24", hora: "09:00", motivo: "Limpieza Dental", notas: "Revisar encías inflamadas detectadas en la última visita." }
  ]);

  const [seguimiento] = useState([
    { id: 1, mascota: "Firu", tipo: "Alimentación", detalle: "200g de alimento balanceado", fecha: "2026-03-24", hora: "08:00" },
    { id: 3, mascota: "Nami", tipo: "Observación", detalle: "Poco apetito y letargo", fecha: "2026-03-24", hora: "09:30" }
  ]);

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

  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  return (
    <Layout role="veterinario">
      <div className="gestion-wrapper">
        <h1>Seguimiento de Citas</h1>

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
              {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map(d => (
                <div key={d} className="dia-semana">{d}</div>
              ))}
              
              {obtenerDiasMes().map((dia, index) => {
                const fechaISO = formatearFechaISO(dia);
                const citasDelDia = citas.filter(c => c.fecha === fechaISO);

                return (
                  <div key={index} className="celda-dia">
                    {dia && <span className="numero-dia">{dia.getDate()}</span>}
                    <div className="eventos-lista">
                      {citasDelDia.map(c => (
                        <div 
                          key={c.id} 
                          className="evento-min" 
                          onClick={() => setEventoSeleccionado(c)}
                        >
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

        {/* RESUMEN DEL EVENTO SELECCIONADO */}
        {eventoSeleccionado && (
          <section className="resumen-evento">
            <div className="resumen-header">
              <h3>Detalles de la Cita</h3>
              <button className="btn-cerrar" onClick={() => setEventoSeleccionado(null)}>&times;</button>
            </div>
            <div className="resumen-contenido">
              <p><strong>Paciente:</strong> {eventoSeleccionado.mascota}</p>
              <p><strong>Motivo:</strong> {eventoSeleccionado.motivo}</p>
              <p><strong>Fecha y Hora:</strong> {eventoSeleccionado.fecha} a las {eventoSeleccionado.hora}</p>
              <p><strong>Notas adicionales:</strong> {eventoSeleccionado.notas}</p>
            </div>
          </section>
        )}

        {/* TABLA DE SEGUIMIENTO */}
        <section className="tabla-seguimiento-seccion">
          <h3>Seguimiento Diario (Actividad y Alimentación)</h3>
          <table className="tabla-personalizada">
            <thead>
              <tr>
                <th>Mascota</th>
                <th>Tipo</th>
                <th>Detalle</th>
                <th>Fecha/Hora</th>
              </tr>
            </thead>
            <tbody>
              {seguimiento.map(reg => (
                <tr key={reg.id}>
                  <td>{reg.mascota}</td>
                  <td>{reg.tipo}</td>
                  <td>{reg.detalle}</td>
                  <td>{reg.fecha} {reg.hora}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </Layout>
  );
}

export default VetSeguimiento;
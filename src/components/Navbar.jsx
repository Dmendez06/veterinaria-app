import { NavLink } from "react-router-dom";
import "../styles/components/navbar.css";

function Navbar({ role }) {
  return (
    <nav className="navbar">
      <span className="navbar-brand">Menú</span>

      <div className="navbar-links">
        {role === "dueno" && (
          <>
            <NavLink to="/">Inicio</NavLink>
            <NavLink to="/dueno/mascotas">Mascotas</NavLink>
            <NavLink to="/dueno/historial">Historial</NavLink>
            <NavLink to="/dueno/seguimiento">Seguimiento</NavLink>
          </>
        )}

        {role === "veterinario" && (
          <>
            <NavLink to="/">Inicio</NavLink>
            <NavLink to="/veterinario/mascotas">Pacientes</NavLink>
            <NavLink to="/veterinario/historial">Historial</NavLink>
            <NavLink to="/veterinario/seguimiento">Seguimiento</NavLink>
          </>
        )}
      </div>

      <span className={`navbar-role ${role}`}>
        {role === "dueno" ? "Dueño" : "Veterinario"}
      </span>
    </nav>
  );
}

export default Navbar;
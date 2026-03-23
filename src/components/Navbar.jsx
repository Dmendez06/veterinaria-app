import { Link } from "react-router-dom";

function Navbar({ role }) {
  return (
    <nav style={{ marginBottom: "20px", borderBottom: "1px solid #ccc", padding: "10px" }}>
      <h3>Menú</h3>

      {role === "dueno" && (
        <>
          <Link to="/dueno/mascotas">Mascotas</Link> |{" "}
          <Link to="/dueno/historial">Historial</Link> |{" "}
          <Link to="/dueno/seguimiento">Seguimiento</Link>
        </>
      )}

      {role === "veterinario" && (
        <>
          <Link to="/veterinario/mascotas">Pacientes</Link> |{" "}
          <Link to="/veterinario/historial">Historial</Link> |{" "}
          <Link to="/veterinario/seguimiento">Seguimiento</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Sistema Veterinario</h1>
      <p>Seleccione el tipo de usuario</p>

      <div style={{ marginTop: "20px" }}>
        <Link to="/dueno/mascotas">
          <button style={{ marginRight: "10px" }}>
            Dueño de Mascota
          </button>
        </Link>

        <Link to="/veterinario/mascotas">
          <button>
            Veterinario
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
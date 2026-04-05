import { Link } from "react-router-dom";
import "../styles/pages/home.css";

function Home() {
  return (
    <div className="home-container">
      <h1>Sistema Veterinario</h1>
      <p>Seleccione el tipo de usuario</p>

      <div className="home-buttons">
        <Link to="/dueno/mascotas">
          <button className="home-button">
            Dueño de Mascota
          </button>
        </Link>

        <Link to="/veterinario/mascotas">
          <button className="home-button">
            Veterinario
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
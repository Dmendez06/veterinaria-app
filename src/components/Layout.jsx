import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function Layout({ role, children, showBack = false }) {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar role={role} />

      {showBack && (
        <button onClick={() => navigate(-1)} style={{ margin: "10px" }}>
          ← Volver
        </button>
      )}

      <div>
        {children}
      </div>
    </div>
  );
}

export default Layout;
import Navbar from "./Navbar";

function Layout({ role, children }) {
  return (
    <div>
      <Navbar role={role} />
      <div>
        {children}
      </div>
    </div>
  );
}

export default Layout;
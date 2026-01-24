import { useEffect, useState } from "react";
import { HashRouter, Route, Router, Routes } from "react-router-dom";
import Layout from "./Layout";
import Customers from "./pages/Customers";
import Prescriptions from "./pages/Prescriptions";

function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // Agrega o quita la clase 'dark' en el elemento raíz
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Customers />} />
          <Route path="prescriptions" element={<Prescriptions />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;

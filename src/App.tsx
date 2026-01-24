import { useEffect, useState } from "react";
import { HashRouter, Route, Router, Routes } from "react-router-dom";
import Layout from "./Layout";
import Customers from "./pages/Customers";

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
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;

import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Clients from "./pages/Clients";
import Prescriptions from "./pages/Prescriptions";

function App() {


  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Clients />} />
          <Route path="prescriptions" element={<Prescriptions />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;

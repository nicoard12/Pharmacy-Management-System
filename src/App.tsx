import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Customers from "./pages/Customers";
import Prescriptions from "./pages/Prescriptions";

function App() {


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

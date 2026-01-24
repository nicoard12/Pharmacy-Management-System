import { useState } from "react";
import { pinWindow } from "../api/window";

function Header() {
  const [pinned, setPinned] = useState(true);

  const togglePin = () => {
    const newPinnedState = !pinned;
    setPinned(newPinnedState);
    pinWindow(newPinnedState);
  };

  return (
    <header className="w-full flex items-center">
      <nav className="w-full">
        <ul className="w-full flex justify-around">
          <li>Clientes</li>
          <li>Recetas</li>
          <li>Precios (agregar flechita)</li>
        </ul>
      </nav>
      <img
        onClick={togglePin}
        src="pin.png"
        alt="pin"
        className={`w-8 cursor-pointer p-1 hover:p-0 ${pinned ? "bg-blue-400" : ""}`}
      />
    </header>
  );
}

export default Header;

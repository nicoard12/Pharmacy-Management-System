import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";

function ToggleDarkMode() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

return (
  <button 
    title={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"} 
    className="group cursor-pointer p-2 rounded-lg hover:bg-[var(--details)] transition-colors" 
    onClick={() => setDark(!dark)}
  >
    {dark ? (
      <SunIcon className="h-5 w-5 text-gray-400 transition-transform group-hover:rotate-45" />
    ) : (
      <MoonIcon className="h-5 w-5 text-slate-700 transition-transform group-hover:-rotate-12" />
    )}
  </button>
);
}

export default ToggleDarkMode;

import { useState, useEffect } from "react";

function ToggleDarkMode() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button className="cursor-pointer" onClick={() => setDark(!dark)}>
      {dark ? "☀️" : "🌙"}
    </button>
  );
}

export default ToggleDarkMode;

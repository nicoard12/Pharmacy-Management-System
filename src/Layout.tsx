import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import { useEffect, useRef } from "react";
import { contextmenu } from "./api/window";

function Layout() {
  const appRef= useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      contextmenu();
    };

    if (appRef.current)
      appRef.current.addEventListener("contextmenu", handleContextMenu);
  }, []);

  return (
    <div ref={appRef}>
        <Header />
        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default Layout

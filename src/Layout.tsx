import { Outlet } from "react-router-dom"
import Header from "./components/header/Header"
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
    <div ref={appRef} className="min-h-screen flex flex-col">
        <Header />
        <main className="flex flex-col flex-1 bg-gray-200 text-black dark:bg-slate-950 dark:text-white">
            <Outlet />
        </main>
    </div>
  )
}

export default Layout

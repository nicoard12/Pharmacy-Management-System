import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import { useEffect, useRef } from "react";
import { contextmenu } from "./api/window";
import { Toaster } from "react-hot-toast";

function Layout() {
  const appRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      contextmenu();
    };

    if (appRef.current)
      appRef.current.addEventListener("contextmenu", handleContextMenu);
  }, []);

  return (
    <div ref={appRef} className="h-screen flex flex-col">
      <Header />
      <main className="flex flex-col flex-1 overflow-hidden bg-[var(--primary)] text-[var(--text)]">
        <Outlet />
      </main>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "var(--card)", // O usa '#1f2937' para dark
            color: "var(--text-card)", // O '#ffffff'
            border: "1px solid var(--card-border)",
            fontWeight: "500",
          },
        }}
      />
    </div>
  );
}

export default Layout;

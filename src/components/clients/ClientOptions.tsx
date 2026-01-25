import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { useEffect, useRef, useState } from "react";

function ClientOptions() {
  const [isOpen, setIsOpen] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsRef.current &&
        event.target instanceof Node &&
        !optionsRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={optionsRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        <EllipsisVerticalIcon className="w-5 h-5 opacity-70" />
      </button>

      {isOpen && (
        <div className="absolute right-0 rounded-lg bg-white dark:bg-slate-900 shadow-lg border border-[var(--card-border)] text-sm z-10 font-medium">
          <button className="cursor-pointer w-full px-5 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800">
            Editar
          </button>
          <button className="cursor-pointer w-full px-5 py-2 text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
}

export default ClientOptions;

import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

function Prescriptions() {
  const downloadPresicriptions = () => {};
  return (
    <div className="h-full">
      <header>botones</header>
      <div className="relative h-full">
        <button
          className="flex items-center gap-1 absolute top-2 right-2 bg-[var(--button)] opacity-60 hover:opacity-80 font-medium text-xs text-white rounded-md p-2 cursor-pointer "
          onClick={downloadPresicriptions}
        >
          Descargar <ArrowDownTrayIcon className="h-3 w-3" />
        </button>
        <textarea
          className="
          bg-[var(--card)] 
          w-full h-full p-1
          border-0 outline-none resize-none 
          font-sans 
          placeholder:text-[var(--placeholder)] "
          placeholder="Las recetas obtenidas aparecerán aca"
          spellCheck={false}
        />
      </div>
    </div>
  );
}

export default Prescriptions;

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function Searcher({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative flex flex-1">
      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="h-4 w-4 text-[var(--placeholder)]" />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar..."
        className="
          flex-1
          pl-7 pr-4 py-2 rounded-lg border outline-none
          bg-[var(--card)]
          text-[var(--text-card)]
          border-[var(--card-border)]
          placeholder:text-[var(--placeholder)]
          focus:border-blue-300
        "
      />
    </div>
  );
}

export default Searcher;

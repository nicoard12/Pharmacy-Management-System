import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function Searcher({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar..."
        className="
          pl-8 pr-4 py-2 rounded-lg border outline-none
          bg-[var(--card)]
          text-[var(--text-card)]
          border-[var(--card-border)]
          placeholder:text-gray-400
        "
      />
    </div>
  );
}

export default Searcher;

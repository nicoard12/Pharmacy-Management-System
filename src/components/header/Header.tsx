import NavOption from "./NavOption";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/16/solid";
import ToggleDarkMode from "./ToggleDarkMode";
import Pin from "./Pin";

function Header() {
  return (
    <header
      className="
    w-full flex items-center justify-between
    px-2 py-2
    bg-blue-300 text-white
    dark:bg-slate-950 dark:text-slate-400
    shadow-md dark:shadow-black/30
  "
    >
      <ToggleDarkMode />

      <nav className="w-full">
        <ul className="flex items-center justify-center gap-2">
          <NavOption to="/">Clientes</NavOption>
          <NavOption to="/prescriptions">Recetas</NavOption>
          <NavOption to="https://www.alfabeta.net/precio/" isLink={true}>
            <ArrowTopRightOnSquareIcon className="h-4 w-4" /> Precios{" "}
          </NavOption>
        </ul>
      </nav>

      <Pin />
    </header>
  );
}

export default Header;

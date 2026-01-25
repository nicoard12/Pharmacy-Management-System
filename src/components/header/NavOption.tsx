import { NavLink } from "react-router-dom";
import { openLink } from "../../api/window";

function NavOption({
  to,
  children,
  isLink = false,
}: {
  to: string;
  children: React.ReactNode;
  isLink?: boolean;
}) {
  const goToLink = () => {
    if (openLink) {
      openLink(to);
    }
  };
  return (
    <li>
      {isLink ? (
        <button
          className="cursor-pointer flex items-center gap-1 px-3 text-[var(--text-secondary)] rounded-md text-sm font-medium transition-colors"
          onClick={goToLink}
        >
          {children}
        </button>
      ) : (
        <NavLink
          to={to}
          className={({ isActive }) =>
            `
    flex items-center gap-1
    px-3 py-1.5 rounded
    text-sm font-medium
    transition-colors
    
    ${
      isActive
        ? "bg-[var(--details)] text-white"
        : " hover:bg-[var(--details)] text-[var(--text-secondary)]"
    }
    `
          }
        >
          {children}
        </NavLink>
      )}
    </li>
  );
}

export default NavOption;

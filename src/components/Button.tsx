import { ComponentType, SVGProps } from "react";
import ClickTooltip from "./ClickTooltip";

function Button({
  Icon,
  text,
  handleClick,
  color,
  toolTip,
  title,
}: {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  text: string;
  handleClick: () => void;
  color?: string;
  toolTip?: string;
  title?: string;
}) {
  return toolTip ? (
    <ClickTooltip content={toolTip} onClick={handleClick} top={true}>
      <button
        title={title}
        className={`flex items-center gap-1 ${color ? color : "bg-[var(--button)] hover:bg-[var(--button-hover)]"}  font-medium text-xs text-white rounded p-1.5 cursor-pointer `}
      >
        {<Icon className="h-4" />}
        {text}
      </button>
    </ClickTooltip>
  ) : (
    <button
      className={`flex items-center gap-1 ${color ? color : "bg-[var(--button)] hover:bg-[var(--button-hover)]"}  font-medium text-xs text-white rounded p-1.5 cursor-pointer `}
      onClick={handleClick}
      title={title}
    >
      {<Icon className="h-4" />}
      {text}
    </button>
  );
}

export default Button;

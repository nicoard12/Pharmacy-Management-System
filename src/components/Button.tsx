import { ComponentType, SVGProps } from "react";
import ClickTooltip from "./ClickTooltip";

function Button({
  Icon,
  text,
  handleClick,
  color,
  toolTip,
  title,
  textSize = "text-xs"
}: {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  text: string;
  handleClick: () => void;
  color?: string;
  toolTip?: string;
  title?: string;
  textSize?: string
}) {
  const iconSize = textSize === "text-sm" ? "h-5" : "h-4";

  return toolTip ? (
    <ClickTooltip content={toolTip} onClick={handleClick} top={true}>
      <button
        title={title}
        className={`flex items-center gap-1 ${color ? color : "bg-[var(--button)] hover:bg-[var(--button-hover)]"}  font-medium ${textSize} text-white rounded p-1.5 cursor-pointer `}
      >
        {<Icon className={iconSize} />}
        {text}
      </button>
    </ClickTooltip>
  ) : (
    <button
      className={`flex items-center gap-1 ${color ? color : "bg-[var(--button)] hover:bg-[var(--button-hover)]"}  font-medium ${textSize} text-white rounded p-1.5 cursor-pointer `}
      onClick={handleClick}
      title={title}
    >
      {<Icon className={iconSize} />}
      {text}
    </button>
  );
}

export default Button;

import { ComponentType, SVGProps } from "react";
import ClickTooltip from "./ClickTooltip";

function Button({
  Icon,
  text,
  handleClick,
  color,
  toolTip,
  title,
  textSize = "text-xs",
  hideTextOnMobile,
}: {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  text: string;
  handleClick: () => void;
  color?: string;
  toolTip?: string;
  title?: string;
  textSize?: string;
  hideTextOnMobile?: boolean;
}) {
  const iconSize = textSize === "text-sm" ? "h-5" : "h-4";
  const textContent = (
    <span className={hideTextOnMobile ? "hidden sm:inline" : ""}>{text}</span>
  );

  return toolTip ? (
    <ClickTooltip content={toolTip} onClick={handleClick} top={true}>
      <button
        title={title || text}
        className={`flex items-center gap-1 ${color ? color : "bg-[var(--button)] hover:bg-[var(--button-hover)]"}  font-medium ${textSize} text-white rounded p-1.5 cursor-pointer `}
      >
        {<Icon className={iconSize} />}
        {textContent}
      </button>
    </ClickTooltip>
  ) : (
    <button
      className={`flex items-center gap-1 ${color ? color : "bg-[var(--button)] hover:bg-[var(--button-hover)]"}  font-medium ${textSize} text-white rounded p-1.5 cursor-pointer `}
      onClick={handleClick}
      title={title || text}
    >
      {<Icon className={iconSize} />}
      {textContent}
    </button>
  );
}

export default Button;

import Tippy from "@tippyjs/react";
import { cloneElement, useState } from "react";
import "tippy.js/dist/tippy.css";

function ClickTooltip({
  content,
  children,
  onClick
}: {
  content: string;
  children: React.ReactElement;
  onClick: () => void;
}) {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(true);
    setTimeout(() => setVisible(false), 500);
    onClick();
  };

  return (
    <Tippy
      content={content}
      visible={visible}
      placement="right"
      animation="shift-away"
      offset={[0, 6]}
    >
      {cloneElement(children, {
        onClick: handleClick,
      })}
    </Tippy>
  );
}
export default ClickTooltip;

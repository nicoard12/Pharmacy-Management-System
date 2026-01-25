import { useState } from "react";
import { pinWindow } from "../../api/window";
function Pin() {
  const [pinned, setPinned] = useState(true);

  const togglePin = () => {
    const newPinnedState = !pinned;
    setPinned(newPinnedState);
    pinWindow(newPinnedState);
  };
  
  return (
    <img
      onClick={togglePin}
      src="pin.png"
      alt="pin"
      className={`
    w-8 p-1 rounded cursor-pointer
    transition-all
    hover:scale-110
    ${
      pinned
        ? "bg-blue-500 dark:bg-blue-950"
        : "hover:bg-blue-600/50 dark:hover:bg-blue-800/50"
    }
  `}
    />
  );
}

export default Pin;

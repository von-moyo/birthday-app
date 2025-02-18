import React from "react";

export const useClickOutside = (
  popupRef: React.RefObject<HTMLElement | null>, // Properly type the ref
  buttonRef: React.RefObject<HTMLElement | null>, // Properly type the ref
  closeFunction: () => void // Typing for the close function
) => {
  React.useEffect(() => {
    /**
     * Hide if clicked on outside of the element
     */
    const handleClickOutside = (event: MouseEvent) => {
      // Ensure ref.current is defined and validate the event target
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        closeFunction();
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef, buttonRef, closeFunction]); // Including ref and closeFunction as dependencies
};
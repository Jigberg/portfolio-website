import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const MouseTracker = ({ children, offset = { x: 0, y: 0 } }) => {
  const element = useRef(null);

  useEffect(() => {
    function handler(e) {
      if (element.current) {
        const x = e.clientX + offset.x;
        const y = e.clientY + offset.y;
        element.current.style.transform = `translate(${x}px, ${y}px)`;
        element.current.style.visibility = "visible";
      }
    }

    document.addEventListener("mousemove", handler);
    return () => document.removeEventListener("mousemove", handler);
  }, [offset.x, offset.y]);

  // Ensure the portal only renders in the browser
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="mouse-tracker"
      ref={element}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        backgroundColor: "white",
        padding: "2px 7px",
        borderRadius: "3px",
        whiteSpace: "nowrap",
        visibility: "hidden",
      }}
    >
      {children}
    </div>,
    document.body
  );
};

export default MouseTracker;

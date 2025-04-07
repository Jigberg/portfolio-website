import React, { useEffect, useState } from "react";
import anime from "animejs";

const WaterDropGrid = () => {
  return (
    <div
      style={{
        position: "absolute",
        display: "grid",
        backgroundColor: "#1e293b", // bg-slate-900
        width: "100vw", // Full width of the viewport
        height: "100vh", // Full height of the viewport
        overflow: "hidden", // Clip any content that overflows the parent container
      }}
    >
      <DotGrid />
    </div>
  );
};

const DotGrid = () => {
  const [gridDimensions, setGridDimensions] = useState({ rows: 0, cols: 0 });
  const dotSize = 20; // Size of each dot (in pixels, including padding)

  useEffect(() => {
    // Calculate the number of rows and columns based on the parent container's size
    const updateGridDimensions = () => {
      const parentWidth = window.innerWidth; // Full width of the viewport
      const parentHeight = window.innerHeight; // Full height of the viewport
      const cols = Math.floor(parentWidth / dotSize) + 1; // Number of columns
      const rows = Math.floor(parentHeight / dotSize) + 1; // Number of rows
      setGridDimensions({ rows, cols });
    };

    // Update grid dimensions on mount and when the window is resized
    updateGridDimensions();
    window.addEventListener("resize", updateGridDimensions);

    return () => {
      window.removeEventListener("resize", updateGridDimensions);
    };
  }, []);

  const handleDotClick = (e) => {
    const index = e.currentTarget.dataset.index; // Get the index of the clicked dot

    // Trigger the bounce animation for the clicked dot and its neighbors
    anime({
      targets: ".dot-point",
      translateY: [
        { value: "-2.75rem", easing: "easeOutExpo", duration: 600 },
        { value: 0, easing: "easeOutBounce", duration: 800 },
      ],
      delay: anime.stagger(100, {
        grid: [gridDimensions.cols, gridDimensions.rows], // Define the grid dimensions
        from: index, // Start the animation from the clicked dot
      }),
      
    });
  };

  const dots = [];
  let index = 0;

  for (let i = 0; i < gridDimensions.rows; i++) {
    for (let j = 0; j < gridDimensions.cols; j++) {
      dots.push(
        <div
          style={{
            width: `${dotSize}px`,
            height: `${dotSize}px`,
            borderRadius: "9999px",
            transition: "background-color 0s ease-in-out",
            backgroundColor: "transparent",
            display: "flex", // Add flexbox to center the inner div
    justifyContent: "center", // Center horizontally
    alignItems: "center",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#475569")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          onClick={handleDotClick} // Attach the click handler
          data-index={index}
          key={`${i}-${j}`}
        >
          <div
            className="dot-point"
            style={{
              height: `${dotSize *0.5}px`,
              width: `${dotSize*0.5}px`,
              borderRadius: "9999px",
              background: "linear-gradient(to bottom,rgb(92, 92, 92), #9CA3AF)",
              opacity: 0.5,
              transition: "background-color 0.2s ease-in-out",
            }}
            data-index={index}
          />
        </div>
      );
      index++;
    }
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${gridDimensions.cols}, 20px)`, // Set each column to the size of the dot
        gridTemplateRows: `repeat(${gridDimensions.rows}, 20px)`, // Set each row to the size of the dot
        width: "100%", // Ensure the grid spans the full width of the parent
        height: "100%", // Ensure the grid spans the full height of the parent
      }}
    >
      {dots}
    </div>
  );
};

export default WaterDropGrid;
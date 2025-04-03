import { animate, createSpring, utils} from 'animejs';

const WaterDropGrid = () => {
  return (
    <div style={{width: "100%", height: "100%"  }}>
      <DotGrid />
    </div>
  );
};

const GRID_WIDTH = 25;
const GRID_HEIGHT = 20;

const DotGrid = () => {
  const handleDotClick = (e) => {
    animate({
      targets: ".dot-point",
      scale: [
        { value: 1.35, easing: "easeOutSine", duration: 250 },
        { value: 1, easing: "easeInOutQuad", duration: 500 },
      ],
      translateY: [
        { value: -15, easing: "easeOutSine", duration: 250 },
        { value: 0, easing: "easeInOutQuad", duration: 500 },
      ],
      opacity: [
        { value: 1, easing: "easeOutSine", duration: 250 },
        { value: 0.5, easing: "easeInOutQuad", duration: 500 },
      ],
      delay: animate.stagger(100, {
        grid: [GRID_WIDTH, GRID_HEIGHT],
        from: e.target.dataset.index,
      }),
    });
  };

  const dots = [];
  let index = 0;

  for (let i = 0; i < GRID_WIDTH; i++) {
    for (let j = 0; j < GRID_HEIGHT; j++) {
      dots.push(
        <div
        style={{
          cursor: "crosshair", // Equivalent to cursor-crosshair
          borderRadius: "9999px", // Equivalent to rounded-full
          padding: "0.5rem", // Equivalent to p-2
          transition: "background-color 0.2s ease-in-out", // Equivalent to transition-colors
          backgroundColor: "transparent", // Default background color
        }}
          data-index={index}
          key={`${i}-${j}`}
        >
          <div
            style={{
              height: "0.5rem", // Equivalent to h-2
              width: "0.5rem", // Equivalent to w-2
              borderRadius: "9999px", // Equivalent to rounded-full
              background: "linear-gradient(to bottom, #374151, #9CA3AF)", // Equivalent to bg-gradient-to-b from-slate-700 to-slate-400
              opacity: 0.5, // Equivalent to opacity-50
              transition: "background-color 0.2s ease-in-out", // For hover effect
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
      className="test"
      onClick={handleDotClick}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)`,
        gridTemplateRows: `repeat(${GRID_HEIGHT}, 1fr)`,
        width: "100%",
        height: "100%",
      }}
    >
      {dots}
    </div>
  );
};

export default WaterDropGrid;
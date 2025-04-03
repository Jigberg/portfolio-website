import MouseTracker from "../components/MouseTracker";
import "./About.css";

const Example = () => {
  return (
    <div className="About">
      <header className="App-header">
        <MouseTracker offset={{ x: 10, y: 10 }}>I TRACK U 👀</MouseTracker>;
        <h1>Mouse Tracker Example</h1>
        <p>Move your mouse around to see the effect!</p>
      </header>
    </div>
  );
};

export default Example;

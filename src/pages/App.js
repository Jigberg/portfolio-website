import logo from "../logo.svg";
import planet from "../planetIMG.png";
import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, Stars } from "@react-three/drei";
import "./App.css";
import { useMemo } from "react";
import { SkeletonUtils } from "three-stdlib";

useGLTF.preload("/earth(5).glb");

function ModelEarth() {
  //https://skfb.ly/6SNB8
  const { scene } = useGLTF("/earth(5).glb");
  const ref = useRef();

  const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y = (ref.current.rotation.y + 0.0005) % (Math.PI * 2);
    }
  });

  return (
    <primitive
      ref={ref}
      object={clonedScene}
      scale={0.02}
      rotation={[0.0, 0, 0.2]}
      position={[-3.4, 1.4, -9]}
    />
  );
}

function ModelRat() {
  //https://skfb.ly/6Tswr
  const { scene } = useGLTF("/rat1.glb");
  const ref = useRef();

  const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y = (ref.current.rotation.y + 0.005) % (Math.PI * 2);
    }
  });

  return (
    <primitive
      ref={ref}
      object={clonedScene}
      scale={0.2}
      rotation={[0.7, 0, 0.2]}
      position={[2, 1.5, -5]}
    />
  );
}

function ModelShip() {
  //https://skfb.ly/JIPA
  const { scene } = useGLTF("/ship.glb");
  const ref = useRef();

  const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  useFrame(() => {
    if (ref.current) {
      ref.current.position.y = -1.0 + Math.sin(Date.now() * 0.001) * 0.03;
      //ref.current.rotation.y = (ref.current.rotation.y + 0.005) % (Math.PI * 2);
    }
  });

  return (
    <primitive
      ref={ref}
      object={clonedScene}
      scale={0.3}
      rotation={[0.4, 2, -0.4]}
      position={[2.4, -3.0, -5]}
    />
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="text-content">
          <img src={logo} className="App-logo" alt="logo" />

          <p>
            Edid <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </div>
        <div className="canvas-container">
          <Canvas
            camera={{ position: [0, 0, 0], fov: 75 }}
            gl={{ powerPreference: "high-performance" }}
          >
            <Suspense>
              <ModelEarth />
              <ModelRat />
              <ModelShip />
              <pointLight position={[1.4, 0, 1]} intensity={50} />
              <ambientLight intensity={0.1} />
              <Stars
                radius={100}
                depth={50}
                count={5000}
                factor={4}
                saturation={0}
                fade
              />
              {/* <Environment preset="dawn" background /> */}
            </Suspense>
          </Canvas>
        </div>
      </header>
    </div>
  );
}

export default App;

/*
<img
          src={planet}
          draggable={false}
          alt=""
          style={{
            position: "absolute",
            bottom: "0px",
            left: "0px",
            userSelect: "none",
            //width: "150px",
          }}
        />
*/

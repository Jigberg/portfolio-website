import logo from "../logo.svg";
import linkedinIcon from "../linkedinIcon.svg";
import githubIcon from "../githubIcon.svg";
import mailIcon from "../mailIcon.svg";
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
      ref.current.rotation.y =
        (ref.current.rotation.y + 0.0005) % (Math.PI * 2);
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
  const { scene } = useGLTF("/testX.glb");
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

function ModelRing() {
  //https://skfb.ly/JIPA
  const { scene } = useGLTF("/rockRing.glb");
  const ref = useRef();

  const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  useFrame(() => {
    if (ref.current) {
      //ref.current.position.y = -1.0 + Math.sin(Date.now() * 0.001) * 0.03;
      ref.current.rotation.y = (ref.current.rotation.y + 0.002) % (Math.PI * 2);
    }
  });

  return (
    <primitive
      ref={ref}
      object={clonedScene}
      scale={0.1}
      rotation={[0, 0, 0]}
      //rotation={[0.6, 1.3, -0.8]}
      position={[-3.4, -2.0, -6]}
    />
  );
}

function ModelRockPlanet() {
  //https://skfb.ly/JIPA
  const { scene } = useGLTF("/rockPlanet.glb");
  const ref = useRef();

  const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  useFrame(() => {
    if (ref.current) {
      //ref.current.position.y = -1.0 + Math.sin(Date.now() * 0.001) * 0.03;
      ref.current.rotation.y = (ref.current.rotation.y + 0.001) % (Math.PI * 2);
    }
  });

  return (
    <primitive
      ref={ref}
      object={clonedScene}
      scale={0.1}
      rotation={[0.0, 0.1, -0.4]}
      position={[-3.4, -2.0, -6]}
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
        <div className="bottom-content">
          <div className="contact-info">
            <a
              className="linkIcon"
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
            </a>
            <a
              className="linkIcon"
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={githubIcon} alt="GitHub" className="social-icon" />
            </a>
            <a
              className="linkIcon"
              href="https://mail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={mailIcon} alt="Mail" className="social-icon" />
            </a>
          </div>

          <div className="copyright">
            <p style={{ margin: 0 }}>
              © {new Date().getFullYear()} Lukas Jigberg
            </p>
          </div>
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
              <ModelRing />
              <ModelRockPlanet />
              <pointLight position={[1, 0, 1]} intensity={60} />
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

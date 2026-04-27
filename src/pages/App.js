import linkedinIcon from "../Subtract(1).svg";
import githubIcon from "../Subtract(2).svg";
import mailIcon from "../Subtract.svg";
import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, Stars } from "@react-three/drei";
import "./App.css";
import { useMemo } from "react";
import { SkeletonUtils } from "three-stdlib";
import { useEffect, useState } from "react";
import * as THREE from "three";

useGLTF.preload("/earth1.glb");

function ModelEarth() {
  const { scene } = useGLTF("/jorden.glb");
  const ref = useRef();

  const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y =
        (ref.current.rotation.y + 0.0001) % (Math.PI * 2);
    }
  });

  return (
    <group position={[-13, -13, -20]}>
      <primitive
        ref={ref}
        object={clonedScene}
        scale={0.15}
        rotation={[-0.0, 4.5, 0.0]}
      />

      {/* ✨ Glow */}
      <mesh scale={0.035}>
        <sphereGeometry args={[1, 32, 32]} />
        <shaderMaterial
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          transparent
          uniforms={{
            glowColor: { value: new THREE.Color("#4da6ff") },
          }}
          vertexShader={`
            varying vec3 vNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying vec3 vNormal;
            void main() {
              float intensity = pow(0.6 - dot(vNormal, vec3(0,0,1.0)), 4.0);
              gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
            }
          `}
        />
      </mesh>
    </group>
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
      position={[2, 1.5, -7]}
    />
  );
}

function ModelMoon() {
  //https://skfb.ly/6Tswr
  const { scene } = useGLTF("/MoonT1.glb");
  const ref = useRef();

  const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y =
        (ref.current.rotation.y - 0.0002) % (Math.PI * 2);
    }
  });

  return (
    <primitive
      ref={ref}
      object={clonedScene}
      scale={0.008}
      rotation={[-0.1, 0, 0]}
      position={[5, 1.5, -7]}
    />
  );
}

function ModelShuttle() {
  //https://skfb.ly/6Tswr
  const { scene } = useGLTF("/sat.glb");
  const ref = useRef();

  const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  useFrame(() => {
    if (ref.current) {
      ref.current.position.y = -1 + Math.sin(Date.now() * 0.001) * 0.03;
      //ref.current.rotation.y = (ref.current.rotation.y + 0.005) % (Math.PI * 2);
    }
  });

  return (
    <primitive
      ref={ref}
      object={clonedScene}
      scale={0.2}
      rotation={[-0.8, 0.5, 0.2]}
      position={[2.5, -1, -3.5]}
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
      ref.current.position.y = -1.5 + Math.sin(Date.now() * 0.001) * 0.03;
      //ref.current.rotation.y = (ref.current.rotation.y + 0.005) % (Math.PI * 2);
    }
  });

  return (
    <primitive
      ref={ref}
      object={clonedScene}
      scale={0.3}
      rotation={[0.4, 2, -0.4]}
      position={[3, -1.5, -5]}
    />
  );
}



function App() {
 const words = ["Software Developer", "UI Designer", "Engineer", "Certified Nerd"];

  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    let timeout;
    let interval;

    const typeWord = (word) => {
      let i = 0;

      interval = setInterval(() => {
        setDisplayed(word.slice(0, i + 1));
        i++;

        if (i === word.length) {
          clearInterval(interval);

          // pause before deleting
          timeout = setTimeout(() => deleteWord(word), 3000);
        }
      }, 120); // typing speed
    };

    const deleteWord = (word) => {
      let i = word.length;

      interval = setInterval(() => {
        setDisplayed(word.slice(0, i - 1));
        i--;

        if (i === 0) {
          clearInterval(interval);

          const nextIndex = (wordIndex + 1) % words.length;
          setWordIndex(nextIndex);

          timeout = setTimeout(() => typeWord(words[nextIndex]), 400);
        }
      }, 60); // delete speed (faster than typing)
    };

    // initial delay before first word starts
    timeout = setTimeout(() => {
      typeWord(words[wordIndex]);
    }, 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [wordIndex]);

  return (
    <div className="App">
      <div className="text-content">
        <div className="welcome">
          <h1>
            Welcome
            <span className="font-main">
              <span className="underscore">_</span>
            </span>
          </h1>
        </div>
        <div className="description">
          <p>{">"} i'm Lukas</p>
          <p>
            {">"} <span style={{ color: "#4288c2" }}>Developer</span>{" "}
            <span style={{ color: "#b34cb3" }}>UI Designer</span>{" "}
            <span style={{ color: "#d3934a" }}>Engineer</span>
          </p>
        </div>
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
          camera={{ position: [0, 0, 0], fov: 90 }}
          gl={{ powerPreference: "high-performance" }}
        >
          <color attach="background" args={["#000000"]} />
          <fog attach="fog" args={["#91bfdf", 1, 50]} />
          <Suspense>
            {/* <CameraLook /> */}
            <ModelEarth />
            <ModelRat />
            <ModelShip />
            <ModelMoon />
            <directionalLight
              position={[2, 1.5, 5]}
              intensity={2}
              color={"#c3c8e6"}
            />

            <ambientLight intensity={0.1} />
            <Stars
              radius={300}
              depth={300}
              count={10000}
              factor={5}
              saturation={1}
              fade
            />
            {/* <Environment preset="dawn" background /> */}
          </Suspense>
        </Canvas>
      </div>
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

        <span className="font-alt">{text}</span>
*/

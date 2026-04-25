import logo from "../logo.svg";
import linkedinIcon from "../Subtract(1).svg";
import githubIcon from "../Subtract(2).svg";
import mailIcon from "../Subtract.svg";
import planet from "../planetIMG.png";
import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, Stars } from "@react-three/drei";
import "./App.css";
import { useMemo } from "react";
import { SkeletonUtils } from "three-stdlib";
import { useEffect, useState } from "react";

useGLTF.preload("/earth(5).glb");

function ModelEarth() {
  //https://skfb.ly/6SNB8
  const { scene } = useGLTF("/earth(5).glb");
  const ref = useRef();

  const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  {
    /*useEffect(() => {
  clonedScene.traverse((child) => {
    if (child.isMesh && child.material) {
      child.material.onBeforeCompile = (shader) => {
        shader.fragmentShader = shader.fragmentShader.replace(
          "#include <dithering_fragment>",
          `
          #include <dithering_fragment>

          float depth = gl_FragCoord.z / gl_FragCoord.w;
          float fade = smoothstep(10.0, 40.0, depth);

          vec3 gray = vec3(dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114)));
          gl_FragColor.rgb = mix(gl_FragColor.rgb, gray, fade * 0.7);
          gl_FragColor.rgb *= (1.0 - fade * 0.3);
          `
        );
      };
    }
  });
}, [clonedScene]);`*/
  }

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
      position={[-11, 6, -20]}
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
      position={[2, 1.5, -7]}
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
  const [text, setText] = useState("Welcome");
  const [altFont, setAltFont] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // trigger just before the pop
      setTimeout(() => {
        setAltFont(true);

        // revert back quickly after pop
        setTimeout(() => setAltFont(false), 200);
      }, 7680); // 96% of 8000ms
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const hasVisited = localStorage.getItem("visited");

    const responses = [
      ", good to see you!",
      ", glad you're here!",
      ", long time no see!",
      ", glad you're back!",
      ", hey again!",
    ];

    if (hasVisited) {
      const random = responses[Math.floor(Math.random() * responses.length)];

      setText(random);
    } else {
      setText("");
      localStorage.setItem("visited", "true");
    }
  }, []);

  const words = ["Welcome", "Developer", "UI Designer", "Creator"];

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
    }, 120); // delete speed (faster than typing)
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
      <header className="App-header">
        <div className="text-content">
          <div className="welcome">
            <h1>
              <span className="font-main">
                {displayed}
                <span className="underscore">_</span>
              </span>
            </h1>
          </div>
          <div className="description">
            <p style={{ color: "#4288c2" }}>Developer</p>
            <p style={{ color: "#b34cb3" }}>UI Designer</p>
            <p style={{ color: "#be833f" }}></p>
          </div>
          <div className="buttons">
            <p>JavaScript</p>
            <p>React</p>
            <p>Node.js</p>
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
            {/* <color attach="background" args={["#adadad59"]} /> */}
            <fog attach="fog" args={["#03040c", 10, 27]} />
            <Suspense>
              <ModelEarth />
              <ModelRat />
              <ModelShip />
              <ModelRing />
              <ModelRockPlanet />
              <directionalLight
                position={[3, 1, 5]}
                intensity={1}
                color={"#f0e5c3"}
              />

              <ambientLight intensity={0.15} />
              <Stars
                radius={350}
                depth={20}
                count={3000}
                factor={5}
                saturation={1}
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

        <span className="font-alt">{text}</span>
*/

import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TextureLoader } from "three";
import { useRef } from "react";
import * as THREE from "three";
import "../styles/home/planet.css";

const RotatingPlanet = () => {
  const texture = useLoader(TextureLoader, "/venus-surface.jpg");
  const planetRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.0008;
    }
  });

  return (
    <mesh ref={planetRef} rotation={[0.4, 0.3, 0.1]}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const PlanetAnimation = () => {
  return (
    <div className="planet">
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
        <ambientLight intensity={2} />
        <pointLight position={[5, 5, 5]} />
        <OrbitControls />
        <RotatingPlanet />
      </Canvas>
    </div>
  );
};

export default PlanetAnimation;

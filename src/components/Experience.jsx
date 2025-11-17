// import { Environment, Stars } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";
// import { useRef } from "react";
// import { Avatar } from "./Avatar";

// export const Experience = ({ scriptCommand }) => {
//   const starsRef = useRef();

//   // Rotate stars slowly
//   useFrame(() => {
//     if (starsRef.current) {
//       starsRef.current.rotation.y += 0.0002; // Adjust speed here
//     }
//   });

//   return (
//     <>
//       <ambientLight intensity={0.5} />
//       <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      
//       {/* Rotating stars */}
//       <Stars
//         ref={starsRef}
//         radius={100}
//         depth={50}
//         count={5000}
//         factor={3}
//         saturation={0}
//         fade
//       />

//       <Environment preset="night" />
      
//       <Avatar position={[0, -3.39, 7.2]} scale={2} scriptCommand={scriptCommand} />
//     </>
//   );
// };




import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import { Avatar } from "./Avatar"; // make sure this is the particle version

export const Experience = ({ scriptCommand }) => {
  const starsRef = useRef();
  const hollowRadius = 30;

  // Shooting stars positions outside hollow
  const starPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 9000; i++) {
      let x, y;
      do {
        x = (Math.random() - 0.5) * 200;
        y = (Math.random() - 0.5) * 200;
      } while (Math.sqrt(x * x + y * y) < hollowRadius);
      const z = (Math.random() - 0.5) * 200;
      positions.push(x, y, z);
    }
    return new Float32Array(positions);
  }, []);

  useFrame(() => {
    // Move shooting stars
    if (starsRef.current) {
      const positions = starsRef.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] += 0.5;
        if (positions[i + 2] > 100) positions[i + 2] = -100;
      }
      starsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={5} castShadow />

      {/* Shooting stars */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starPositions.length / 3}
            array={starPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#ffffff" size={0.8} />
      </points>

      {/* Particle Avatar */}
      <Avatar position={[0, -3.40, 7.2]} scale={2} scriptCommand={scriptCommand}/>
    </>
  );
};
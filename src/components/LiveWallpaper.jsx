import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleNetwork = ({ theme }) => {
  const pointsRef = useRef();
  const { viewport, mouse } = useThree();
  
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Create optimized particle geometry
  const particleCount = 800; // Increased for denser look
  
  const [positions, originalPositions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const origPos = new Float32Array(particleCount * 3);
    const cols = new Float32Array(particleCount * 3);
    
    // Theme colors: Yellow (#eab308) vs Maroon (#800000)
    const color = new THREE.Color(theme === 'dark' ? '#eab308' : '#800000');
    
    for (let i = 0; i < particleCount; i++) {
      // Scatter in a wide volume
      const x = (Math.random() - 0.5) * 40;
      const y = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 20;
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      
      origPos[i * 3] = x;
      origPos[i * 3 + 1] = y;
      origPos[i * 3 + 2] = z;
      
      color.toArray(cols, i * 3);
    }
    
    return [pos, origPos, cols];
  }, [theme]);

  // Animate the particles
  useFrame(() => {
    if (!pointsRef.current) return;
    
    // Slow rotation
    pointsRef.current.rotation.y += 0.001;
    pointsRef.current.rotation.x += 0.0005;
    
    // Mouse Interaction: Repel particles
    const positions = pointsRef.current.geometry.attributes.position.array;
    
    // Convert normalized mouse coordinates to world coordinates roughly at z=0
    const mouseX = (mousePos.x * viewport.width) / 2;
    const mouseY = (mousePos.y * viewport.height) / 2;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Get current world position of this particle
      // We must account for the mesh rotation to properly calculate distance
      const vector = new THREE.Vector3(originalPositions[i3], originalPositions[i3+1], originalPositions[i3+2]);
      vector.applyEuler(pointsRef.current.rotation);
      
      const dx = vector.x - mouseX;
      const dy = vector.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      const interactionRadius = 8.0; // Increased radius
      const repelStrength = 4.0;     // Increased strength

      if (dist < interactionRadius) {
        // Push particle away
        const force = (interactionRadius - dist) / interactionRadius;
        vector.x += (dx / dist) * force * repelStrength;
        vector.y += (dy / dist) * force * repelStrength;
      }
      
      // Interpolate back to local position (undo rotation logic to store correctly)
      const targetLocal = vector.clone().applyEuler(new THREE.Euler(-pointsRef.current.rotation.x, -pointsRef.current.rotation.y, -pointsRef.current.rotation.z));
      
      positions[i3] += (targetLocal.x - positions[i3]) * 0.1;
      positions[i3+1] += (targetLocal.y - positions[i3+1]) * 0.1;
      positions[i3+2] += (targetLocal.z - positions[i3+2]) * 0.1;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation={true}
      />
    </points>
  );
};

const LiveWallpaper = ({ theme }) => {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: -1 }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <ParticleNetwork theme={theme} />
        <fog attach="fog" args={[theme === 'dark' ? '#050505' : '#f8fafc', 5, 25]} />
      </Canvas>
    </div>
  );
};

export default LiveWallpaper;

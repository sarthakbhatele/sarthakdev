'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, Stage, OrbitControls } from '@react-three/drei'

function KingMesh() {
  const { scene } = useGLTF('/models/king.glb')
  return <primitive object={scene} scale={2.8} position={[0, -0.8, 0]} />
}

export default function KingScene() {
  return (
    <Canvas camera={{ position: [0, 1.5, 5], fov: 36 }}>
      <Suspense fallback={null}>
        <Stage
          environment="studio"
          intensity={0.8}
          shadows="contact"
        >
          <KingMesh />
        </Stage>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.8}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Suspense>
    </Canvas>
  )
}

useGLTF.preload('/models/king.glb')

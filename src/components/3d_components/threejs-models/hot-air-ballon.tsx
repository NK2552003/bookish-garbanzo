"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

interface HotAirBalloonProps {
  scrollProgress: number
  rotationSpeed?: number
  onPartPositionsUpdate?: (positions: PartPosition[]) => void
}

interface PartPosition {
  id: string
  position: THREE.Vector3
  screenPosition: { x: number; y: number }
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function easeOutElastic(t: number): number {
  const c4 = (2 * Math.PI) / 3
  return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1
}

function easeInOutQuart(t: number): number {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2
}

function springAnimation(current: number, target: number, velocity: number, stiffness = 0.1, damping = 0.8) {
  const force = (target - current) * stiffness
  velocity = (velocity + force) * damping
  const newPosition = current + velocity
  return { position: newPosition, velocity }
}

function Cloud({ position, scale = 1, opacity = 0.8, scrollProgress }: {
  position: [number, number, number];
  scale?: number;
  opacity?: number;
  scrollProgress: number;
}) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return

    const time = state.clock.elapsedTime

    let cloudOpacity = 0
    if (scrollProgress > 0.66) {
      const fadeProgress = (scrollProgress - 0.66) / 0.34
      cloudOpacity = easeInOutCubic(fadeProgress) * opacity
    }

    groupRef.current.children.forEach((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const material = child.material as THREE.MeshBasicMaterial
        material.opacity = cloudOpacity * (material.userData?.baseOpacity || 1)
      }
    })

    groupRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.2
    groupRef.current.position.x = position[0] + Math.cos(time * 0.3) * 0.1
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.2, 8, 6]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0} userData={{ baseOpacity: 1 }} />
      </mesh>
      <mesh position={[-0.8, -0.2, 0.3]}>
        <sphereGeometry args={[0.9, 8, 6]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0} userData={{ baseOpacity: 0.8 }} />
      </mesh>
      <mesh position={[0.7, -0.1, -0.2]}>
        <sphereGeometry args={[0.8, 8, 6]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0} userData={{ baseOpacity: 0.9 }} />
      </mesh>
      <mesh position={[0.3, 0.6, 0.1]}>
        <sphereGeometry args={[0.7, 8, 6]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0} userData={{ baseOpacity: 0.7 }} />
      </mesh>
      <mesh position={[-0.4, 0.4, -0.3]}>
        <sphereGeometry args={[0.6, 8, 6]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0} userData={{ baseOpacity: 0.6 }} />
      </mesh>
    </group>
  )
}

function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={[0.1, 0.1, 1.5, 8]} />
        <meshBasicMaterial color="#795548" wireframe transparent opacity={0.6} />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <coneGeometry args={[0.8, 2, 8]} />
        <meshBasicMaterial color="#4CAF50" wireframe transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

function Mountain({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <mesh position={position} scale={[scale, scale * 0.7, scale]}>
      <coneGeometry args={[2, 4, 3]} />
      <meshBasicMaterial color="#9E9E9E" wireframe transparent opacity={0.4} />
    </mesh>
  )
}


function BalloonEnvelope({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const springState = useRef({
    position: { x: 0, y: 0, z: 0 },
    velocity: { x: 0, y: 0, z: 0 }
  })
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null)

  useEffect(() => {
    const envelopeGeometry = new THREE.SphereGeometry(2.5, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.8)
    const positions = envelopeGeometry.attributes.position
    for (let i = 0; i < positions.count; i++) {
      const y = positions.getY(i)
      const normalizedY = (y + 2) / 4.5
      const factor = 0.7 + normalizedY * 0.6
      positions.setX(i, positions.getX(i) * factor)
      positions.setZ(i, positions.getZ(i) * factor)
    }
    positions.needsUpdate = true
    envelopeGeometry.computeVertexNormals()
    setGeometry(envelopeGeometry)
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return

    const animationTime = state.clock.elapsedTime

    let inflationProgress = 0
    if (scrollProgress <= 0.33) {
      inflationProgress = easeOutElastic(scrollProgress / 0.33)
    } else {
      inflationProgress = 1
    }

    let liftProgress = 0
    if (scrollProgress > 0.33 && scrollProgress <= 0.66) {
      liftProgress = easeInOutCubic((scrollProgress - 0.33) / 0.33)
    } else if (scrollProgress > 0.66) {
      liftProgress = 1
    }

    let freeFloatProgress = 0
    if (scrollProgress > 0.66) {
      freeFloatProgress = easeInOutQuart((scrollProgress - 0.66) / 0.34)
    }

    const balloonScale = 0.3 + (inflationProgress * 0.7)
    groupRef.current.scale.setScalar(balloonScale)

    const baseY = -2.5
    const tetheredY = 1
    const freeY = 2

    let targetY = baseY
    if (liftProgress > 0) {
      targetY = THREE.MathUtils.lerp(baseY, tetheredY, liftProgress)
    }
    if (freeFloatProgress > 0) {
      targetY = THREE.MathUtils.lerp(tetheredY, freeY, freeFloatProgress)
    }

    const springY = springAnimation(groupRef.current.position.y, targetY, springState.current.velocity.y, 0.08, 0.85)
    groupRef.current.position.y = springY.position
    springState.current.velocity.y = springY.velocity

    if (freeFloatProgress > 0) {
      groupRef.current.position.y += Math.sin(animationTime * 1.2) * 0.2 * freeFloatProgress
      groupRef.current.position.x = Math.cos(animationTime * 0.8) * 0.15 * freeFloatProgress
      groupRef.current.rotation.z = Math.sin(animationTime * 0.6) * 0.03 * freeFloatProgress
    }

    if (liftProgress > 0 && freeFloatProgress === 0) {
      groupRef.current.position.x = Math.sin(animationTime * 1.5) * 0.08 * liftProgress
      groupRef.current.rotation.z = Math.sin(animationTime * 2) * 0.02 * liftProgress
    }
  })

  return (
    <group ref={groupRef} userData={{ part: "envelope" }}>
      <mesh>
        {geometry && <primitive object={geometry} attach="geometry" />}
        <meshBasicMaterial color="#ff6b6b" wireframe transparent opacity={0.7} />
      </mesh>
    </group>
  )
}

function Basket({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const springState = useRef({
    position: { x: 0, y: 0, z: 0 },
    velocity: { x: 0, y: 0, z: 0 }
  })

  useFrame((state) => {
    if (!meshRef.current) return

    const animationTime = state.clock.elapsedTime

    let liftProgress = 0
    if (scrollProgress > 0.33 && scrollProgress <= 0.66) {
      liftProgress = easeInOutCubic((scrollProgress - 0.33) / 0.33)
    } else if (scrollProgress > 0.66) {
      liftProgress = 1
    }

    let freeFloatProgress = 0
    if (scrollProgress > 0.66) {
      freeFloatProgress = easeInOutQuart((scrollProgress - 0.66) / 0.34)
    }

    const baseY = -5
    const tetheredY = -2.5
    const freeY = -1.5

    let targetY = baseY
    if (liftProgress > 0) {
      targetY = THREE.MathUtils.lerp(baseY, tetheredY, liftProgress)
    }
    if (freeFloatProgress > 0) {
      targetY = THREE.MathUtils.lerp(tetheredY, freeY, freeFloatProgress)
    }

    const springY = springAnimation(meshRef.current.position.y, targetY, springState.current.velocity.y, 0.08, 0.82)
    meshRef.current.position.y = springY.position
    springState.current.velocity.y = springY.velocity

    if (freeFloatProgress > 0) {
      meshRef.current.position.y += Math.sin(animationTime * 1.2) * 0.1 * freeFloatProgress
      meshRef.current.position.x = Math.cos(animationTime * 0.8) * 0.08 * freeFloatProgress
      meshRef.current.rotation.x = Math.sin(animationTime * 1.5) * 0.03 * freeFloatProgress
    }

    if (liftProgress > 0 && freeFloatProgress === 0) {
      meshRef.current.position.x = Math.sin(animationTime * 1.5) * 0.06 * liftProgress
      meshRef.current.rotation.x = Math.sin(animationTime * 2) * 0.02 * liftProgress
    }
  })

  return (
    <group ref={meshRef} userData={{ part: "basket" }}>
      <mesh>
        <cylinderGeometry args={[0.7, 0.7, 1, 16, 1, true]} />
        <meshBasicMaterial color="#8b4513" wireframe transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <torusGeometry args={[0.75, 0.05, 8, 16]} />
        <meshBasicMaterial color="#654321" wireframe transparent opacity={0.7} />
      </mesh>
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const x = Math.cos(angle) * 0.7
        const z = Math.sin(angle) * 0.7
        return (
          <mesh key={i} position={[x, 0, z]} rotation={[0, angle, 0]}>
            <boxGeometry args={[0.04, 1, 0.04]} />
            <meshBasicMaterial color="#a0522d" wireframe transparent opacity={0.6} />
          </mesh>
        )
      })}
      {Array.from({ length: 4 }, (_, i) => (
        <mesh key={i} position={[0, i * 0.25 - 0.375, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <boxGeometry args={[1.5, 0.04, 0.04]} />
          <meshBasicMaterial color="#a0522d" wireframe transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  )
}

function BurnerSystem({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const flameRefs = useRef<THREE.Mesh[]>([])
  const springState = useRef({
    position: { x: 0, y: 0, z: 0 },
    velocity: { x: 0, y: 0, z: 0 }
  })

  useFrame((state) => {
    if (!groupRef.current) return

    const animationTime = state.clock.elapsedTime

    let liftProgress = 0
    if (scrollProgress > 0.33 && scrollProgress <= 0.66) {
      liftProgress = easeInOutCubic((scrollProgress - 0.33) / 0.33)
    } else if (scrollProgress > 0.66) {
      liftProgress = 1
    }

    let freeFloatProgress = 0
    if (scrollProgress > 0.66) {
      freeFloatProgress = easeInOutQuart((scrollProgress - 0.66) / 0.34)
    }

    const baseY = -3.5
    const tetheredY = -0.5
    const freeY = 0.5

    let targetY = baseY
    if (liftProgress > 0) {
      targetY = THREE.MathUtils.lerp(baseY, tetheredY, liftProgress)
    }
    if (freeFloatProgress > 0) {
      targetY = THREE.MathUtils.lerp(tetheredY, freeY, freeFloatProgress)
    }

    const springY = springAnimation(groupRef.current.position.y, targetY, springState.current.velocity.y, 0.1, 0.88)
    groupRef.current.position.y = springY.position
    springState.current.velocity.y = springY.velocity

    const flameIntensity = scrollProgress > 0.1 ? 1 : 0
    flameRefs.current.forEach((flame, index) => {
      if (flame && flame.material) {
        const offset = index * 0.3
        flame.scale.y = (0.5 + Math.sin(animationTime * 6 + offset) * 0.4) * flameIntensity
        flame.scale.x = (0.8 + Math.cos(animationTime * 8 + offset) * 0.2) * flameIntensity

        const baseOpacity = flameIntensity * 0.8
        const material = flame.material as THREE.Material
        if ('opacity' in material) {
          material.opacity = baseOpacity + Math.sin(animationTime * 10 + offset) * 0.3 * flameIntensity
        }
      }
    })

    if (freeFloatProgress > 0) {
      groupRef.current.position.y += Math.sin(animationTime * 1.2) * 0.08 * freeFloatProgress
      groupRef.current.position.x = Math.cos(animationTime * 0.8) * 0.04 * freeFloatProgress
    }
  })

  return (
    <group ref={groupRef} userData={{ part: "burner" }}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.3, 0.6, 8]} />
        <meshBasicMaterial color="#333333" wireframe transparent opacity={0.8} />
      </mesh>
      <mesh position={[-0.8, -0.5, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 1.2, 8]} />
        <meshBasicMaterial color="#444444" wireframe transparent opacity={0.7} />
      </mesh>
      <mesh position={[0.8, -0.5, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 1.2, 8]} />
        <meshBasicMaterial color="#444444" wireframe transparent opacity={0.7} />
      </mesh>
      {Array.from({ length: 4 }, (_, i) => {
        const angle = (i / 4) * Math.PI * 2
        const x = Math.cos(angle) * 0.25
        const z = Math.sin(angle) * 0.25
        return (
          <mesh key={i} position={[x, -0.1, z]}>
            <cylinderGeometry args={[0.05, 0.08, 0.2, 6]} />
            <meshBasicMaterial color="#666666" wireframe transparent opacity={0.7} />
          </mesh>
        )
      })}
      <mesh ref={(el) => el && (flameRefs.current[0] = el)} position={[0, 0.8, 0]}>
        <coneGeometry args={[0.6, 1.5, 8]} />
        <meshBasicMaterial color="#ff4400" wireframe transparent opacity={0.8} />
      </mesh>
      {Array.from({ length: 4 }, (_, i) => {
        const angle = (i / 4) * Math.PI * 2
        const x = Math.cos(angle) * 0.25
        const z = Math.sin(angle) * 0.25
        return (
          <mesh
            key={i}
            ref={(el) => el && (flameRefs.current[i + 1] = el)}
            position={[x, 0.4, z]}
          >
            <coneGeometry args={[0.15, 0.6, 6]} />
            <meshBasicMaterial color="#ff6600" wireframe transparent opacity={0.7} />
          </mesh>
        )
      })}
    </group>
  )
}

function SupportLines({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const lineRefs = useRef<THREE.Mesh[]>([])

  useFrame((state) => {
    if (!groupRef.current) return

    const animationTime = state.clock.elapsedTime

    // Calculate basket top position (same as Basket component)
    let liftProgress = 0
    if (scrollProgress > 0.33 && scrollProgress <= 0.66) {
      liftProgress = easeInOutCubic((scrollProgress - 0.33) / 0.33)
    } else if (scrollProgress > 0.66) {
      liftProgress = 1
    }

    let freeFloatProgress = 0
    if (scrollProgress > 0.66) {
      freeFloatProgress = easeInOutQuart((scrollProgress - 0.66) / 0.34)
    }

    const baseBasketY = -5
    const tetheredBasketY = -2.5
    const freeBasketY = -1.5

    let basketY = baseBasketY
    if (liftProgress > 0) {
      basketY = THREE.MathUtils.lerp(baseBasketY, tetheredBasketY, liftProgress)
    }
    if (freeFloatProgress > 0) {
      basketY = THREE.MathUtils.lerp(tetheredBasketY, freeBasketY, freeFloatProgress)
    }
    
    // Basket top is at basketY + 0.5 (since basket height is 1)
    const basketTopY = basketY + 0.5

    // Calculate envelope bottom position (same as BalloonEnvelope component)
    let inflationProgress = 0
    if (scrollProgress <= 0.33) {
      inflationProgress = easeOutElastic(scrollProgress / 0.33)
    } else {
      inflationProgress = 1
    }
    
    const balloonScale = 0.3 + (inflationProgress * 0.7)
    
    const baseEnvelopeY = -2.5
    const tetheredEnvelopeY = 1
    const freeEnvelopeY = 2

    let envelopeY = baseEnvelopeY
    if (liftProgress > 0) {
      envelopeY = THREE.MathUtils.lerp(baseEnvelopeY, tetheredEnvelopeY, liftProgress)
    }
    if (freeFloatProgress > 0) {
      envelopeY = THREE.MathUtils.lerp(tetheredEnvelopeY, freeEnvelopeY, freeFloatProgress)
    }
    
    // Envelope bottom is at envelopeY - (2.5 * balloonScale * 0.7)
    const envelopeBottomY = envelopeY - (2.5 * balloonScale * 0.7)
    
    // Calculate the distance between basket top and envelope bottom
    const distance = envelopeBottomY - basketTopY
    
    // Position the entire group at the basket top
    groupRef.current.position.y = basketTopY

    // ✅ Add floating animation for free float phase
    if (freeFloatProgress > 0) {
      const floatAmplitude = freeFloatProgress
      groupRef.current.position.y += Math.sin(animationTime * 1.2) * 0.3 * floatAmplitude
      groupRef.current.position.x = Math.cos(animationTime * 0.8) * 0.15 * floatAmplitude
      groupRef.current.rotation.z = Math.sin(animationTime * 0.6) * 0.03 * floatAmplitude
    }

    // Update each line's position and scale
    lineRefs.current.forEach((line, index) => {
      if (!line) return
      
      const angle = (index / 8) * Math.PI * 2
      const x = Math.cos(angle) * 0.8
      const z = Math.sin(angle) * 0.8
      
      // Position at basket top circle
      line.position.set(x, 0, z)
      
      // Scale to reach envelope bottom
      line.scale.y = Math.max(0.1, distance / 2.0)
      
      // Apply wobbling animations
      if (liftProgress > 0) {
        line.rotation.z = Math.sin(animationTime * 1.5 + index * 0.3) * 0.02 * liftProgress
      }
      if (freeFloatProgress > 0) {
        // Extra flutter on lines during free float
        line.rotation.z += Math.sin(animationTime * 1.2 + index * 0.5) * 0.03 * freeFloatProgress
      }
    })
  })

  return (
    <group ref={groupRef} userData={{ part: "support_lines" }}>
      {Array.from({ length: 8 }, (_, i) => (
        <mesh 
          key={i} 
          ref={(el) => el && (lineRefs.current[i] = el)}
          position={[0, 0, 0]}
        >
          <cylinderGeometry args={[0.02, 0.02, 3.0, 3]} />
          <meshBasicMaterial color="#666666" wireframe transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  )
}

function TetherRope({ scrollProgress }: { scrollProgress: number }) {
  const ropeRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (!ropeRef.current) return

    let ropeOpacity = 0
    let ropeLength = 3
    let positionY = -4.5

    if (scrollProgress > 0.33 && scrollProgress <= 0.66) {
      const tetheredProgress = (scrollProgress - 0.33) / 0.33
      ropeOpacity = 0.8 * tetheredProgress

      const balloonY = -2.5 + tetheredProgress * 3.5
      ropeLength = balloonY - (-5)
      positionY = (-5 + balloonY) / 2
    }

    if (ropeRef.current) {
      ropeRef.current.position.y = positionY
      ropeRef.current.scale.y = ropeLength / 3
      if (ropeRef.current.material && 'opacity' in ropeRef.current.material) {
        ropeRef.current.material.opacity = ropeOpacity
      }
    }
  })

  return (
    <mesh ref={ropeRef} position={[0, -4.5, 0]}>
      <cylinderGeometry args={[0.02, 0.02, 3, 8]} />
      <meshBasicMaterial color="#8b4513" wireframe transparent opacity={0} />
    </mesh>
  )
}

function HotAirBalloon({ scrollProgress, rotationSpeed = 0.002, onPartPositionsUpdate }: HotAirBalloonProps) {
  const groupRef = useRef<THREE.Group>(null)
  const { camera } = useThree()

  const updatePartPositions = () => {
    if (!groupRef.current || !onPartPositionsUpdate) return

    const positions: PartPosition[] = []
    const tempVector = new THREE.Vector3()

    const partMappings = [
      { part: "envelope", id: "balloon" },
      { part: "basket", id: "basket" },
      { part: "support_lines", id: "rope1" },
      { part: "burner", id: "rope2" }
    ]

    groupRef.current.traverse((child) => {
      const userData = child.userData
      if (userData && userData.part) {
        const mapping = partMappings.find(m => m.part === userData.part)
        if (mapping) {
          child.getWorldPosition(tempVector)
          tempVector.project(camera)

          positions.push({
            id: mapping.id,
            position: tempVector.clone(),
            screenPosition: {
              x: (tempVector.x * 0.5 + 0.5) * window.innerWidth,
              y: (-tempVector.y * 0.5 + 0.5) * window.innerHeight,
            },
          })
        }
      }
    })

    onPartPositionsUpdate(positions)
  }

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += rotationSpeed
    updatePartPositions()
  })

  return (
    <group ref={groupRef}>
      <Tree position={[-10, -5, 5]} />
      <Tree position={[-8, -5, -3]} />
      <Tree position={[12, -5, 8]} />
      <Tree position={[5, -5, -7]} />
      <Mountain position={[-20, -5, -10]} scale={1.5} />
      <Mountain position={[-15, -5, -15]} scale={1.2} />
      <Mountain position={[-25, -5, -5]} scale={1.8} />
      <BalloonEnvelope scrollProgress={scrollProgress} />
      <Basket scrollProgress={scrollProgress} />
      <BurnerSystem scrollProgress={scrollProgress} />
      <SupportLines scrollProgress={scrollProgress} />
      <TetherRope scrollProgress={scrollProgress} />
      <Cloud position={[-6, 3, -2]} scale={1.2} opacity={0.6} scrollProgress={scrollProgress} />
      <Cloud position={[7, 2.5, -3]} scale={1.0} opacity={0.5} scrollProgress={scrollProgress} />
      <Cloud position={[2, 4, 4]} scale={0.8} opacity={0.4} scrollProgress={scrollProgress} />
    </group>
  )
}

function ResponsiveCamera() {
  const { camera, viewport } = useThree()

  useEffect(() => {
    const isMobile = viewport.width < 4
    const isTablet = viewport.width >= 4 && viewport.width < 8

    if (isMobile) {
      camera.position.set(8, 0, 8)
      if (camera instanceof THREE.PerspectiveCamera) {
        camera.fov = 70
        camera.updateProjectionMatrix()
      }
    } else if (isTablet) {
      camera.position.set(10, 1, 10)
      if (camera instanceof THREE.PerspectiveCamera) {
        camera.fov = 65
        camera.updateProjectionMatrix()
      }
    } else {
      camera.position.set(12, 2, 12)
      if (camera instanceof THREE.PerspectiveCamera) {
        camera.fov = 60
        camera.updateProjectionMatrix()
      }
    }
    camera.lookAt(0, -1, 0)
  }, [camera, viewport.width])

  return null
}

function Scene({ scrollProgress, rotationSpeed, onPartPositionsUpdate }: HotAirBalloonProps) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} color="#ffeeaa" />
      <directionalLight position={[-5, -5, -5]} intensity={0.4} color="#aaccff" />
      <ResponsiveCamera />
      <HotAirBalloon
        scrollProgress={scrollProgress}
        rotationSpeed={rotationSpeed}
        onPartPositionsUpdate={onPartPositionsUpdate}
      />
    </>
  )
}

export default function HotAirBalloonComponent({ scrollProgress, rotationSpeed = 0.002, onPartPositionsUpdate }: HotAirBalloonProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-full h-full bg-transparent" />
  }

  return (
   <Canvas
  camera={{
    position: [12, 2, 12],
    fov: 60,
  }}
  gl={{
    powerPreference: "high-performance",
    antialias: false,
    alpha: true,
    depth: true,
    stencil: false,
    failIfMajorPerformanceCaveat: true,
    preserveDrawingBuffer: false,
  }}
  style={{ width: "100%", height: "100%" }}
  dpr={[1, 2]}
  resize={{ scroll: false, debounce: { scroll: 50, resize: 100 } }}
>
  {/* Grid positioned slightly below the surface */}
  <gridHelper args={[50, 50, "#555", "#222"]} position={[0, -8, 0]} />

  <Scene
    scrollProgress={scrollProgress}
    rotationSpeed={rotationSpeed}
    onPartPositionsUpdate={onPartPositionsUpdate}
  />
</Canvas>

  )
}
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/models/PowerBox.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[0, 0.134, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={51.03}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.PowerBox_1.geometry}
          material={materials.metal_shade1}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.PowerBox_2.geometry}
          material={materials.metal_shade2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.PowerBox_3.geometry}
          material={materials.yellow_sticker}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.PowerBox_4.geometry}
          material={materials.black_sticker}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/models/PowerBox.glb')
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/models/WaterBottle.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={198.943}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.WaterBottle_3_1.geometry}
          material={materials.Plastic}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.WaterBottle_3_2.geometry}
          material={materials.Grey}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.WaterBottle_3_3.geometry}
          material={materials.Red}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/models/WaterBottle.glb')
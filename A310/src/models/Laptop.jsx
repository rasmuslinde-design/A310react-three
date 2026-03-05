import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/models/Laptop.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['LapTop_Cube002-Mesh'].geometry}
        material={materials.DarkGray}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['LapTop_Cube002-Mesh_1'].geometry}
        material={materials.lighterGray}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['LapTop_Cube002-Mesh_2'].geometry}
        material={materials.Gray2}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['LapTop_Cube002-Mesh_3'].geometry}
        material={materials.Screen}
      />
    </group>
  )
}

useGLTF.preload('/models/Laptop.glb')
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/models/FluorescentLight.glb')
  return (
    <group {...props} dispose={null}>
      <group scale={100}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Fluorescent_Light_1.geometry}
          material={materials.mat17}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Fluorescent_Light_2.geometry}
          material={materials.mat16}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Fluorescent_Light_3.geometry}
          material={materials.mat2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Fluorescent_Light_4.geometry}
          material={materials.mat24}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/models/FluorescentLight.glb')

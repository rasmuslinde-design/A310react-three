import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/models/SquareWindow.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube013_Cube017.geometry}
        material={materials['Material.003']}
      />
    </group>
  )
}

useGLTF.preload('/models/SquareWindow.glb')
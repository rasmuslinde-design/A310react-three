import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/models/Computermouse.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ComputerMouse_mesh.geometry}
        material={materials.ComputerMouse_mat1}
      />
    </group>
  )
}

useGLTF.preload('/models/Computermouse.glb')
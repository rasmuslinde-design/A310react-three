import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/models/DeskChair.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.chairDesk.geometry}
        material={materials.metalMedium}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.chairDesk_1.geometry}
        material={materials.metalMedium}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.chair_1.geometry}
        material={materials.metalMedium}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.chair_1_1.geometry}
        material={materials.carpet}
      />
    </group>
  )
}

useGLTF.preload('/models/DeskChair.glb')
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/models/Whiteboard.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Blackboard_Q.geometry}
        material={materials.phong1SG}
      />
    </group>
  )
}

useGLTF.preload('/models/Whiteboard.glb')
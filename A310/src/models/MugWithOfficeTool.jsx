import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/models/MugWithOfficeTool.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mug_with_office_tools.geometry}
        material={materials.Material}
      />
    </group>
  )
}

useGLTF.preload('/models/MugWithOfficeTool.glb')
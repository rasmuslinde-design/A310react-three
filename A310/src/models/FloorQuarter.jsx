import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/models/FloorQuarter.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['floor-quarter'].geometry}
        material={materials.colormap}
      />
    </group>
  )
}

useGLTF.preload('/models/FloorQuarter.glb')
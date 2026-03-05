import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/models/opilastelaud.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Table_Large_Rectangular_01_Circle004.geometry}
        material={materials['795548']}
      />
    </group>
  )
}

useGLTF.preload('/models/opilastelaud.glb')
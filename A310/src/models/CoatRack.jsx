import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/models/CoatRack.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Coat_rack.geometry}
        material={materials.Material}
      />
    </group>
  )
}

useGLTF.preload('/models/CoatRack.glb')
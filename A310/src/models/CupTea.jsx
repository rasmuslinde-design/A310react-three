import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/models/CupTea.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cupThea_1.geometry}
        material={materials._defaultMat}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cupThea_1_1.geometry}
        material={materials.brown}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cupThea_1_2.geometry}
        material={materials.brownDark}
      />
      <mesh castShadow receiveShadow geometry={nodes.label_1.geometry} material={materials.green} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.label_1_1.geometry}
        material={materials.brown}
      />
    </group>
  )
}

useGLTF.preload('/models/CupTea.glb')
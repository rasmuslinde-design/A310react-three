2PDuctPipe.glb

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/2PDuctPipe.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[-0.154, 0.051, -0.002]} rotation={[-Math.PI / 2, 0, 0]} scale={60}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['2PDuct_1'].geometry}
          material={materials.Gray1}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['2PDuct_2'].geometry}
          material={materials.Gray2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['2PDuct_3'].geometry}
          material={materials.Black}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/2PDuctPipe.glb')

Cabinet.glb


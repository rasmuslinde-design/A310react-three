import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/models/opetajalaud.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[-0.617, 0.781, -0.001]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Desk_Drawer3_1.geometry}
          material={materials.DarkWood}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Desk_Drawer3_2.geometry}
          material={materials.Wood}
        />
      </group>
      <group position={[-0.617, 0.617, -0.002]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Desk_Drawer4_1.geometry}
          material={materials.DarkWood}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Desk_Drawer4_2.geometry}
          material={materials.Wood}
        />
      </group>
      <group position={[0.617, 0.617, -0.002]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Desk_Drawer2_1.geometry}
          material={materials.DarkWood}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Desk_Drawer2_2.geometry}
          material={materials.Wood}
        />
      </group>
      <group position={[0.617, 0.781, -0.001]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Desk_Drawer1_1.geometry}
          material={materials.DarkWood}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Desk_Drawer1_2.geometry}
          material={materials.Wood}
        />
      </group>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Desk_1.geometry}
          material={materials.DarkWood}
        />
        <mesh castShadow receiveShadow geometry={nodes.Desk_2.geometry} material={materials.Wood} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/opetajalaud.glb')
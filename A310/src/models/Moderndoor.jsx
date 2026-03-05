import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/Moderndoor.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Root_Scene">
        <group name="RootNode">
          <group name="door-rotate-square-d">
            <mesh
              name="door"
              castShadow
              receiveShadow
              geometry={nodes.door.geometry}
              material={materials.colormap}>
              <mesh
                name="(%ignore)"
                castShadow
                receiveShadow
                geometry={nodes['(%ignore)'].geometry}
                material={materials.glass}
                position={[0, 0.975, 0.45]}
              />
              <mesh
                name="handle"
                castShadow
                receiveShadow
                geometry={nodes.handle.geometry}
                material={materials.colormap}
                position={[0, 0.9, 0.75]}
              />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/Moderndoor.glb')
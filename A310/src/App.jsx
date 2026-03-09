import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Sky,
  PointerLockControls,
  KeyboardControls,
  ContactShadows,
} from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import * as THREE from "three";

// 1. IMPORTIME MUDELID (Veendu, et nimed klapivad failinimedega src/models kaustas!)
import { Model as DuctPipe } from "./models/2PDuctPipe";
import { Model as Cabinet } from "./models/Cabinet";
import { Model as CoatRack } from "./models/CoatRack";
import { Model as Whiteboard } from "./models/Whiteboard";
import { Model as SquareWindow } from "./models/SquareWindow";
import { Model as Projector } from "./models/Projector";
import { Model as FluorescentLight } from "./models/FluorescentLight";

// Klaviatuuri seadistus liikumiseks
const keyboardMap = [
  { name: "forward", keys: ["KeyW", "ArrowUp"] },
  { name: "backward", keys: ["KeyS", "ArrowDown"] },
  { name: "left", keys: ["KeyA", "ArrowLeft"] },
  { name: "right", keys: ["KeyD", "ArrowRight"] },
  { name: "jump", keys: ["Space"] },
];

export default function App() {
  return (
    <KeyboardControls map={keyboardMap}>
      <div style={{ width: "100vw", height: "100vh" }}>
        <Canvas shadows camera={{ position: [0, 2, 8], fov: 45 }}>
          <Sky sunPosition={[100, 20, 100]} />
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} castShadow intensity={1.5} />

          <Suspense fallback={null}>
            <Physics debug>
              {/* --- RUUMI KARP --- */}
              {/* Põrand */}
              <RigidBody type="fixed">
                <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                  <planeGeometry args={[12, 22]} />
                  <meshStandardMaterial color="#d1d5db" />
                </mesh>
              </RigidBody>

              {/* Seinad (Eesmine, Tagumine, Vasak, Parem) */}
              <RigidBody type="fixed" position={[0, 2.5, -11]}>
                <mesh>
                  <boxGeometry args={[12, 5, 0.2]} />
                  <meshStandardMaterial color="#ffffff" />
                </mesh>
              </RigidBody>
              <RigidBody type="fixed" position={[0, 2.5, 11]}>
                <mesh>
                  <boxGeometry args={[12, 5, 0.2]} />
                  <meshStandardMaterial color="#f3f4f6" />
                </mesh>
              </RigidBody>
              {/* Vasak sein (Akna pool) */}
              <RigidBody
                type="fixed"
                position={[-6, 2.5, 0]}
                rotation={[0, Math.PI / 2, 0]}
              >
                <mesh>
                  <boxGeometry args={[22, 5, 0.2]} />
                  <meshStandardMaterial color="#ffffff" />
                </mesh>
              </RigidBody>
              {/* Parem sein (Ukse pool) */}
              <RigidBody
                type="fixed"
                position={[6, 2.5, 0]}
                rotation={[0, -Math.PI / 2, 0]}
              >
                <mesh>
                  <boxGeometry args={[22, 5, 0.2]} />
                  <meshStandardMaterial color="#f3f4f6" />
                </mesh>
              </RigidBody>

              {/* --- SISUSTUS: TAHVLI SEIN --- */}
              <RigidBody type="fixed" colliders="cuboid">
                <Whiteboard
                  position={[0, 2.6, -10.85]}
                  scale={[3.2, 3.2, 3.2]}
                />
              </RigidBody>

              <RigidBody
                type="fixed"
                colliders="cuboid"
                position={[5.0, 1.2, -10.2]}
              >
                <Cabinet rotation={[0, -Math.PI / 2, 0]} scale={[3, 3, 3]} />
              </RigidBody>

              <RigidBody
                type="fixed"
                colliders="cuboid"
                position={[5.0, 0.1, -8.8]}
              >
                <CoatRack
                  rotation={[0, -Math.PI / 2, 0]}
                  scale={[200, 200, 200]}
                />
              </RigidBody>

              {/* --- LIIKUVAD JA LAE OBJEKTID --- */}
              <Projector
                position={[0, 3.7, -6]}
                rotation={[0, THREE.MathUtils.degToRad(118), 0]}
              />

              {/* Ventilatsioonitorud */}
              <DuctPipe position={[4.8, 3.7, -7.5]} scale={[0.7, 0.7, 0.7]} />
              <DuctPipe position={[4.8, 3.7, 0]} scale={[0.7, 0.7, 0.7]} />
              <DuctPipe position={[4.8, 3.7, 7.5]} scale={[0.7, 0.7, 0.7]} />

              {/* Aknad vasakul seinal */}
              {[-7.5, -2.5, 2.5, 7.5].map((zPos) => (
                <SquareWindow
                  key={zPos}
                  position={[-5.85, 2.6, zPos]}
                  rotation={[0, Math.PI / 2, 0]}
                  scale={[1.2, 1.2, 1.2]}
                />
              ))}

              {/* Valgustid laes - roteeritud 90 kraadi */}
              {[-3, 3].map((x) =>
                [-8, -2, 4, 9].map((z) => (
                  <FluorescentLight
                    key={`${x}-${z}`}
                    position={[x, 4.3, z]}
                    scale={[100, 100, 100]}
                    rotation={[0, Math.PI / 2, 0]} // See rida pöörab neid
                  />
                )),
              )}
            </Physics>
          </Suspense>

          <PointerLockControls />
        </Canvas>
      </div>
    </KeyboardControls>
  );
}

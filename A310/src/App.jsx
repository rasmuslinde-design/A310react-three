import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Sky,
  PointerLockControls,
  KeyboardControls,
  useKeyboardControls,
} from "@react-three/drei";
import { Physics, RigidBody, CapsuleCollider } from "@react-three/rapier";
import * as THREE from "three";

// 1. IMPORTIME MUDELID
import { Model as DuctPipe } from "./models/2PDuctPipe";
import { Model as Cabinet } from "./models/Cabinet";
import { Model as CoatRack } from "./models/CoatRack";
import { Model as Whiteboard } from "./models/Whiteboard";
import { Model as SquareWindow } from "./models/SquareWindow";
import { Model as Projector } from "./models/Projector";
import { Model as FluorescentLight } from "./models/FluorescentLight";

// ÕPETAJA ALA IMPORTID
import { Model as OpetajaLaud } from "./models/opetajalaud";
import { Model as Monitor } from "./models/Monitor";
import { Model as Keyboard } from "./models/Keyboard";
import { Model as ComputerMouse } from "./models/Computermouse";
import { Model as ExecutiveChair } from "./models/ExecutiveChair";
import { Model as Laptop } from "./models/Laptop";
import { Model as CupTea } from "./models/CupTea";
import { Model as MugWithOfficeTool } from "./models/MugWithOfficeTool";
import { Model as Staff } from "./models/Staff";

// MÄNGIJA IMPORT
import { Model as Student } from "./models/Student";

// Klaviatuuri seadistus
const keyboardMap = [
  { name: "forward", keys: ["KeyW", "ArrowUp"] },
  { name: "backward", keys: ["KeyS", "ArrowDown"] },
  { name: "left", keys: ["KeyA", "ArrowLeft"] },
  { name: "right", keys: ["KeyD", "ArrowRight"] },
  { name: "jump", keys: ["Space"] },
];

// --- MÄNGIJA KOMPONENT (PARANDATUD GTA STIIL) ---
function Player() {
  const rigidBody = useRef();
  const playerModel = useRef();
  const [, getKeys] = useKeyboardControls();
  const speed = 5;

  useFrame((state) => {
    if (!rigidBody.current || !playerModel.current) return;

    const { forward, backward, left, right } = getKeys();

    // Võtame kaamera horisontaalse suuna (Y-telg)
    const rotation = new THREE.Euler().setFromQuaternion(
      state.camera.quaternion,
      "YXZ",
    );
    const cameraRotationY = rotation.y;

    // Liikumise arvutamine
    let xDir = 0;
    let zDir = 0;

    if (forward) zDir -= 1;
    if (backward) zDir += 1;
    if (left) xDir -= 1;
    if (right) xDir += 1;

    const moveVector = new THREE.Vector3(xDir, 0, zDir).normalize();
    moveVector.applyAxisAngle(new THREE.Vector3(0, 1, 0), cameraRotationY);

    // Rakendame kiiruse
    rigidBody.current.setLinvel(
      {
        x: moveVector.x * speed,
        y: rigidBody.current.linvel().y,
        z: moveVector.z * speed,
      },
      true,
    );

    // Pane mudel vaatama alati sinna, kuhu hiir (kaamera) vaatab
    playerModel.current.rotation.y = cameraRotationY + Math.PI;

    // Kaamera positsioneerimine karakteri taha (ilma triivita)
    const playerPos = rigidBody.current.translation();
    const cameraDistance = 4;
    const cameraHeight = 2;

    // Arvutame ideaalse kaamera koha selja taga
    const idealOffset = new THREE.Vector3(0, cameraHeight, cameraDistance);
    idealOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), cameraRotationY);

    state.camera.position.x = playerPos.x + idealOffset.x;
    state.camera.position.y = playerPos.y + idealOffset.y;
    state.camera.position.z = playerPos.z + idealOffset.z;

    // Kaamera vaatab alati karakteri poole (veidi kõrgemale maast)
    state.camera.lookAt(playerPos.x, playerPos.y + 1.2, playerPos.z);
  });

  return (
    <RigidBody
      ref={rigidBody}
      colliders={false}
      enabledRotations={[false, false, false]}
      position={[0, 2, 5]} // Alustab kõrgemalt, et mitte maa alla jääda
      type="dynamic"
    >
      <CapsuleCollider args={[0.8, 0.4]} />
      <group ref={playerModel}>
        {/* Student mudel peaks nüüd olema nähtav */}
        <Student scale={[3.5, 3.5, 3.5]} position={[0, -1.2, 0]} />
      </group>
    </RigidBody>
  );
}

export default function App() {
  return (
    <KeyboardControls map={keyboardMap}>
      <div style={{ width: "100vw", height: "100vh" }}>
        <Canvas shadows camera={{ fov: 45 }}>
          <Sky sunPosition={[100, 20, 100]} />
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} castShadow intensity={1.5} />

          <Suspense fallback={null}>
            <Physics debug>
              {/* --- RUUMI KARP --- */}
              <RigidBody type="fixed">
                <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                  <planeGeometry args={[12, 22]} />
                  <meshStandardMaterial color="#d1d5db" />
                </mesh>
              </RigidBody>

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

              {/* --- SISUSTUS --- */}
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

              <Projector
                position={[0, 3.7, -6]}
                rotation={[0, THREE.MathUtils.degToRad(118), 0]}
              />

              <DuctPipe position={[4.8, 3.7, -7.5]} scale={[0.7, 0.7, 0.7]} />
              <DuctPipe position={[4.8, 3.7, 0]} scale={[0.7, 0.7, 0.7]} />
              <DuctPipe position={[4.8, 3.7, 7.5]} scale={[0.7, 0.7, 0.7]} />

              {[-7.5, -2.5, 2.5, 7.5].map((zPos) => (
                <SquareWindow
                  key={zPos}
                  position={[-5.95, 2.6, zPos]}
                  rotation={[0, 0, 0]}
                  scale={[12, 1.2, 1]}
                />
              ))}

              {[-3, 3].map((x) =>
                [-8, -2, 4, 9].map((z) => (
                  <FluorescentLight
                    key={`${x}-${z}`}
                    position={[x, 4.3, z]}
                    scale={[100, 100, 100]}
                    rotation={[0, Math.PI / 2, 0]}
                  />
                )),
              )}

              {/* --- BLOKK D: ÕPETAJA ALA --- */}
              <group position={[-3.5, 0, -8.5]} rotation={[0, Math.PI, 0]}>
                <RigidBody type="fixed" colliders="cuboid">
                  <OpetajaLaud scale={[150, 150, 150]} />
                </RigidBody>
                <Monitor
                  position={[-0.35, 1.45, -0.4]}
                  scale={[1.5, 1.5, 1.5]}
                  rotation={[0, 0.35, 0]}
                />
                <Monitor
                  position={[0.35, 1.45, -0.4]}
                  scale={[1.5, 1.5, 1.5]}
                  rotation={[0, -0.35, 0]}
                />
                <Keyboard position={[0, 1.45, 0.2]} scale={[0.2, 0.2, 0.2]} />
                <ComputerMouse
                  position={[0.5, 1.45, 0.2]}
                  scale={[0.03, 0.03, 0.03]}
                  rotation={[0, Math.PI, 0]}
                />
                <ExecutiveChair
                  position={[0, 0.35, 0.9]}
                  scale={[1.2, 1.2, 1.2]}
                  rotation={[0, Math.PI, 0]}
                />
                <Laptop
                  position={[-0.8, 1.45, 0.1]}
                  scale={[0.35, 0.35, 0.35]}
                  rotation={[0, 5.1, 0]}
                />
                <CupTea position={[1.0, 1.45, 0.1]} scale={[0.7, 0.7, 0.7]} />
                <MugWithOfficeTool
                  position={[0.8, 1.45, -0.3]}
                  scale={[2.0, 2.0, 2.0]}
                />
              </group>

              <RigidBody type="fixed" position={[-2.0, 1.0, -7.0]}>
                <Staff scale={[4.8, 5.8, 4.8]} />
              </RigidBody>

              {/* --- MÄNGIJA --- */}
              <Player />
            </Physics>
          </Suspense>

          <PointerLockControls />
        </Canvas>
      </div>
    </KeyboardControls>
  );
}

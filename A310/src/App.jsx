import React, { useState, useEffect, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Sky,
  PointerLockControls,
  KeyboardControls,
  ContactShadows,
} from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import * as THREE from "three";

import { Model as DuctPipe } from "./models/2PDuctPipe";
import { Model as Cabinet } from "./models/Cabinet";
import { Model as CoatRack } from "./models/CoatRack";
import { Model as Whiteboard } from "./models/Whiteboard";
import { Model as Door } from "./models/Door";
import { Model as PowerBox } from "./models/PowerBox";
import { Model as SquareWindow } from "./models/SquareWindow";
import { Model as Projector } from "./models/Projector";
import { Model as Opetajalaud } from "./models/Opetajalaud";
import { Model as Monitor } from "./models/Monitor";
import { Model as Keyboard } from "./models/Keyboard";
import { Model as Mouse } from "./models/Computermouse";
import { Model as ExecutiveChair } from "./models/ExecutiveChair";
import { Model as Laptop } from "./models/Laptop";
import { Model as CupTea } from "./models/CupTea";
import { Model as MugTool } from "./models/MugWithOfficeTool";
import { Model as Staff } from "./models/Staff";
import { Model as Opilastelaud } from "./models/Opilastelaud";
import { Model as WaterBottle } from "./models/WaterBottle";
import { Model as Backpack } from "./models/OpenBackpack";
import { Model as OfficeChair } from "./models/OfficeChair";
import { Model as DeskChair } from "./models/DeskChair";
import { Model as Student } from "./models/Student";
import { Model as Light } from "./models/FluorescentLight";

function App() {
  const [isHopping, setIsHopping] = useState(false);
  const rigRef = useRef(null);

  useEffect(() => {
    const tryRegister = () => {
      if (!window.AFRAME || !window.THREE) return false;

      if (!AFRAME.components["cartoon-outline"]) {
        AFRAME.registerComponent("cartoon-outline", {
          schema: {
            color: { type: "color", default: "#000000" },
            scale: { type: "number", default: 1.12 },
          },
          init() {
            this.outlineObj = null;
            this.onModelLoaded = () => {
              const mesh = this.el.getObject3D("mesh");
              if (!mesh) return;

              if (this.outlineObj) {
                this.el.object3D.remove(this.outlineObj);
                this.outlineObj = null;
              }

              const outline = mesh.clone(true);
              outline.traverse((node) => {
                if (node.isMesh) {
                  node.material = new THREE.MeshBasicMaterial({
                    color: this.data.color,
                    side: THREE.BackSide,
                    depthWrite: false,
                  });
                  node.renderOrder = -1;
                }
              });

              outline.scale.multiplyScalar(this.data.scale);
              this.el.object3D.add(outline);
              this.outlineObj = outline;
            };

            this.el.addEventListener("model-loaded", this.onModelLoaded);
            if (this.el.getObject3D("mesh")) this.onModelLoaded();
          },
          remove() {
            this.el.removeEventListener("model-loaded", this.onModelLoaded);
            if (this.outlineObj) this.el.object3D.remove(this.outlineObj);
          },
        });
      }

      if (!AFRAME.components["cartoon-edges"]) {
        AFRAME.registerComponent("cartoon-edges", {
          schema: {
            color: { type: "color", default: "#000000" },
            threshold: { type: "number", default: 20 },
          },
          init() {
            this.edgesGroup = null;
            this.onModelLoaded = () => {
              const mesh = this.el.getObject3D("mesh");
              if (!mesh) return;

              if (this.edgesGroup) {
                this.el.object3D.remove(this.edgesGroup);
                this.edgesGroup = null;
              }

              const group = new THREE.Group();

              mesh.traverse((node) => {
                if (node.isMesh && node.geometry) {
                  const edges = new THREE.EdgesGeometry(
                    node.geometry,
                    this.data.threshold,
                  );
                  const mat = new THREE.LineBasicMaterial({
                    color: this.data.color,
                  });
                  const lines = new THREE.LineSegments(edges, mat);
                  lines.position.copy(node.position);
                  lines.rotation.copy(node.rotation);
                  lines.scale.copy(node.scale);
                  lines.renderOrder = 3;
                  group.add(lines);
                }
              });

              this.el.object3D.add(group);
              this.edgesGroup = group;
            };

            this.el.addEventListener("model-loaded", this.onModelLoaded);
            if (this.el.getObject3D("mesh")) this.onModelLoaded();
          },
          remove() {
            this.el.removeEventListener("model-loaded", this.onModelLoaded);
            if (this.edgesGroup) this.el.object3D.remove(this.edgesGroup);
          },
        });
      }

      if (!AFRAME.components["toon-shading"]) {
        AFRAME.registerComponent("toon-shading", {
          init() {
            this.onModelLoaded = () => {
              const mesh = this.el.getObject3D("mesh");
              if (!mesh) return;
              mesh.traverse((node) => {
                if (node.isMesh && node.material) {
                  if (Array.isArray(node.material)) {
                    node.material.forEach((m) => {
                      m.flatShading = true;
                      m.needsUpdate = true;
                    });
                  } else {
                    node.material.flatShading = true;
                    node.material.needsUpdate = true;
                  }
                }
              });
            };
            this.el.addEventListener("model-loaded", this.onModelLoaded);
            if (this.el.getObject3D("mesh")) this.onModelLoaded();
          },
          remove() {
            this.el.removeEventListener("model-loaded", this.onModelLoaded);
          },
        });
      }

      if (!AFRAME.components["force-model-color"]) {
        AFRAME.registerComponent("force-model-color", {
          schema: { color: { type: "color", default: "#ffffff" } },
          init() {
            this.applyColor = () => {
              const mesh = this.el.getObject3D("mesh");
              if (!mesh) return;
              mesh.traverse((node) => {
                if (node.isMesh && node.material) {
                  const setColor = (m) => {
                    if (m.color) {
                      m.color.set(this.data.color);
                      m.needsUpdate = true;
                    }
                  };
                  if (Array.isArray(node.material)) {
                    node.material.forEach(setColor);
                  } else {
                    setColor(node.material);
                  }
                }
              });
            };
            this.el.addEventListener("model-loaded", this.applyColor);
            if (this.el.getObject3D("mesh")) this.applyColor();
          },
          remove() {
            this.el.removeEventListener("model-loaded", this.applyColor);
          },
        });
      }

      if (!AFRAME.components["auto-cartoon-style"]) {
        AFRAME.registerComponent("auto-cartoon-style", {
          init() {
            this.apply = () => {
              this.el.querySelectorAll("[gltf-model]").forEach((node) => {
                if (!node.hasAttribute("toon-shading")) {
                  node.setAttribute("toon-shading", "");
                }
                if (!node.hasAttribute("cartoon-outline")) {
                  node.setAttribute(
                    "cartoon-outline",
                    "color: #000000; scale: 1.12",
                  );
                }
                if (!node.hasAttribute("cartoon-edges")) {
                  node.setAttribute(
                    "cartoon-edges",
                    "color: #000000; threshold: 20",
                  );
                }
              });
            };

            this.onLoaded = () => this.apply();
            this.el.addEventListener("loaded", this.onLoaded);
            setTimeout(() => this.apply(), 200);
          },
          remove() {
            this.el.removeEventListener("loaded", this.onLoaded);
          },
        });
      }

      if (!AFRAME.components["mouse-look-rig"]) {
        AFRAME.registerComponent("mouse-look-rig", {
          schema: { sensitivity: { type: "number", default: 0.002 } },
          init() {
            this.yaw = 0;
            this.pitch = 0;
            this.maxPitch = 0.5;
            this.camPivot = null;

            this.onMouseMove = (e) => {
              if (!document.pointerLockElement) return;
              const dx = e.movementX || 0;
              const dy = e.movementY || 0;

              this.yaw -= dx * this.data.sensitivity;
              this.pitch -= dy * this.data.sensitivity;
              this.pitch = Math.max(-0.2, Math.min(this.maxPitch, this.pitch));
            };

            this.el.sceneEl.addEventListener("mousedown", () => {
              this.el.sceneEl.canvas?.requestPointerLock?.();
            });
            window.addEventListener("mousemove", this.onMouseMove);
          },
          tick() {
            if (!this.camPivot) {
              this.camPivot = this.el.sceneEl.querySelector("#cameraPivot");
              if (!this.camPivot) return;
            }

            if (this.el.body) {
              this.el.body.angularVelocity.set(0, 0, 0);
              this.el.body.quaternion.setFromAxisAngle(
                new CANNON.Vec3(0, 1, 0),
                this.yaw,
              );
            }

            this.el.object3D.rotation.set(0, this.yaw, 0);
            this.camPivot.object3D.rotation.set(this.pitch, 0, 0);
          },
        });
      }

      if (!AFRAME.components["character-controller"]) {
        AFRAME.registerComponent("character-controller", {
          schema: { speed: { type: "number", default: 5.0 } },
          init() {
            this.keys = {};
            window.addEventListener("keydown", (e) => {
              this.keys[e.code] = true;
            });
            window.addEventListener("keyup", (e) => {
              this.keys[e.code] = false;
            });
          },
          tick() {
            if (!this.el.body) return;
            const body = this.el.body;
            let vx = 0;
            let vz = 0;
            const yaw = this.el.object3D.rotation.y;

            if (this.keys["KeyW"]) {
              vx -= Math.sin(yaw);
              vz -= Math.cos(yaw);
            }
            if (this.keys["KeyS"]) {
              vx += Math.sin(yaw);
              vz += Math.cos(yaw);
            }
            if (this.keys["KeyA"]) {
              vx -= Math.cos(yaw);
              vz += Math.sin(yaw);
            }
            if (this.keys["KeyD"]) {
              vx += Math.cos(yaw);
              vz -= Math.sin(yaw);
            }

            const mag = Math.sqrt(vx * vx + vz * vz);
            if (mag > 0) {
              body.velocity.x = (vx / mag) * this.data.speed;
              body.velocity.z = (vz / mag) * this.data.speed;
            } else {
              body.velocity.x *= 0.8;
              body.velocity.z *= 0.8;
            }

            if (body.velocity.y > 2) body.velocity.y = 2;

            body.angularVelocity.set(0, 0, 0);
          },
        });
      }

      if (rigRef.current) {
        rigRef.current.setAttribute("mouse-look-rig", "");
        rigRef.current.setAttribute("character-controller", "speed: 6.0");
      }
      return true;
    };

    const id = setInterval(() => {
      if (tryRegister()) clearInterval(id);
    }, 50);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " " && !isHopping) {
        setIsHopping(true);
        setTimeout(() => setIsHopping(false), 300);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isHopping]);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <a-scene
        auto-cartoon-style
        renderer="colorManagement: true; physicallyCorrectLights: false"
        vr-mode-ui="enabled: false"
        physics="debug: true; gravity: 0 -22 0; friction: 0.1; restitution: 0;"
      >
        <a-sky color="#38bdf8"></a-sky>
        <a-light type="ambient" intensity="1.1" color="#ffffff"></a-light>
        <a-light
          type="directional"
          position="1 1 1"
          intensity="0.9"
          color="#ffffff"
        ></a-light>

        {/* PÕRAND */}
        <a-box
          static-body
          position="0 -0.105 0"
          width="12"
          height="0.2"
          depth="22"
          color="#7dd3fc"
        ></a-box>
        <a-plane
          position="0 -0.095 0"
          rotation="-90 0 0"
          width="12"
          height="22"
          color="#7dd3fc"
          material="shader: flat"
        ></a-plane>

        {/* VENTILATSIOONITORUD */}
        <a-entity
          gltf-model="url(/assets/2PDuctPipe.glb)"
          position="4.8 3.7 -7.5"
          rotation="0 0 0"
          scale="0.7 0.7 0.7"
        ></a-entity>
        <a-entity
          gltf-model="url(/assets/2PDuctPipe.glb)"
          position="4.8 3.7 0"
          rotation="0 0 0"
          scale="0.7 0.7 0.7"
        ></a-entity>
        <a-entity
          gltf-model="url(/assets/2PDuctPipe.glb)"
          position="4.8 3.7 7.5"
          rotation="0 0 0"
          scale="0.7 0.7 0.7"
        ></a-entity>

        {/* LAGI */}
        <a-plane
          static-body
          position="0 4.3 0"
          rotation="90 0 0"
          width="12"
          height="22"
          color="#ffffff"
          material="shader: flat"
        ></a-plane>

        {/* TAHVLI SEIN */}
        <a-box
          position="0 2.5 -11"
          width="12"
          height="5"
          depth="0.2"
          color="#f4efe2"
          material="shader: flat"
        >
          <a-box
            static-body
            position="-1.5 0 0"
            width="9"
            height="5"
            depth="0.2"
            visible="false"
          ></a-box>
          <a-box
            static-body
            position="4.5 0 0"
            width="3"
            height="5"
            depth="0.2"
            visible="false"
          ></a-box>

          <a-plane
            position="0 0.5 0.11"
            width="7"
            height="3"
            color="#f4efe2"
            material="shader: flat"
          ></a-plane>

          <a-entity
            gltf-model="url(/assets/Cabinet.glb)"
            position="5.0 -1.2 0.8"
            rotation="0 270 0"
            scale="3 3 3"
          ></a-entity>
          <a-box
            static-body
            position="5.0 -1.2 0.8"
            width="1.4"
            height="2.4"
            depth="1.0"
            visible="false"
          ></a-box>

          <a-entity
            gltf-model="url(/assets/CoatRack.glb)"
            position="5.0 -2.4 2.2"
            rotation="0 270 0"
            scale="2.5 2.5 2.5"
          ></a-entity>
          <a-box
            static-body
            position="5.0 -1.2 2.2"
            width="0.7"
            height="2.5"
            depth="0.7"
            visible="false"
          ></a-box>
        </a-box>

        {/* TAGASEIN (must/valge camo) */}
        <a-box
          static-body
          position="0 2.5 11"
          width="12"
          height="5"
          depth="0.2"
          src={import("/assets/nytapeet.jpg")}
          material="shader: flat"
        >
          {[
            { x: -4.5, y: 1.0, w: 2.2, h: 1.0, c: "#000000" },
            { x: -1.6, y: 0.2, w: 2.6, h: 1.2, c: "#111111" },
            { x: 1.5, y: -0.8, w: 2.8, h: 1.0, c: "#000000" },
            { x: 4.2, y: 0.8, w: 1.8, h: 1.1, c: "#111111" },
            { x: -0.2, y: 1.5, w: 1.6, h: 0.7, c: "#000000" },
          ].map((p, i) => (
            <a-plane
              key={i}
              position={`${p.x} ${p.y} -0.11`}
              width={p.w}
              height={p.h}
              color={p.c}
              material="shader: flat"
            ></a-plane>
          ))}
        </a-box>

        {/* UKSE SEIN */}
        <a-box
          static-body
          position="6 2.5 0"
          rotation="0 -90 0"
          width="22"
          height="5"
          depth="0.2"
          color="#f4efe2"
          material="shader: flat"
        >
          <a-entity
            static-body
            gltf-model="url(/assets/Door.glb)"
            position="-7.0 -2.4 0.15"
            rotation="0 0 0"
            scale="0.01 0.008 0.00085"
          ></a-entity>
          <a-entity
            gltf-model="url(/assets/PowerBox.glb)"
            position="10.0 -0.5 0.2"
            rotation="0 0 0"
            scale="2.4 2.4 2.4"
          ></a-entity>
        </a-box>

        {/* AKNA SEIN */}
        <a-entity position="-6 2.5 0" rotation="0 90 0">
          <a-box
            static-body
            position="0 0 0"
            width="22"
            height="5"
            depth="0.2"
            color="#f4efe2"
            material="shader: flat"
          ></a-box>
          {[-7.5, -2.5, 2.5, 7.5].map((pos) => (
            <a-entity
              key={pos}
              gltf-model="url(/assets/SquareWindow.glb)"
              position={`${pos} 0.1 -0.15`}
              scale="12 1.2 1"
              rotation="0 90 0"
            ></a-entity>
          ))}
        </a-entity>

        {/* WHITEBOARD & PROJECTOR */}
        <a-entity
          gltf-model="url(/assets/Whiteboard.glb)"
          position="0 2.6 -10.85"
          scale="3.2 3.2 3.2"
        ></a-entity>
        <a-entity
          gltf-model="url(/assets/projector.glb)"
          position="0 3.7 -6"
          rotation="0 118 0"
          scale="1 1 1"
        ></a-entity>

        {/* ÕPETAJA ALA */}
        <a-entity position="-3.5 0 -8.5" rotation="0 180 0">
          <a-box
            static-body
            width="3.4"
            height="1.2"
            depth="2.4"
            position="0 0.6 0"
            visible="false"
          ></a-box>
          <a-entity
            gltf-model="url(/assets/opetajalaud.glb)"
            position="0 0 0"
            scale="1.8 1.5 1.8"
            force-model-color="color: #ffffff"
          ></a-entity>
          <a-entity
            gltf-model="url(/assets/Monitor.glb)"
            position="-0.35 1.45 -0.4"
            scale="1.5 1.5 1.5"
            rotation="0 20 0"
          ></a-entity>
          <a-entity
            gltf-model="url(/assets/Monitor.glb)"
            position="0.35 1.45 -0.4"
            scale="1.5 1.5 1.5"
            rotation="0 -20 0"
          ></a-entity>
          <a-entity
            gltf-model="url(/assets/Keyboard.glb)"
            position="0 1.45 0.2"
            scale="0.2 0.2 0.2"
          ></a-entity>
          <a-entity
            gltf-model="url(/assets/Computermouse.glb)"
            position="0.5 1.45 0.2"
            scale="0.03 0.03 0.03"
            rotation="0 180 0"
          ></a-entity>
          <a-entity
            gltf-model="url(/assets/ExecutiveChair.glb)"
            position="0 0.35 0.9"
            scale="1.2 1.2 1.2"
            rotation="0 180 0"
          ></a-entity>

          <a-entity
            gltf-model="url(/assets/Laptop.glb)"
            position="-0.8 1.45 0.1"
            rotation="0 295 0"
            scale="0.35 0.35 0.35"
          ></a-entity>
          <a-entity
            gltf-model="url(/assets/CupTea.glb)"
            position="1.0 1.45 0.1"
            scale="0.7 0.7 0.7"
          ></a-entity>
          <a-entity
            gltf-model="url(/assets/MugWithOfficeTool.glb)"
            position="0.8 1.45 -0.3"
            scale="2.0 2.0 2.0"
          ></a-entity>
        </a-entity>

        <a-entity position="-2.0 0 -7.0">
          <a-box
            static-body
            width="0.8"
            height="1.8"
            depth="0.8"
            position="0 0.9 0"
            visible="false"
          ></a-box>
          <a-entity
            id="teacher"
            gltf-model="url(/assets/Staff.glb)"
            position="0 0.8 0"
            scale="3.8 4.8 3.8"
          ></a-entity>
        </a-entity>

        {/* ÕPILASTE ALA */}
        {[-2.8, 2.8].map((xSide, xIdx) =>
          [-4.5, 2, 8.5].map((zOffset, zIdx) => (
            <a-entity
              key={`${xSide}-${zOffset}`}
              position={`${xSide} 0 ${zOffset}`}
              rotation="0 90 0"
            >
              <a-entity
                gltf-model="url(/assets/FluorescentLight.glb)"
                position="0 4.3 0"
                scale="1 1 1"
              ></a-entity>
              <a-box
                static-body
                width="4.0"
                height="1.4"
                depth="2.6"
                position="0 0.7 0"
                visible="false"
              ></a-box>

              {[-0.7, 0.7].map((zFace, faceIdx) => (
                <a-entity
                  key={zFace}
                  position={`0 0 ${zFace}`}
                  rotation={`0 ${zFace > 0 ? 0 : 180} 0`}
                >
                  <a-entity
                    gltf-model="url(/assets/opilastelaud.glb)"
                    position="0 -4.5 0"
                    scale="0.08 0.7 0.15"
                    rotation="0 90 0"
                    force-model-color="color: #ffffff"
                  ></a-entity>

                  {[-0.9, 0.9].map((xShift, shiftIdx) => {
                    const showBottle =
                      (xIdx + zIdx + faceIdx + shiftIdx) % 3 === 0;
                    const showBag =
                      xIdx + zIdx + faceIdx === 2 && shiftIdx === 0;

                    return (
                      <a-entity key={xShift} position={`${xShift} 0 0`}>
                        <a-entity
                          gltf-model="url(/assets/Monitor.glb)"
                          position="-0.25 0.9 -0.2"
                          scale="1.3 1.3 1.3"
                          rotation="0 20 0"
                        ></a-entity>
                        <a-entity
                          gltf-model="url(/assets/Monitor.glb)"
                          position="0.25 0.9 -0.2"
                          scale="1.3 1.3 1.3"
                          rotation="0 -20 0"
                        ></a-entity>
                        <a-entity
                          gltf-model="url(/assets/Keyboard.glb)"
                          position="0 0.9 0.2"
                          scale="0.2 0.2 0.2"
                        ></a-entity>
                        <a-entity
                          gltf-model="url(/assets/Computermouse.glb)"
                          position="0.35 0.9 0.2"
                          scale="0.03 0.03 0.03"
                          rotation="0 180 0"
                        ></a-entity>

                        {showBottle && (
                          <a-entity
                            gltf-model="url(/assets/WaterBottle.glb)"
                            position="-0.4 0.9 0.15"
                            scale="0.15 0.15 0.15"
                          ></a-entity>
                        )}

                        {showBag && (
                          <a-entity
                            gltf-model="url(/assets/OpenBackpack.glb)"
                            position="1.8 0.1 0.4"
                            rotation="0 45 0"
                            scale="0.6 0.6 0.6"
                          ></a-entity>
                        )}

                        <a-entity position="0 0 0.9">
                          <a-box
                            static-body
                            width="0.8"
                            height="1.0"
                            depth="0.8"
                            position={xSide < 0 ? "0 0.5 0.2" : "0 0.5 0.1"}
                            visible="false"
                          ></a-box>
                          <a-entity
                            gltf-model={`url(/assets/${xSide < 0 ? "OfficeChair.glb" : "DeskChair.glb"})`}
                            scale={xSide < 0 ? "0.9 0.9 0.9" : "1.8 1.8 1.8"}
                            rotation={xSide < 0 ? "0 180 0" : "0 0 0"}
                          ></a-entity>
                        </a-entity>
                      </a-entity>
                    );
                  })}
                </a-entity>
              ))}
            </a-entity>
          )),
        )}

        <a-entity
          ref={rigRef}
          id="rig"
          position="0 0.5 5"
          dynamic-body="shape: sphere; sphereRadius: 0.4; mass: 5; linearDamping: 0.5; angularDamping: 1"
        >
          <a-entity id="cameraPivot" position="0 1.6 0">
            <a-entity id="playerCam" position="0 0.2 4.0" rotation="-10 0 0">
              <a-camera
                wasd-controls-enabled="false"
                look-controls-enabled="false"
              ></a-camera>
            </a-entity>
          </a-entity>
          <a-entity
            id="playerCharacter"
            gltf-model="url(/assets/Student.glb)"
            scale="3.8 4.8 3.8"
            position={isHopping ? "0 0.8 0" : "0 0.4 0"}
            rotation="0 90 0"
          ></a-entity>
        </a-entity>
      </a-scene>
    </div>
  );
}

export default App;

"use client";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import type { OrbitControls as Controls } from "three-stdlib";
import type { FactoryProduct } from "@/data/factoryData";
import ProductModel from "./ProductModel";
export type ViewCommand = {
  preset: string;
  zoom: number;
  turn: number;
  revision: number;
};
function ContextGuard({
  onFail,
  onReady,
}: {
  onFail: () => void;
  onReady: () => void;
}) {
  const { gl } = useThree();
  useEffect(() => {
    const handler = (event: Event) => {
      event.preventDefault();
      onFail();
    };
    gl.domElement.addEventListener("webglcontextlost", handler);
    if (gl.getContext().isContextLost()) onFail();
    else onReady();
    return () => gl.domElement.removeEventListener("webglcontextlost", handler);
  }, [gl, onFail, onReady]);
  return null;
}
function CameraControls({
  command,
  auto,
  active,
}: {
  command: ViewCommand;
  auto: boolean;
  active: boolean;
}) {
  const ref = useRef<Controls>(null),
    { camera, invalidate } = useThree();
  useEffect(() => {
    const v =
      command.preset === "Front"
        ? [0, 0, 6.8]
        : command.preset === "Side"
          ? [6.8, 0, 0.1]
          : [4.2, 2.9, 5.5];
    const angle = command.turn;
    const x = v[0] * Math.cos(angle) + v[2] * Math.sin(angle),
      z = v[2] * Math.cos(angle) - v[0] * Math.sin(angle);
    camera.position.set(
      x / command.zoom,
      v[1] / command.zoom,
      z / command.zoom,
    );
    camera.lookAt(0, 0, 0);
    ref.current?.target.set(0, 0, 0);
    ref.current?.update();
    invalidate();
  }, [command, camera, invalidate]);
  return (
    <OrbitControls
      ref={ref}
      enablePan={false}
      enableDamping={false}
      enableZoom={true}
      autoRotate={auto && active}
      autoRotateSpeed={1.1}
      minDistance={2.7}
      maxDistance={12}
    />
  );
}
export default function Scene({
  product,
  mode,
  command,
  auto,
  active,
  onFail,
  onReady,
}: {
  product: FactoryProduct;
  mode: string;
  command: ViewCommand;
  auto: boolean;
  active: boolean;
  onFail: () => void;
  onReady: () => void;
}) {
  return (
    <Canvas
      aria-label={`${product.name} interactive 3D model`}
      shadows="percentage"
      dpr={[1, 1.5]}
      camera={{ position: [4.2, 2.9, 5.5], fov: 36 }}
      frameloop={!active ? "never" : auto ? "always" : "demand"}
      gl={{ antialias: true, preserveDrawingBuffer: true }}
      fallback={<span>3D unavailable</span>}
      onCreated={({ gl }) => {
        gl.setClearColor("#e8eeeb");
      }}
    >
      <ContextGuard onFail={onFail} onReady={onReady} />
      <ambientLight intensity={0.65} />
      <hemisphereLight args={["#ffffff", "#789381", 1.1]} />
      <directionalLight
        position={[3, 6, 5]}
        intensity={2.7}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-4, 2, -3]} intensity={1.3} />
      <Suspense fallback={null}>
        <group position={[0, 0.1, 0]}>
          <ProductModel product={product} mode={mode} />
        </group>
      </Suspense>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.45, 0]}
        receiveShadow
      >
        <planeGeometry args={[200, 200]} />
        <shadowMaterial opacity={0.12} />
      </mesh>
      <CameraControls command={command} auto={auto} active={active} />
    </Canvas>
  );
}

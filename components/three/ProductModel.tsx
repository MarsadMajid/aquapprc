"use client";
import { useMemo, useEffect } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import type { FactoryProduct, ModelId } from "@/data/factoryData";
const green = "#00a859",
  dark = "#047348",
  brass = "#c99745",
  white = "#e9f1ec";
function hollow(radius: number, bore: number, length: number, section = false) {
  const shape = new THREE.Shape();
  const end = section ? Math.PI * 1.48 : Math.PI * 2;
  shape.absarc(0, 0, radius, 0, end, false);
  if (section) {
    shape.lineTo(Math.cos(end) * bore, Math.sin(end) * bore);
    shape.absarc(0, 0, bore, end, 0, true);
    shape.closePath();
  } else {
    const hole = new THREE.Path();
    hole.absarc(0, 0, bore, 0, Math.PI * 2, true);
    shape.holes.push(hole);
  }
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: length,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.012,
    bevelThickness: 0.012,
    curveSegments: 64,
  });
  geometry.translate(0, 0, -length / 2);
  return geometry;
}
function Tube({
  radius = 0.55,
  bore = 0.39,
  length = 2,
  color = green,
  section = false,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: {
  radius?: number;
  bore?: number;
  length?: number;
  color?: string;
  section?: boolean;
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  const geometry = useMemo(
    () => hollow(radius, bore, length, section),
    [radius, bore, length, section],
  );
  useEffect(() => () => geometry.dispose(), [geometry]);
  return (
    <mesh
      geometry={geometry}
      position={position}
      rotation={rotation}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        color={color}
        roughness={color === brass ? 0.29 : 0.3}
        metalness={color === brass ? 0.75 : 0.08}
      />
    </mesh>
  );
}
function PipeMark() {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 128;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#effff5";
    ctx.font = "600 64px Arial";
    ctx.textAlign = "center";
    ctx.fillText("AQUA  PPRC", 512, 87);
    return new THREE.CanvasTexture(canvas);
  }, []);
  useEffect(() => () => texture.dispose(), [texture]);
  return (
    <mesh position={[0, 0.568, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[2.2, 0.275]} />
      <meshBasicMaterial
        map={texture}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
function Elbow() {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.absarc(0, 0, 0.48, 0, Math.PI * 2, false);
    const hole = new THREE.Path();
    hole.absarc(0, 0, 0.33, 0, Math.PI * 2, true);
    shape.holes.push(hole);
    const curve = new THREE.CatmullRomCurve3(
      Array.from({ length: 25 }, (_, i) => {
        const a = ((i / 24) * Math.PI) / 2;
        return new THREE.Vector3(
          Math.cos(a) * 1.1 - 0.55,
          Math.sin(a) * 1.1 - 0.55,
          0,
        );
      }),
    );
    return new THREE.ExtrudeGeometry(shape, {
      extrudePath: curve,
      steps: 50,
      bevelEnabled: false,
      curveSegments: 48,
    });
  }, []);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return (
    <group rotation={[0, 0, -0.35]}>
      <mesh geometry={geometry} castShadow>
        <meshStandardMaterial color={green} roughness={0.3} />
      </mesh>
      <Tube
        radius={0.55}
        bore={0.33}
        length={0.55}
        position={[0.55, -0.67, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <Tube
        radius={0.55}
        bore={0.33}
        length={0.55}
        position={[-0.67, 0.55, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
    </group>
  );
}
function ImportedModel({ src }: { src: string }) {
  const { scene } = useGLTF(src);
  return <primitive object={scene} />;
}
export function ProceduralModel({
  id,
  mode = "Whole",
}: {
  id: ModelId;
  mode?: string;
}) {
  const section = mode === "Section";
  if (id === "pn20")
    return (
      <group>
        {!section && <PipeMark />}
        <group rotation={[0, Math.PI / 2, 0]}>
          <Tube length={3.8} section={section} />
          <Tube
            length={3.8}
            radius={0.391}
            bore={0.345}
            color={white}
            section={section}
          />
          {[-1.35, 1.35].map((z) => (
            <Tube
              key={z}
              radius={0.553}
              bore={0.55}
              length={0.018}
              color={dark}
              position={[0, 0, z]}
              section={section}
            />
          ))}
        </group>
      </group>
    );
  if (id === "fiber")
    return (
      <group rotation={[0, Math.PI / 2, 0]}>
        <Tube
          length={3.8}
          radius={0.57}
          bore={0.48}
          section={section}
          position={[0, mode === "Layers" ? 0.85 : 0, 0]}
        />
        <Tube
          length={3.85}
          radius={0.478}
          bore={0.409}
          color="#b54c3d"
          section={section}
        />
        <Tube
          length={3.9}
          radius={0.408}
          bore={0.345}
          color={white}
          section={section}
          position={[0, mode === "Layers" ? -0.85 : 0, 0]}
        />
      </group>
    );
  if (id === "elbow") return <Elbow />;
  if (id === "tee")
    return (
      <group>
        <Tube
          radius={0.53}
          bore={0.34}
          length={2.5}
          rotation={[0, Math.PI / 2, 0]}
        />
        <Tube
          radius={0.53}
          bore={0.34}
          length={1.4}
          position={[0, 0.65, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        {[-1, 1].map((x) => (
          <Tube
            key={x}
            radius={0.57}
            bore={0.34}
            length={0.32}
            position={[x, 0, 0]}
            rotation={[0, Math.PI / 2, 0]}
          />
        ))}
      </group>
    );
  if (id === "socket")
    return (
      <group rotation={[0, Math.PI / 2, 0]}>
        <Tube radius={0.65} bore={0.44} length={1.45} />
        <Tube
          radius={0.465}
          bore={0.32}
          length={0.85}
          color={brass}
          position={[0, 0, mode === "Exploded" ? 1.45 : 0.48]}
        />
        {Array.from({ length: 8 }, (_, i) => (
          <Tube
            key={i}
            radius={0.328}
            bore={0.309}
            length={0.025}
            color={brass}
            position={[0, 0, (mode === "Exploded" ? 1.07 : 0.1) + i * 0.095]}
          />
        ))}
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i * Math.PI) / 4;
          return (
            <mesh
              key={i}
              position={[Math.cos(a) * 0.65, Math.sin(a) * 0.65, -0.2]}
              rotation={[0, 0, a]}
            >
              <boxGeometry args={[0.07, 0.14, 1]} />
              <meshStandardMaterial color={green} roughness={0.4} />
            </mesh>
          );
        })}
      </group>
    );
  return (
    <group>
      <Tube
        radius={0.5}
        bore={0.32}
        length={2.6}
        rotation={[0, Math.PI / 2, 0]}
      />
      <Tube
        radius={0.71}
        bore={0.49}
        length={1.15}
        rotation={[0, Math.PI / 2, 0]}
      />
      <Tube
        radius={0.315}
        bore={0.255}
        length={2.5}
        color={brass}
        rotation={[0, Math.PI / 2, 0]}
      />
      <mesh position={[0, 0.73, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.55, 32]} />
        <meshStandardMaterial color={brass} metalness={0.7} roughness={0.3} />
      </mesh>
      <group
        position={[0, 1.02, 0]}
        rotation={[0, mode === "Closed" ? Math.PI / 2 : 0, 0]}
      >
        <mesh position={[0.42, 0, 0]} castShadow>
          <boxGeometry args={[1.4, 0.09, 0.21]} />
          <meshStandardMaterial
            color="#9ca8ad"
            metalness={0.8}
            roughness={0.24}
          />
        </mesh>
        <mesh position={[0.78, 0.01, 0]} castShadow>
          <boxGeometry args={[0.95, 0.16, 0.28]} />
          <meshStandardMaterial color={dark} roughness={0.38} />
        </mesh>
      </group>
    </group>
  );
}
export default function ProductModel({
  product,
  mode,
}: {
  product: FactoryProduct;
  mode: string;
}) {
  return product.model.kind === "glb" ? (
    <ImportedModel src={product.model.src} />
  ) : (
    <ProceduralModel id={product.model.id} mode={mode} />
  );
}

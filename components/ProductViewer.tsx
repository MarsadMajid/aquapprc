"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Component, useState, useEffect, useRef, type ReactNode } from "react";
import {
  Box,
  Maximize2,
  RotateCcw,
  Play,
  Pause,
  Plus,
  Minus,
  RotateCw,
} from "lucide-react";
import type { FactoryProduct } from "@/data/factoryData";
import Modal from "./Modal";
const Scene = dynamic(() => import("./three/Scene"), {
  ssr: false,
  loading: () => (
    <div className="viewer-loading" role="status">
      Preparing your 3D view…
    </div>
  ),
});
class Boundary extends Component<
  { children: ReactNode; onFail: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFail();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
export default function ProductViewer({
  product,
  hero = false,
}: {
  product: FactoryProduct;
  hero?: boolean;
}) {
  const [enabled, setEnabled] = useState(false),
    [failed, setFailed] = useState(false),
    [expanded, setExpanded] = useState(false),
    [mode, setMode] = useState(product.modes[0]),
    [auto, setAuto] = useState(false),
    [active, setActive] = useState(true),
    [ready, setReady] = useState(false),
    [feature, setFeature] = useState(0),
    [command, setCommand] = useState({
      preset: "Isometric",
      zoom: 1,
      turn: 0,
      revision: 0,
    });
  const region = useRef<HTMLDivElement>(null);
  const expandButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const el = region.current;
    if (!el) return;
    let visible = true;
    const update = () => setActive((visible || expanded) && !document.hidden);
    const observer = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      update();
    });
    observer.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, [expanded]);
  function activate() {
    if (enabled && !failed) return;
    setReady(false);
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2");
      if (!gl) {
        setFailed(true);
        return;
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      setEnabled(true);
      setFailed(false);
    } catch {
      setFailed(true);
    }
  }
  function reset() {
    setCommand({
      preset: "Isometric",
      zoom: 1,
      turn: 0,
      revision: command.revision + 1,
    });
    setMode("Whole");
    setAuto(false);
  }
  const content = (
    <div
      className={`viewer ${hero ? "hero-viewer" : ""}`}
      data-viewer-ready={ready}
      data-viewer-active={active}
    >
      <div className="viewer-top">
        <span className="mono">AQUA / {product.category.toUpperCase()}</span>
        <div className="segmented">
          <button
            aria-pressed={!enabled}
            onClick={() => {
              setEnabled(false);
              setReady(false);
            }}
          >
            Image
          </button>
          <button aria-pressed={enabled} onClick={activate}>
            <Box size={14} /> 3D
          </button>
        </div>
      </div>
      <div className="viewer-stage">
        {enabled && !ready && !failed && (
          <Image
            src={product.poster}
            alt={`${product.name} loading preview`}
            fill
            sizes="(max-width:800px) 100vw, 60vw"
            className="model-poster loading-poster"
          />
        )}
        {!enabled || failed ? (
          <>
            <Image
              src={product.poster}
              alt={`${product.name} illustrative 3D render`}
              fill
              sizes={
                hero
                  ? "(max-width:800px) 100vw, 55vw"
                  : "(max-width:800px) 100vw, 60vw"
              }
              priority={hero}
              className="model-poster"
            />
            {!failed && (
              <button className="activate-3d" onClick={activate}>
                <Box size={19} /> Explore in 3D <span>Drag to rotate</span>
              </button>
            )}
          </>
        ) : (
          <Boundary
            onFail={() => {
              setFailed(true);
              setEnabled(false);
            }}
          >
            <Scene
              product={product}
              mode={mode}
              command={command}
              auto={auto}
              active={active}
              onFail={() => {
                setFailed(true);
                setEnabled(false);
              }}
              onReady={() => setReady(true)}
            />
          </Boundary>
        )}
        {failed && (
          <p role="status" className="viewer-error">
            3D is unavailable on this device. You can still explore the product
            and request a quote.
          </p>
        )}
        {!expanded && (
          <button
            className="expand-view icon-button"
            ref={expandButton}
            aria-label="Expand product viewer"
            onClick={() => setExpanded(true)}
          >
            <Maximize2 size={18} />
          </button>
        )}
      </div>
      {enabled && !failed && (
        <div className="viewer-controls">
          <div className="view-presets">
            {["Front", "Side", "Isometric"].map((p) => (
              <button
                key={p}
                aria-pressed={command.preset === p}
                onClick={() => setCommand({ ...command, preset: p, turn: 0 })}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="view-tools">
            <button
              aria-label="Rotate left"
              onClick={() =>
                setCommand({ ...command, turn: command.turn - 0.3 })
              }
            >
              <RotateCcw size={17} />
            </button>
            <button
              aria-label="Rotate right"
              onClick={() =>
                setCommand({ ...command, turn: command.turn + 0.3 })
              }
            >
              <RotateCw size={17} />
            </button>
            <button
              aria-label="Zoom in"
              onClick={() =>
                setCommand({
                  ...command,
                  zoom: Math.min(1.8, command.zoom + 0.15),
                })
              }
            >
              <Plus size={17} />
            </button>
            <button
              aria-label="Zoom out"
              onClick={() =>
                setCommand({
                  ...command,
                  zoom: Math.max(0.7, command.zoom - 0.15),
                })
              }
            >
              <Minus size={17} />
            </button>
            <button
              aria-label={auto ? "Pause rotation" : "Start rotation"}
              onClick={() => setAuto(!auto)}
            >
              {auto ? <Pause size={17} /> : <Play size={17} />}
            </button>
            <button onClick={reset}>Reset</button>
          </div>
        </div>
      )}
      {enabled && product.modes.length > 1 && (
        <div className="model-modes">
          {product.modes.map((m) => (
            <button
              key={m}
              aria-pressed={mode === m}
              onClick={() => setMode(m)}
            >
              {m}
            </button>
          ))}
        </div>
      )}
      <div className="viewer-caption">
        <span>Illustrative model — not to scale</span>
        <span>
          {enabled
            ? "Drag to rotate · use controls to zoom"
            : "Made to explore"}
        </span>
      </div>
      {!hero && (
        <div className="feature-labels">
          <div>
            {product.features.map((f, i) => (
              <button
                key={f.title}
                aria-pressed={i === feature}
                onClick={() => setFeature(i)}
              >
                <span>0{i + 1}</span>
                {f.title}
              </button>
            ))}
          </div>
          <p>{product.features[feature].description}</p>
        </div>
      )}
    </div>
  );
  return (
    <div ref={region} className="viewer-anchor">
      {expanded ? (
        <>
          <div className="viewer-placeholder" />
          <Modal
            title={product.name}
            onClose={() => {
              setExpanded(false);
              requestAnimationFrame(() => expandButton.current?.focus());
            }}
          >
            {content}
          </Modal>
        </>
      ) : (
        content
      )}
    </div>
  );
}

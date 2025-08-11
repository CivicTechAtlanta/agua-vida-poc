"use client";

import React, { useRef, useState } from "react";

import Home from "../components/Home/Home";

import "./styles/Main.css";

interface ConfigurationsPageProps {
  chlorinationConfigName: string | null;
  chlorinationConfigDescription: string | null;
  chlorinationConfigTimeCreated: string | null;
  msVolume: number | null;
  chlorinePercentage: number | null;
  reservoirIngress: number | null;
  chlorineWeight: number | null;
  desiredDripRate: number | null;
  msConcentration: number | null;
  desiredConcentration: number | null;
}

const PlaceholderConfigurations: ConfigurationsPageProps[] = [
  {
    chlorinationConfigName: "Default Config",
    chlorinationConfigDescription: "This is a default configuration.",
    chlorinationConfigTimeCreated: new Date().toISOString(),
    msVolume: 100,
    chlorinePercentage: 2,
    reservoirIngress: 50,
    chlorineWeight: 5,
    desiredDripRate: 10,
    msConcentration: 1,
    desiredConcentration: 0.5,
  },
  {
    chlorinationConfigName: "Custom Config",
    chlorinationConfigDescription: "This is a custom configuration.",
    chlorinationConfigTimeCreated: new Date().toISOString(),
    msVolume: 150,
    chlorinePercentage: 3,
    reservoirIngress: 60,
    chlorineWeight: 7,
    desiredDripRate: 12,
    msConcentration: 1.2,
    desiredConcentration: 0.6,
  },
];

export default function ConfigurationsPage() {
  const [configurations] = useState<ConfigurationsPageProps[]>(
    PlaceholderConfigurations
  );
  const [index, setIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const startX = useRef<number | null>(null);
  const dragging = useRef(false);
  const total = configurations.length;

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    startX.current = e.clientX;
    setDragX(0);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current || startX.current === null) return;
    const dx = e.clientX - startX.current;
    const clamped = Math.max(Math.min(dx, 120), -120);
    setDragX(clamped);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    dragging.current = false;

    const threshold = 50; // px
    if (dragX > threshold && index > 0) {
      setIndex((i) => i - 1);
    } else if (dragX < -threshold && index < total - 1) {
      setIndex((i) => i + 1);
    }
    setDragX(0);
    startX.current = null;
  };

  return (
    <div className="config-page">
      <div className="config-header">
        <Home />
      </div>
      <div
        className="swipe-container"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        tabIndex={0}
      >
        <div
          className="swipe-track"
          style={{
            transform: `translateX(calc(-${index * 100}% + ${dragX}px))`,
            transition: dragging.current ? "none" : "transform 300ms ease",
          }}
        >
          {configurations.length === 0 ? (
            <section className="card" key="empty">
              <div className="card-inner">
                <h2>No configurations</h2>
                <p>Add a configuration to see it here.</p>
              </div>
            </section>
          ) : (
            configurations.map((cfg, i) => (
              <section className="card" key={cfg.chlorinationConfigName ?? i}>
                <div className="card-inner">
                  <h2>{cfg.chlorinationConfigName ?? `Configuration ${i + 1}`}</h2>
                  {cfg.chlorinationConfigDescription && (
                    <p style={{ marginTop: 4 }}>
                      {cfg.chlorinationConfigDescription}
                    </p>
                  )}
                  {cfg.chlorinationConfigTimeCreated && (
                    <p style={{ marginTop: 8, opacity: 0.8 }}>
                      Created: {new Date(cfg.chlorinationConfigTimeCreated).toLocaleString()}
                    </p>
                  )}
                  <div
                    style={{
                      marginTop: 12,
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 8,
                    }}
                  >
                    <div>
                      <strong>MS Volume:</strong> {cfg.msVolume ?? "-"}
                    </div>
                    <div>
                      <strong>Chlorine %:</strong> {cfg.chlorinePercentage ?? "-"}
                    </div>
                    <div>
                      <strong>Reservoir Ingress:</strong> {cfg.reservoirIngress ?? "-"}
                    </div>
                    <div>
                      <strong>Chlorine Weight:</strong> {cfg.chlorineWeight ?? "-"}
                    </div>
                    <div>
                      <strong>Desired Drip Rate:</strong> {cfg.desiredDripRate ?? "-"}
                    </div>
                    <div>
                      <strong>MS Concentration:</strong> {cfg.msConcentration ?? "-"}
                    </div>
                    <div>
                      <strong>Desired Concentration:</strong> {cfg.desiredConcentration ?? "-"}
                    </div>
                  </div>
                </div>
              </section>
            ))
          )}
        </div>
      </div>
      <div className="pager">
        {Array.from({ length: Math.max(total, 1) }).map((_, i) => (
          <button
            key={i}
            className={"dot" + (i === index ? " active" : "")}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
"use client";

import React, { useEffect, useRef, useState } from "react";

import Home from "../components/Home/Home";

import "./styles/Main.css";
import { formatSig2 } from "../utils/format";

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
  refillTime?: number | null;
}

type StoredConfig = {
  key: string;
  cfg: ConfigurationsPageProps;
};

type DraftConfig = {
  chlorinationConfigName: string;
  chlorinationConfigDescription: string;
  chlorinationConfigTimeCreated: string;
  msVolume: string;
  chlorinePercentage: string;
  reservoirIngress: string;
  chlorineWeight: string;
  desiredDripRate: string;
  msConcentration: string;
  desiredConcentration: string;
  refillTime: string;
};

const toDraft = (cfg: ConfigurationsPageProps): DraftConfig => ({
  chlorinationConfigName: cfg.chlorinationConfigName ?? "",
  chlorinationConfigDescription: cfg.chlorinationConfigDescription ?? "",
  chlorinationConfigTimeCreated: cfg.chlorinationConfigTimeCreated ?? new Date().toISOString(),
  msVolume: cfg.msVolume?.toString() ?? "",
  chlorinePercentage: cfg.chlorinePercentage?.toString() ?? "",
  reservoirIngress: cfg.reservoirIngress?.toString() ?? "",
  chlorineWeight: cfg.chlorineWeight?.toString() ?? "",
  desiredDripRate: cfg.desiredDripRate?.toString() ?? "",
  msConcentration: cfg.msConcentration?.toString() ?? "",
  desiredConcentration: cfg.desiredConcentration?.toString() ?? "",
  refillTime: cfg.refillTime?.toString() ?? "",
});

const parseNum = (s: string): number | null => {
  if (s.trim() === "") return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
};

const fromDraft = (d: DraftConfig): ConfigurationsPageProps => ({
  chlorinationConfigName: d.chlorinationConfigName || null,
  chlorinationConfigDescription: d.chlorinationConfigDescription || null,
  chlorinationConfigTimeCreated: d.chlorinationConfigTimeCreated || null,
  msVolume: parseNum(d.msVolume),
  chlorinePercentage: parseNum(d.chlorinePercentage),
  reservoirIngress: parseNum(d.reservoirIngress),
  chlorineWeight: parseNum(d.chlorineWeight),
  desiredDripRate: parseNum(d.desiredDripRate),
  msConcentration: parseNum(d.msConcentration),
  desiredConcentration: parseNum(d.desiredConcentration),
  refillTime: parseNum(d.refillTime),
});

// Use shared 2-sig-fig formatter everywhere for consistency
const formatNum = formatSig2;

export default function ConfigurationsPage() {
  const [configurations, setConfigurations] = useState<StoredConfig[]>([]);
  const [index, setIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const startX = useRef<number | null>(null);
  const dragging = useRef(false);
  const total = configurations.length;
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState<DraftConfig | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
  const configs: StoredConfig[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (!key) continue;
      if (key && key.startsWith('config.') && key.split('.').length === 4) {
        try {
          const value = window.localStorage.getItem(key);
          if (value) {
            const parsed = JSON.parse(value);
            // Only add if it has a name or description or time (basic sanity check)
            if (
              parsed &&
              (parsed.chlorinationConfigName || parsed.chlorinationConfigDescription || parsed.chlorinationConfigTimeCreated)
            ) {
        configs.push({ key, cfg: parsed });
            }
          }
  } catch {
          // skip invalid JSON
        }
      }
    }
    // Sort by time created, newest first
  configs.sort((a, b) => ((b.cfg.chlorinationConfigTimeCreated || '') as string).localeCompare((a.cfg.chlorinationConfigTimeCreated || '') as string));
    setConfigurations(configs);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    if (editingIndex !== null) return;
    dragging.current = true;
    startX.current = e.clientX;
    setDragX(0);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (editingIndex !== null) return;
    if (!dragging.current || startX.current === null) return;
    const dx = e.clientX - startX.current;
    const clamped = Math.max(Math.min(dx, 120), -120);
    setDragX(clamped);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (editingIndex !== null) return;
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

  const beginEdit = (i: number) => {
    setEditingIndex(i);
    setDraft(toDraft(configurations[i].cfg));
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setDraft(null);
  };

  const saveEdit = () => {
    if (editingIndex === null || !draft) return;
    const updated = fromDraft(draft);
    // Persist to localStorage under the original key
    try {
      if (typeof window !== 'undefined') {
        const key = configurations[editingIndex].key;
        window.localStorage.setItem(key, JSON.stringify(updated));
      }
    } catch {
      console.error('Failed to save configuration to localStorage');
    }
    setConfigurations((prev) => prev.map((c, i) => (i === editingIndex ? { ...c, cfg: updated } : c)));
    setEditingIndex(null);
    setDraft(null);
  };

  const deleteConfig = (i: number) => {
    if (typeof window === 'undefined') return;
    const item = configurations[i];
    if (!item) return;
    const confirmed = window.confirm('Delete this configuration? This cannot be undone.');
    if (!confirmed) return;
    try {
      window.localStorage.removeItem(item.key);
    } catch (e) {
      console.error('Failed to remove item from localStorage', e);
    }
    setConfigurations(prev => {
      const next = prev.filter((_, idx) => idx !== i);
      // Adjust visible index if needed based on new length
      setIndex(prevIndex => Math.min(prevIndex, Math.max(0, next.length - 1)));
      return next;
    });
    setEditingIndex(null);
    setDraft(null);
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
            configurations.map(({ key, cfg }, i) => (
              <section className="card" key={key}>
                <div className="card-inner">
                  <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                    <h2 style={{ flex: 1 }}>
                      {cfg.chlorinationConfigName ?? `Configuration ${i + 1}`}
                    </h2>
                    {editingIndex === i ? (
                      <></>
                    ) : (
                      <button onClick={() => beginEdit(i)} className="blue-btn">Edit</button>
                    )}
                  </div>

          {editingIndex === i ? (
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 12, width: '100%', flex: 1 }}>
            <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <span>Name</span>
                        <input
                          value={draft?.chlorinationConfigName ?? ''}
                          onChange={(e) => setDraft((d) => ({ ...(d as DraftConfig), chlorinationConfigName: e.target.value }))}
              style={{ background: '#111', color: '#fff', border: '1px solid #fff', padding: 6, borderRadius: 4, width: '100%', textAlign: 'left' }}
                        />
                      </label>
            <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <span>Description</span>
                        <input
                          value={draft?.chlorinationConfigDescription ?? ''}
                          onChange={(e) => setDraft((d) => ({ ...(d as DraftConfig), chlorinationConfigDescription: e.target.value }))}
              style={{ background: '#111', color: '#fff', border: '1px solid #fff', padding: 6, borderRadius: 4, width: '100%', textAlign: 'left' }}
                        />
                      </label>
            <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <span>MS Volume</span>
                        <input
                          type="number"
                          step="any"
                          value={draft?.msVolume ?? ''}
                          onChange={(e) => setDraft((d) => ({ ...(d as DraftConfig), msVolume: e.target.value }))}
              style={{ background: '#111', color: '#fff', border: '1px solid #fff', padding: 6, borderRadius: 4, width: '100%', textAlign: 'left' }}
                        />
                      </label>
            <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <span>Chlorine %</span>
                        <input
                          type="number"
                          step="any"
                          value={draft?.chlorinePercentage ?? ''}
                          onChange={(e) => setDraft((d) => ({ ...(d as DraftConfig), chlorinePercentage: e.target.value }))}
              style={{ background: '#111', color: '#fff', border: '1px solid #fff', padding: 6, borderRadius: 4, width: '100%', textAlign: 'left' }}
                        />
                      </label>
            <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <span>Reservoir Ingress</span>
                        <input
                          type="number"
                          step="any"
                          value={draft?.reservoirIngress ?? ''}
                          onChange={(e) => setDraft((d) => ({ ...(d as DraftConfig), reservoirIngress: e.target.value }))}
              style={{ background: '#111', color: '#fff', border: '1px solid #fff', padding: 6, borderRadius: 4, width: '100%', textAlign: 'left' }}
                        />
                      </label>
            <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <span>Chlorine Weight</span>
                        <input
                          type="number"
                          step="any"
                          value={draft?.chlorineWeight ?? ''}
                          onChange={(e) => setDraft((d) => ({ ...(d as DraftConfig), chlorineWeight: e.target.value }))}
              style={{ background: '#111', color: '#fff', border: '1px solid #fff', padding: 6, borderRadius: 4, width: '100%', textAlign: 'left' }}
                        />
                      </label>
            <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <span>Desired Drip Rate</span>
                        <input
                          type="number"
                          step="any"
                          value={draft?.desiredDripRate ?? ''}
                          onChange={(e) => setDraft((d) => ({ ...(d as DraftConfig), desiredDripRate: e.target.value }))}
              style={{ background: '#111', color: '#fff', border: '1px solid #fff', padding: 6, borderRadius: 4, width: '100%', textAlign: 'left' }}
                        />
                      </label>
            <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <span>MS Concentration</span>
                        <input
                          type="number"
                          step="any"
                          value={draft?.msConcentration ?? ''}
                          onChange={(e) => setDraft((d) => ({ ...(d as DraftConfig), msConcentration: e.target.value }))}
              style={{ background: '#111', color: '#fff', border: '1px solid #fff', padding: 6, borderRadius: 4, width: '100%', textAlign: 'left' }}
                        />
                      </label>
            <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <span>Desired Concentration</span>
                        <input
                          type="number"
                          step="any"
                          value={draft?.desiredConcentration ?? ''}
                          onChange={(e) => setDraft((d) => ({ ...(d as DraftConfig), desiredConcentration: e.target.value }))}
              style={{ background: '#111', color: '#fff', border: '1px solid #fff', padding: 6, borderRadius: 4, width: '100%', textAlign: 'left' }}
                        />
                      </label>
            <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <span>Refill Time</span>
                        <input
                          type="number"
                          step="any"
                          value={draft?.refillTime ?? ''}
                          onChange={(e) => setDraft((d) => ({ ...(d as DraftConfig), refillTime: e.target.value }))}
              style={{ background: '#111', color: '#fff', border: '1px solid #fff', padding: 6, borderRadius: 4, width: '100%', textAlign: 'left' }}
                        />
                      </label>
                      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
                        <button onClick={saveEdit} className="success-btn" style={{ width: '100%' }}>Save</button>
                        <button onClick={() => deleteConfig(i)} className="danger-btn" style={{ width: '100%' }}>Delete</button>
                        <button onClick={cancelEdit} className="blue-btn" style={{ width: '100%' }}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
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
                          justifyItems: 'start',
                          alignItems: 'start',
                          textAlign: 'left'
                        }}
                      >
                        <div>
                          <strong>MS Volume:</strong> {formatNum(cfg.msVolume)}
                        </div>
                        <div>
                          <strong>Chlorine %:</strong> {formatNum(cfg.chlorinePercentage)}
                        </div>
                        <div>
                          <strong>Reservoir Ingress:</strong> {formatNum(cfg.reservoirIngress)}
                        </div>
                        <div>
                          <strong>Chlorine Weight:</strong> {formatNum(cfg.chlorineWeight)}
                        </div>
                        <div>
                          <strong>Desired Drip Rate:</strong> {formatNum(cfg.desiredDripRate)}
                        </div>
                        <div>
                          <strong>MS Concentration:</strong> {formatNum(cfg.msConcentration)}
                        </div>
                        <div>
                          <strong>Desired Concentration:</strong> {formatNum(cfg.desiredConcentration)}
                        </div>
                        <div>
                          <strong>Refill Time:</strong> {formatNum(cfg.refillTime)}
                        </div>
                      </div>
                    </>
                  )}
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
            onClick={() => { if (editingIndex === null) setIndex(i); }}
          />
        ))}
      </div>
    </div>
  );
}
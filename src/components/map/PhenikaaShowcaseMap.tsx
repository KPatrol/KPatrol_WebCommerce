'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Polygon,
  Polyline,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet';
import L, { type LatLngBoundsExpression, type LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  PHENIKAA_BBOX,
  PHENIKAA_BOUNDARY,
  PHENIKAA_CENTER,
} from '@/lib/phenikaa-boundary';

const BOUNDARY_LATLNG: LatLngExpression[] = PHENIKAA_BOUNDARY.map(
  ([lat, lng]) => [lat, lng] as LatLngExpression,
);

const PATROL_ROUTE: LatLngExpression[] = [
  [20.9606, 105.7458],
  [20.9601, 105.7468],
  [20.9598, 105.7478],
  [20.9603, 105.7488],
  [20.9612, 105.7493],
  [20.9620, 105.7495],
  [20.9624, 105.7486],
  [20.9622, 105.7478],
  [20.9617, 105.7470],
  [20.9612, 105.7462],
  [20.9606, 105.7458],
];

const PATROL_ROUTE_TUPLES: [number, number][] = PATROL_ROUTE.map(
  (p) => p as [number, number],
);

const BOUNDS_PAD = 0.004;
const MAX_BOUNDS: LatLngBoundsExpression = [
  [PHENIKAA_BBOX.minLat - BOUNDS_PAD, PHENIKAA_BBOX.minLon - BOUNDS_PAD],
  [PHENIKAA_BBOX.maxLat + BOUNDS_PAD, PHENIKAA_BBOX.maxLon + BOUNDS_PAD],
];

// Plain OpenStreetMap raster tiles — stable, free, no API key.
const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_SUBDOMAINS = ['a', 'b', 'c'];
const TILE_ATTRIB =
  '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export interface DemoEvent {
  id: string;
  lat: number;
  lng: number;
  type: 'person' | 'fire' | 'motion';
  label: string;
  time: string;
}

function injectStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('kp-showcase-leaflet-styles')) return;
  const style = document.createElement('style');
  style.id = 'kp-showcase-leaflet-styles';
  style.textContent = `
    @keyframes kp-ping { 0% { transform: scale(0.6); opacity: 0.9; } 100% { transform: scale(1.8); opacity: 0; } }
    @keyframes kp-route-dash { to { stroke-dashoffset: -28; } }
    .kp-showcase-leaflet .leaflet-container {
      background: #f4f1ec;
      font-family: inherit;
    }

    /* Relocate built-in zoom control to right-middle to avoid the top control bar */
    .kp-showcase-leaflet .leaflet-top.leaflet-left {
      top: 50%;
      left: auto;
      right: 12px;
      transform: translateY(-50%);
    }
    .kp-showcase-leaflet .leaflet-control-zoom {
      border: none !important;
      box-shadow: 0 0 18px rgba(34, 211, 238, 0.18);
      border-radius: 12px;
      overflow: hidden;
    }
    .kp-showcase-leaflet .leaflet-control-zoom a {
      background: rgba(15, 23, 42, 0.78);
      backdrop-filter: blur(10px);
      color: #a5f3fc;
      border: 1px solid rgba(34, 211, 238, 0.25);
      width: 36px;
      height: 36px;
      line-height: 34px;
      font-size: 16px;
      font-weight: 700;
      transition: all 0.2s;
    }
    .kp-showcase-leaflet .leaflet-control-zoom a:first-child { border-bottom: none; }
    .kp-showcase-leaflet .leaflet-control-zoom a:hover {
      background: rgba(34, 211, 238, 0.14);
      border-color: rgba(34, 211, 238, 0.6);
      color: #fff;
    }

    /* Tuck attribution into a tiny corner that doesn't conflict with telemetry HUD */
    .kp-showcase-leaflet .leaflet-bottom.leaflet-right {
      bottom: auto;
      top: 60px;
      right: 12px;
    }
    .kp-showcase-leaflet .leaflet-control-attribution {
      background: rgba(15, 23, 42, 0.72) !important;
      backdrop-filter: blur(8px);
      border-radius: 8px;
      padding: 2px 8px;
      font-size: 9px;
      color: rgba(148, 163, 184, 0.85);
      border: 1px solid rgba(34, 211, 238, 0.18);
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
    }
    .kp-showcase-leaflet .leaflet-control-attribution a {
      color: rgba(103, 232, 249, 0.95);
    }

    .kp-showcase-leaflet .leaflet-popup-content-wrapper {
      background: rgba(15, 23, 42, 0.95);
      color: #f1f5f9;
      border: 1px solid rgba(34, 211, 238, 0.45);
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.45);
      border-radius: 10px;
      backdrop-filter: blur(10px);
    }
    .kp-showcase-leaflet .leaflet-popup-content {
      margin: 8px 12px;
      font-weight: 500;
      font-size: 12px;
    }
    .kp-showcase-leaflet .leaflet-popup-tip { display: none; }
    .kp-showcase-leaflet .leaflet-popup-close-button { display: none; }

    .kp-route-flow { animation: kp-route-dash 1.6s linear infinite; }

    .kp-event-icon {
      position: relative; width: 28px; height: 28px;
    }
    .kp-event-icon .pulse {
      position: absolute; inset: 4px;
      border-radius: 50%;
      background: currentColor;
      opacity: 0.45;
      animation: kp-ping 2.4s ease-out infinite;
    }
    .kp-event-icon .pulse.delay { animation-delay: 1.2s; }
    .kp-event-icon .dot {
      position: absolute; left: 50%; top: 50%;
      width: 14px; height: 14px;
      margin: -7px 0 0 -7px;
      border-radius: 50%;
      background: currentColor;
      box-shadow: 0 0 12px currentColor, 0 0 0 2px rgba(15,23,42,0.85);
    }
    /* Always-visible callout label next to the event marker */
    .kp-event-icon .kp-event-callout {
      position: absolute;
      left: 34px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      border-radius: 8px;
      background: rgba(15, 23, 42, 0.92);
      border: 1px solid currentColor;
      box-shadow: 0 4px 14px rgba(0,0,0,0.4), 0 0 14px rgba(34,211,238,0.18);
      backdrop-filter: blur(8px);
      white-space: nowrap;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.2px;
      pointer-events: none;
    }
    .kp-event-icon .kp-event-callout .label { color: #fff; }
    .kp-event-icon .kp-event-callout .time {
      color: currentColor;
      opacity: 0.85;
      font-size: 10px;
      font-weight: 800;
    }

    .kp-robot-icon { position: relative; width: 56px; height: 56px; }
    .kp-robot-icon .ping {
      position: absolute; inset: 0;
      border-radius: 50%;
      background: rgba(34,211,238,0.22);
      animation: kp-ping 2.4s ease-out infinite;
    }
    .kp-robot-icon .ping.delay { inset: 8px; background: rgba(34,211,238,0.36); animation-delay: 0.6s; }
    .kp-robot-icon .core {
      position: absolute; left: 50%; top: 50%;
      width: 22px; height: 22px;
      margin: -11px 0 0 -11px;
      border-radius: 50%;
      background: linear-gradient(135deg,#22d3ee,#2563eb);
      border: 3px solid #fff;
      box-shadow: 0 4px 14px rgba(34,211,238,0.7), 0 0 0 1px rgba(255,255,255,0.4);
    }
  `;
  document.head.appendChild(style);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function eventDivIcon(color: string, label: string, time: string): L.DivIcon {
  const safeLabel = escapeHtml(label);
  const safeTime = escapeHtml(time);
  return L.divIcon({
    html: `<div class="kp-event-icon" style="color:${color}"><span class="pulse"></span><span class="pulse delay"></span><span class="dot"></span><div class="kp-event-callout"><span class="label">${safeLabel}</span><span class="time">${safeTime}</span></div></div>`,
    className: 'kp-event-divicon',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

const ROBOT_ICON = (() => {
  if (typeof window === 'undefined') return null;
  return L.divIcon({
    html: `<div class="kp-robot-icon"><span class="ping"></span><span class="ping delay"></span><span class="core"></span></div>`,
    className: 'kp-robot-divicon',
    iconSize: [56, 56],
    iconAnchor: [28, 28],
  });
})();

interface Props {
  events: DemoEvent[];
  isPlaying: boolean;
  speed: number;
  resetSignal?: number;
  onPositionChange?: (lat: number, lng: number, headingDeg: number) => void;
}

function FitToBoundary() {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLngBounds(BOUNDARY_LATLNG as L.LatLngExpression[]);
    map.fitBounds(bounds, { padding: [60, 60], maxZoom: 17, animate: true });
  }, [map]);
  return null;
}

export default function PhenikaaShowcaseMap({
  events,
  isPlaying,
  speed,
  resetSignal = 0,
  onPositionChange,
}: Props) {
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState<DemoEvent | null>(null);
  const eventIcons = useRef<Record<string, L.DivIcon>>({});

  useEffect(() => {
    injectStyles();
  }, []);

  useEffect(() => {
    setProgress(0);
  }, [resetSignal]);

  useEffect(() => {
    if (!isPlaying) return;
    const stepMs = 50;
    const baseDuration = 30_000;
    const id = setInterval(() => {
      setProgress((p) => (p + (stepMs * speed) / baseDuration) % 1);
    }, stepMs);
    return () => clearInterval(id);
  }, [isPlaying, speed]);

  const robotPos = useMemo(() => {
    const total = PATROL_ROUTE_TUPLES.length - 1;
    const scaled = progress * total;
    const i = Math.min(Math.floor(scaled), total - 1);
    const frac = scaled - i;
    const a = PATROL_ROUTE_TUPLES[i];
    const b = PATROL_ROUTE_TUPLES[i + 1];
    const lat = a[0] + (b[0] - a[0]) * frac;
    const lng = a[1] + (b[1] - a[1]) * frac;
    const headingRad = Math.atan2(b[0] - a[0], b[1] - a[1]);
    const headingDeg = (headingRad * 180) / Math.PI;
    return { lat, lng, headingDeg };
  }, [progress]);

  useEffect(() => {
    onPositionChange?.(robotPos.lat, robotPos.lng, robotPos.headingDeg);
  }, [robotPos, onPositionChange]);

  const getEventIcon = (e: DemoEvent) => {
    if (!eventIcons.current[e.id]) {
      const color =
        e.type === 'fire' ? '#f97316' : e.type === 'person' ? '#a855f7' : '#eab308';
      eventIcons.current[e.id] = eventDivIcon(color, e.label, e.time);
    }
    return eventIcons.current[e.id];
  };

  return (
    <div className="kp-showcase-leaflet h-full w-full">
      <MapContainer
        center={[PHENIKAA_CENTER[0], PHENIKAA_CENTER[1]]}
        zoom={16}
        minZoom={16}
        maxZoom={19}
        maxBounds={MAX_BOUNDS}
        maxBoundsViscosity={1.0}
        scrollWheelZoom={false}
        zoomControl
        preferCanvas
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url={TILE_URL}
          subdomains={TILE_SUBDOMAINS}
          attribution={TILE_ATTRIB}
          maxZoom={19}
          detectRetina
        />

        <FitToBoundary />

        {/* Boundary — red outline + soft orange fill, OSM tiles untouched outside */}
        <Polygon
          positions={BOUNDARY_LATLNG}
          pathOptions={{
            color: '#dc2626',
            weight: 3,
            opacity: 1,
            fillColor: '#fb923c',
            fillOpacity: 0.22,
          }}
        />

        {/* Patrol route — cyan glow + animated dash to match HUD theme */}
        <Polyline
          positions={PATROL_ROUTE}
          pathOptions={{ color: '#22d3ee', weight: 12, opacity: 0.18 }}
        />
        <Polyline
          positions={PATROL_ROUTE}
          pathOptions={{
            color: '#67e8f9',
            weight: 3,
            opacity: 0.95,
            dashArray: '6 8',
            className: 'kp-route-flow',
          }}
        />

        {/* Event markers */}
        {events.map((e) => (
          <Marker
            key={e.id}
            position={[e.lat, e.lng]}
            icon={getEventIcon(e)}
            eventHandlers={{
              mouseover: () => setHovered(e),
              mouseout: () => setHovered(null),
            }}
          />
        ))}

        {hovered && (
          <Popup position={[hovered.lat, hovered.lng]} closeButton={false}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontWeight: 600 }}>{hovered.label}</span>
              <span style={{ fontSize: 10, opacity: 0.7 }}>{hovered.time}</span>
            </div>
          </Popup>
        )}

        {/* Robot */}
        {ROBOT_ICON && (
          <Marker position={[robotPos.lat, robotPos.lng]} icon={ROBOT_ICON} />
        )}
      </MapContainer>
    </div>
  );
}

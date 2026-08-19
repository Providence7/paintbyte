import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';

/* ============================================================
   NIGERIAN PAINT CATALOG
   ============================================================ */
const PAINT_CATALOG = [
  {
    key: 'primary',
    label: 'Primary & Secondary Shades',
    colors: [
      { name: 'Pillar Box Red', hex: '#C1121F', code: 'PB-PR01' },
      { name: 'Fire Engine Red', hex: '#D7263D', code: 'PB-PR02' },
      { name: 'Signal Blue', hex: '#0047AB', code: 'PB-PR03' },
      { name: 'Cobalt Blue', hex: '#1450A3', code: 'PB-PR04' },
      { name: 'Grass Green', hex: '#2E8B36', code: 'PB-PR05' },
      { name: 'Emerald Bold', hex: '#009B4D', code: 'PB-PR06' },
      { name: 'Sunflower Yellow', hex: '#F4C430', code: 'PB-PR07' },
      { name: 'Tangerine Orange', hex: '#E8590C', code: 'PB-PR08' },
      { name: 'Amethyst Purple', hex: '#6A0DAD', code: 'PB-PR09' },
      { name: 'Jet Black', hex: '#0A0A0A', code: 'PB-PR10' },
      { name: 'Bubblegum Pink', hex: '#FF3CAC', code: 'PB-PR11' },
      { name: 'Turquoise Cyan', hex: '#00B8A9', code: 'PB-PR12' },
    ],
  },
  {
    key: 'whites',
    label: 'Whites & Off-Whites',
    colors: [
      { name: 'Brilliant White', hex: '#FFFFFF', code: 'PB-W01' },
      { name: 'Pure White', hex: '#FCFCFA', code: 'PB-W02' },
      { name: 'Magnolia', hex: '#F0E6D2', code: 'PB-W03' },
      { name: 'Antique White', hex: '#F5EDE0', code: 'PB-W04' },
      { name: 'Chantilly White', hex: '#F7F8FA', code: 'PB-W05' },
      { name: 'Alabaster White', hex: '#F2EFE9', code: 'PB-W06' },
      { name: 'Eider White', hex: '#E4E2DD', code: 'PB-W07' },
      { name: 'Bone White', hex: '#EDE6D6', code: 'PB-W08' },
    ],
  },
  {
    key: 'creams',
    label: 'Warm Creams & Sandy Beiges',
    colors: [
      { name: 'Ivory Cream', hex: '#FFF3D6', code: 'PB-C01' },
      { name: 'Cream Delight', hex: '#FDEBB0', code: 'PB-C02' },
      { name: 'Soft Linen', hex: '#E8DCC8', code: 'PB-C03' },
      { name: 'Warm Sand', hex: '#D8BFA0', code: 'PB-C04' },
      { name: 'Light Coconut', hex: '#E6D2B5', code: 'PB-C05' },
      { name: 'Buttermilk', hex: '#F5E6B8', code: 'PB-C06' },
      { name: 'Desert Ivory', hex: '#E3C9A0', code: 'PB-C07' },
      { name: 'Cashmere', hex: '#C9B8A8', code: 'PB-C08' },
      { name: 'Arabian Sand', hex: '#B08D62', code: 'PB-C09' },
      { name: 'Sahara Gold', hex: '#C99A4A', code: 'PB-C10' },
    ],
  },
  {
    key: 'grays',
    label: 'Premium Grays & Monochromes',
    colors: [
      { name: 'Dove Grey', hex: '#B8BCC0', code: 'PB-G01' },
      { name: 'Light Grey', hex: '#D3D5D8', code: 'PB-G02' },
      { name: 'Charcoal Stone', hex: '#5B5F63', code: 'PB-G03' },
      { name: 'Graphite', hex: '#3B3F42', code: 'PB-G04' },
      { name: 'Iron Ore', hex: '#2E2E2E', code: 'PB-G05' },
      { name: 'Ash Grey', hex: '#C4C4C0', code: 'PB-G06' },
      { name: 'Silver Crescent', hex: '#C7CBCE', code: 'PB-G07' },
      { name: 'Slate', hex: '#6E7C82', code: 'PB-G08' },
    ],
  },
  {
    key: 'greens',
    label: 'Organic Greens & Earthy Tones',
    colors: [
      { name: 'Sage Green', hex: '#9CAF88', code: 'PB-E01' },
      { name: 'Mint Fresh', hex: '#B8E6D0', code: 'PB-E02' },
      { name: 'Forest Green', hex: '#1B4332', code: 'PB-E03' },
      { name: 'Teal Mist', hex: '#4C8C8A', code: 'PB-E04' },
      { name: 'Olive Grove', hex: '#556B2F', code: 'PB-E05' },
      { name: 'Lime Hint', hex: '#D4E157', code: 'PB-E06' },
      { name: 'Terracotta', hex: '#C1622B', code: 'PB-E07' },
      { name: 'Chocolate Brown', hex: '#4A2E1F', code: 'PB-E08' },
    ],
  },
  {
    key: 'blues',
    label: 'Calming Blues & Purples',
    colors: [
      { name: 'Sky Blue', hex: '#7EC8E3', code: 'PB-B01' },
      { name: 'Powder Blue', hex: '#C8DCE8', code: 'PB-B02' },
      { name: 'Evening Blue', hex: '#1B2A4A', code: 'PB-B03' },
      { name: 'Lagoon Blue', hex: '#1E9AA8', code: 'PB-B04' },
      { name: 'Royal Blue', hex: '#1E3A8A', code: 'PB-B05' },
      { name: 'Deep Plum', hex: '#4A1942', code: 'PB-B06' },
      { name: 'Lavender Laugh', hex: '#D9C9E8', code: 'PB-B07' },
      { name: 'Periwinkle', hex: '#8892D6', code: 'PB-B08' },
    ],
  },
  {
    key: 'pastels',
    label: 'Warm Pastels, Pinks & Oranges',
    colors: [
      { name: 'Rose Petal', hex: '#F3D1D8', code: 'PB-P01' },
      { name: 'Peach Glow', hex: '#F6CBA3', code: 'PB-P02' },
      { name: 'Sunset Orange', hex: '#E8622D', code: 'PB-P03' },
      { name: 'Sunrise Gold', hex: '#D9A441', code: 'PB-P04' },
      { name: 'Coral Red', hex: '#D9503F', code: 'PB-P05' },
      { name: 'Baby Orchid', hex: '#F0C9E0', code: 'PB-P06' },
      { name: 'Salmon Pink', hex: '#E08E7D', code: 'PB-P07' },
      { name: 'Maroon Glow', hex: '#6B1F2A', code: 'PB-P08' },
    ],
  },
];

const ALL_COLORS = PAINT_CATALOG.flatMap((cat) =>
  cat.colors.map((c) => ({ ...c, categoryKey: cat.key, categoryLabel: cat.label }))
);
const COLOR_BY_CODE = new Map(ALL_COLORS.map((c) => [c.code, c]));

let shapeCounter = 0;
const nextShapeId = () => `shape_${Date.now()}_${shapeCounter++}`;
let toastCounter = 0;
const nextToastId = () => `toast_${Date.now()}_${toastCounter++}`;

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

const STORAGE_KEYS = {
  projectIndex: 'paintbyte:project-index',
  project: (id) => `paintbyte:project:${id}`,
  recentColors: 'paintbyte:recent-colors',
  favoriteColors: 'paintbyte:favorite-colors',
};

const MAX_SAVED_PROJECTS = 20;
const MAX_STORED_IMAGE_CHARS = 4_000_000; // keep individual storage values comfortably under the 5MB cap
const MAX_UPLOAD_BYTES = 20 * 1024 * 1024; // 20MB
const HISTORY_LIMIT = 60;

/* ============================================================
   RESIZE MATH
   Each handle drags one or two edges of the rectangle. Horizontal
   drag only ever changes x/width, vertical drag only ever changes
   y/height — dragging one axis never touches the other, even for
   a shape that started out as a square.
   ============================================================ */
function computeResize(handle, orig, dx, dy, minSize, boundsW, boundsH) {
  const { x, y, width: w, height: h } = orig;
  let newX = x, newY = y, newW = w, newH = h;

  const isWest = handle === 'nw' || handle === 'sw' || handle === 'w';
  const isNorth = handle === 'nw' || handle === 'n' || handle === 'ne';
  if (isWest) { newX = x + dx; newW = w - dx; }
  if (handle === 'ne' || handle === 'e' || handle === 'se') { newW = w + dx; }
  if (isNorth) { newY = y + dy; newH = h - dy; }
  if (handle === 'sw' || handle === 's' || handle === 'se') { newH = h + dy; }

  if (newW < minSize) { newW = minSize; newX = isWest ? x + w - minSize : x; }
  if (newH < minSize) { newH = minSize; newY = isNorth ? y + h - minSize : y; }

  newX = clamp(newX, 0, Math.max(boundsW - newW, 0));
  newY = clamp(newY, 0, Math.max(boundsH - newH, 0));
  return { x: newX, y: newY, width: newW, height: newH };
}

const HANDLES_RECT = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];

const handlePosition = (shape, handle) => {
  const { x, y, width: w, height: h } = shape;
  const midX = x + w / 2, midY = y + h / 2, right = x + w, bottom = y + h;
  switch (handle) {
    case 'nw': return { x, y };
    case 'n': return { x: midX, y };
    case 'ne': return { x: right, y };
    case 'e': return { x: right, y: midY };
    case 'se': return { x: right, y: bottom };
    case 's': return { x: midX, y: bottom };
    case 'sw': return { x, y: bottom };
    case 'w': return { x, y: midY };
    default: return { x, y };
  }
};

const areaForShape = (shape, pxPerMeter) => {
  if (!pxPerMeter) return null;
  return (shape.width / pxPerMeter) * (shape.height / pxPerMeter);
};

const formatNaira = (n) =>
  `₦${Number(n || 0).toLocaleString('en-NG', { maximumFractionDigits: 0 })}`;

/* Very light validation: not a formal phone-number parser, just enough
   to stop an obviously broken WhatsApp link from silently failing. */
const isPlausiblePhone = (phone) => /^\d{10,15}$/.test((phone || '').replace(/[^\d]/g, ''));

/* ============================================================
   SMALL SHARED UI PRIMITIVES
   ============================================================ */
function Toast({ toast, onDismiss }) {
  const palette = {
    success: 'border-emerald-500 bg-emerald-500/10 text-emerald-300',
    error: 'border-red-500 bg-red-500/10 text-red-300',
    info: 'border-slate-600 bg-slate-800 text-slate-200',
  }[toast.type || 'info'];
  return (
    <div
      role="status"
      className={`pointer-events-auto flex items-start gap-2 px-3.5 py-2.5 rounded-xl border shadow-lg text-xs font-medium max-w-xs ${palette}`}
    >
      <span className="flex-1 leading-snug">{toast.message}</span>
      <button
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        className="text-current opacity-60 hover:opacity-100 shrink-0"
      >
        ✕
      </button>
    </div>
  );
}

function ToastStack({ toasts, onDismiss }) {
  if (toasts.length === 0) return null;
  return (
    <div className="pointer-events-none absolute bottom-4 right-4 z-[70] flex flex-col gap-2 items-end">
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ConfirmDialog({ state, onCancel }) {
  if (!state) return null;
  return (
    <div className="absolute inset-0 z-[80] bg-black/60 flex items-center justify-center p-6" role="dialog" aria-modal="true">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 max-w-sm w-full space-y-4">
        <p className="text-sm text-slate-100 leading-relaxed">{state.message}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-3.5 py-2 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            Cancel
          </button>
          <button
            onClick={() => { state.onConfirm(); onCancel(); }}
            className="px-3.5 py-2 rounded-lg text-xs font-bold bg-red-600 hover:bg-red-500 text-white focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            {state.confirmLabel || 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}

function Modal({ title, onClose, children, wide }) {
  return (
    <div className="absolute inset-0 z-[75] bg-black/60 flex items-center justify-center p-4 md:p-6" role="dialog" aria-modal="true" aria-label={title}>
      <div className={`bg-slate-900 border border-slate-700 rounded-2xl w-full ${wide ? 'max-w-2xl' : 'max-w-md'} max-h-[85vh] overflow-y-auto`}>
        <div className="sticky top-0 bg-slate-900 flex items-center justify-between px-5 py-4 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="text-slate-400 hover:text-white text-lg leading-none focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded"
          >
            ✕
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

/* ============================================================
   COLOR PICKER PANEL — now with search, recents & favorites
   ============================================================ */
function ColorPickerPanel({ onPick, onCancel, confirmLabel, recentColors, favoriteCodes, onToggleFavorite }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [customHex, setCustomHex] = useState('#1E3A8A');
  const [query, setQuery] = useState('');

  const favoriteColors = useMemo(
    () => favoriteCodes.map((code) => COLOR_BY_CODE.get(code)).filter(Boolean),
    [favoriteCodes]
  );

  const visibleColors = useMemo(() => {
    const base = activeCategory === 'all' ? ALL_COLORS : ALL_COLORS.filter((c) => c.categoryKey === activeCategory);
    const q = query.trim().toLowerCase();
    if (!q) return base;
    return base.filter((c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q));
  }, [activeCategory, query]);

  const renderSwatch = (col, size = 'w-full h-8') => (
    <div key={col.code} className="relative group">
      <button
        onClick={() => onPick({ hex: col.hex, name: col.name, code: col.code })}
        title={`${col.name} (${col.code})`}
        className="w-full rounded-lg border border-slate-800 hover:border-emerald-400 transition-colors overflow-hidden focus:outline-none focus:ring-2 focus:ring-emerald-400"
      >
        <div className={size} style={{ backgroundColor: col.hex }} />
        <div className="px-1 py-0.5 bg-slate-950">
          <span className="block text-[8px] text-slate-300 truncate">{col.name}</span>
        </div>
      </button>
      <button
        onClick={() => onToggleFavorite(col.code)}
        aria-label={favoriteCodes.includes(col.code) ? `Remove ${col.name} from favorites` : `Add ${col.name} to favorites`}
        className={`absolute top-0.5 right-0.5 text-[10px] leading-none rounded-full w-4 h-4 flex items-center justify-center transition-opacity ${
          favoriteCodes.includes(col.code) ? 'opacity-100 text-yellow-400' : 'opacity-0 group-hover:opacity-100 text-slate-300'
        }`}
      >
        ★
      </button>
    </div>
  );

  return (
    <div className="p-3 bg-slate-900 rounded-xl border border-emerald-700/50 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">{confirmLabel}</span>
        {onCancel && (
          <button onClick={onCancel} className="text-[10px] text-slate-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded">
            Cancel
          </button>
        )}
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search colors by name or code…"
        aria-label="Search paint colors"
        className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-[11px] text-white focus:outline-none focus:border-emerald-500"
      />

      {!query && favoriteColors.length > 0 && (
        <div>
          <span className="text-[9px] uppercase tracking-wide text-slate-500 font-bold">Favorites</span>
          <div className="grid grid-cols-4 gap-2 mt-1">{favoriteColors.map((c) => renderSwatch(c))}</div>
        </div>
      )}

      {!query && recentColors.length > 0 && (
        <div>
          <span className="text-[9px] uppercase tracking-wide text-slate-500 font-bold">Recently Used</span>
          <div className="grid grid-cols-4 gap-2 mt-1">
            {recentColors.map((c) => (
              <button
                key={`recent-${c.code}-${c.hex}`}
                onClick={() => onPick(c)}
                title={`${c.name}${c.code !== 'CUSTOM' ? ` (${c.code})` : ''}`}
                className="rounded-lg border border-slate-800 hover:border-emerald-400 overflow-hidden focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <div className="w-full h-6" style={{ backgroundColor: c.hex }} />
              </button>
            ))}
          </div>
        </div>
      )}

      {!query && (
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
              activeCategory === 'all'
                ? 'bg-emerald-500 text-slate-950 border-emerald-500'
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-600'
            }`}
          >
            All
          </button>
          {PAINT_CATALOG.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                activeCategory === cat.key
                  ? 'bg-emerald-500 text-slate-950 border-emerald-500'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-4 gap-2 max-h-44 overflow-y-auto pr-1">
        {visibleColors.length === 0 ? (
          <p className="col-span-4 text-[10px] text-slate-500 py-4 text-center">No colors match “{query}”.</p>
        ) : (
          visibleColors.map((col) => renderSwatch(col))
        )}
      </div>

      <div className="flex items-center gap-2 pt-1 border-t border-slate-800">
        <input
          type="color"
          value={customHex}
          onChange={(e) => setCustomHex(e.target.value)}
          aria-label="Pick a custom color"
          className="w-9 h-9 rounded-lg border border-slate-700 bg-transparent cursor-pointer"
        />
        <input
          type="text"
          value={customHex}
          onChange={(e) => setCustomHex(e.target.value)}
          aria-label="Custom color hex value"
          className="flex-1 px-2 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
        />
        <button
          onClick={() => onPick({ hex: customHex, name: 'Custom Mix', code: 'CUSTOM' })}
          className="px-3 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-300"
        >
          Use
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
const DesignStudio3D = ({ phoneNumber = '2348000000000', businessName = 'PaintByte' }) => {
  const fileInputRef = useRef(null);
  const svgRef = useRef(null);

  const [imageSrc, setImageSrc] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [naturalSize, setNaturalSize] = useState({ w: 1000, h: 700 });
  const [zoom, setZoom] = useState(1);

  const [shapes, setShapes] = useState([]);
  const [mode, setMode] = useState('idle'); // idle | placing-rect | placing-square | coloring-new
  const [pendingShape, setPendingShape] = useState(null);
  const [pendingShapeName, setPendingShapeName] = useState('');
  const [selectedShapeId, setSelectedShapeId] = useState(null);
  const [recoloringShapeId, setRecoloringShapeId] = useState(null);
  const [drag, setDrag] = useState(null); // { type: 'move'|'resize', shapeId, handle?, startPoint, origShape }

  // Before / after compare slider — 100 = fully colored, 0 = fully original
  const [compareReveal, setCompareReveal] = useState(100);

  // Undo / redo
  const historyRef = useRef({ stack: [[]], index: 0 });
  const [historyState, setHistoryState] = useState({ canUndo: false, canRedo: false });
  const [dirty, setDirty] = useState(false);

  // Real-world scale & cost estimate
  const [scale, setScale] = useState(null); // pixels per meter
  const [coverageRate, setCoverageRate] = useState(10); // m² covered per litre
  const [pricePerLitre, setPricePerLitre] = useState('');

  // Saved projects
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [currentProjectName, setCurrentProjectName] = useState('');
  const [savedProjects, setSavedProjects] = useState([]);
  const [busy, setBusy] = useState(null); // 'saving' | 'loading' | 'exporting' | null

  // Color memory
  const [recentColors, setRecentColors] = useState([]);
  const [favoriteCodes, setFavoriteCodes] = useState([]);

  // UI chrome
  const [toasts, setToasts] = useState([]);
  const [confirmState, setConfirmState] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showProjects, setShowProjects] = useState(false);

  const selectedShape = shapes.find((s) => s.id === selectedShapeId) || null;

  /* ---------- Toasts & confirm ---------- */
  const pushToast = useCallback((type, message) => {
    const id = nextToastId();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3800);
  }, []);
  const dismissToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));
  const askConfirm = (message, onConfirm, confirmLabel) => setConfirmState({ message, onConfirm, confirmLabel });

  /* ---------- Load persisted color memory & project list on mount ---------- */
  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get(STORAGE_KEYS.recentColors, false);
        if (res) setRecentColors(JSON.parse(res.value));
      } catch { /* no recents saved yet */ }
      try {
        const res = await window.storage.get(STORAGE_KEYS.favoriteColors, false);
        if (res) setFavoriteCodes(JSON.parse(res.value));
      } catch { /* no favorites saved yet */ }
      try {
        const res = await window.storage.get(STORAGE_KEYS.projectIndex, false);
        if (res) setSavedProjects(JSON.parse(res.value));
      } catch { /* no saved projects yet */ }
    })();
  }, []);

  const rememberColor = useCallback(async (swatch) => {
    setRecentColors((prev) => {
      const next = [swatch, ...prev.filter((c) => !(c.hex === swatch.hex && c.code === swatch.code))].slice(0, 8);
      window.storage.set(STORAGE_KEYS.recentColors, JSON.stringify(next), false).catch(() => {});
      return next;
    });
  }, []);

  const toggleFavoriteColor = useCallback((code) => {
    setFavoriteCodes((prev) => {
      const next = prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code];
      window.storage.set(STORAGE_KEYS.favoriteColors, JSON.stringify(next), false).catch(() => {});
      return next;
    });
  }, []);

  /* ---------- History ---------- */
  const pushHistory = useCallback((newShapes) => {
    const h = historyRef.current;
    const truncated = h.stack.slice(0, h.index + 1);
    truncated.push(newShapes);
    if (truncated.length > HISTORY_LIMIT) truncated.shift();
    h.stack = truncated;
    h.index = truncated.length - 1;
    setHistoryState({ canUndo: h.index > 0, canRedo: false });
    setDirty(true);
  }, []);

  const commitShapes = useCallback((updater) => {
    setShapes((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      pushHistory(next);
      return next;
    });
  }, [pushHistory]);

  const undo = useCallback(() => {
    const h = historyRef.current;
    if (h.index <= 0) return;
    h.index -= 1;
    setShapes(h.stack[h.index]);
    setHistoryState({ canUndo: h.index > 0, canRedo: h.index < h.stack.length - 1 });
    setDirty(true);
  }, []);

  const redo = useCallback(() => {
    const h = historyRef.current;
    if (h.index >= h.stack.length - 1) return;
    h.index += 1;
    setShapes(h.stack[h.index]);
    setHistoryState({ canUndo: h.index > 0, canRedo: h.index < h.stack.length - 1 });
    setDirty(true);
  }, []);

  const resetHistory = (initialShapes) => {
    historyRef.current = { stack: [initialShapes], index: 0 };
    setHistoryState({ canUndo: false, canRedo: false });
    setDirty(false);
  };

  /* ---------- Upload ---------- */
  const loadImageFile = useCallback((file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      pushToast('error', 'That file isn’t an image. Please choose a JPG, PNG, or WEBP photo.');
      return;
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      pushToast('error', 'That photo is larger than 20MB. Try a smaller export from your camera app.');
      return;
    }
    setImageLoading(true);
    const reader = new FileReader();
    reader.onerror = () => {
      setImageLoading(false);
      pushToast('error', 'Could not read that photo. Please try again.');
    };
    reader.onload = (e) => {
      const src = e.target.result;
      const img = new Image();
      img.onerror = () => {
        setImageLoading(false);
        pushToast('error', 'That photo could not be loaded. Please try a different file.');
      };
      img.onload = () => {
        setNaturalSize({ w: img.naturalWidth, h: img.naturalHeight });
        setImageSrc(src);
        setShapes([]);
        setMode('idle');
        setSelectedShapeId(null);
        setZoom(1);
        setScale(null);
        setCompareReveal(100);
        setCurrentProjectId(null);
        setCurrentProjectName('');
        resetHistory([]);
        setImageLoading(false);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  }, [pushToast]);

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) loadImageFile(e.target.files[0]);
    e.target.value = '';
  };
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) loadImageFile(e.dataTransfer.files[0]);
  };

  const requestNewPhoto = () => {
    const openPicker = () => fileInputRef.current?.click();
    if (dirty || shapes.length > 0) {
      askConfirm(
        'Starting a new photo will discard the current design unless you’ve saved it. Continue?',
        openPicker,
        'Discard & Continue'
      );
    } else {
      openPicker();
    }
  };

  /* ---------- Coordinate conversion ---------- */
  const clientToImageCoords = useCallback((clientX, clientY) => {
    const rect = svgRef.current.getBoundingClientRect();
    const relX = (clientX - rect.left) / rect.width;
    const relY = (clientY - rect.top) / rect.height;
    return {
      x: clamp(relX, 0, 1) * naturalSize.w,
      y: clamp(relY, 0, 1) * naturalSize.h,
    };
  }, [naturalSize]);

  /* ---------- Placing a new shape ---------- */
  const startPlacing = (isSquare) => {
    setMode(isSquare ? 'placing-square' : 'placing-rect');
    setSelectedShapeId(null);
    setRecoloringShapeId(null);
  };

  const cancelPlacing = () => setMode('idle');

  const handleBackgroundClick = (e) => {
    if (mode === 'placing-rect' || mode === 'placing-square') {
      const point = clientToImageCoords(e.clientX, e.clientY);
      const isSquare = mode === 'placing-square';
      const w = naturalSize.w * (isSquare ? 0.18 : 0.22);
      const h = isSquare ? w : naturalSize.w * 0.15;
      const x = clamp(point.x - w / 2, 0, Math.max(naturalSize.w - w, 0));
      const y = clamp(point.y - h / 2, 0, Math.max(naturalSize.h - h, 0));
      setPendingShape({ x, y, width: w, height: h, isSquare });
      setPendingShapeName(`Section ${shapes.length + 1}`);
      setMode('coloring-new');
      return;
    }
    if (mode === 'idle') setSelectedShapeId(null);
  };

  const confirmNewShapeColor = (swatch) => {
    const newShape = {
      id: nextShapeId(),
      name: pendingShapeName.trim() || `Section ${shapes.length + 1}`,
      ...pendingShape,
      hex: swatch.hex,
      colorName: swatch.name,
      code: swatch.code,
    };
    commitShapes((prev) => [...prev, newShape]);
    rememberColor(swatch);
    setPendingShape(null);
    setMode('idle');
    setSelectedShapeId(newShape.id);
  };

  const cancelNewShapeColor = () => {
    setPendingShape(null);
    setMode('idle');
  };

  /* ---------- Select / recolor / delete / rename / duplicate / order ---------- */
  const selectShape = (id) => {
    if (mode !== 'idle') return;
    setSelectedShapeId(id);
    setRecoloringShapeId(null);
  };

  const applyRecolor = (swatch) => {
    commitShapes((prev) =>
      prev.map((s) => (s.id === recoloringShapeId ? { ...s, hex: swatch.hex, colorName: swatch.name, code: swatch.code } : s))
    );
    rememberColor(swatch);
    setRecoloringShapeId(null);
  };

  const deleteShape = (id) => {
    commitShapes((prev) => prev.filter((s) => s.id !== id));
    if (selectedShapeId === id) setSelectedShapeId(null);
    if (recoloringShapeId === id) setRecoloringShapeId(null);
  };

  const requestDeleteShape = (id) => {
    const shape = shapes.find((s) => s.id === id);
    askConfirm(`Delete “${shape?.name || 'this section'}”? This can be undone with Ctrl+Z.`, () => deleteShape(id), 'Delete');
  };

  const renameShapeLive = (id, name) => setShapes((prev) => prev.map((s) => (s.id === id ? { ...s, name } : s)));
  const commitRename = () => pushHistory(shapes);

  const duplicateShape = (id) => {
    const shape = shapes.find((s) => s.id === id);
    if (!shape) return;
    const offset = naturalSize.w * 0.03;
    const dup = {
      ...shape,
      id: nextShapeId(),
      name: `${shape.name} copy`,
      x: clamp(shape.x + offset, 0, Math.max(naturalSize.w - shape.width, 0)),
      y: clamp(shape.y + offset, 0, Math.max(naturalSize.h - shape.height, 0)),
    };
    commitShapes((prev) => [...prev, dup]);
    setSelectedShapeId(dup.id);
    pushToast('success', 'Section duplicated.');
  };

  const bringToFront = (id) => commitShapes((prev) => {
    const shape = prev.find((s) => s.id === id);
    return shape ? [...prev.filter((s) => s.id !== id), shape] : prev;
  });
  const sendToBack = (id) => commitShapes((prev) => {
    const shape = prev.find((s) => s.id === id);
    return shape ? [shape, ...prev.filter((s) => s.id !== id)] : prev;
  });

  const nudgeShape = (id, key, big) => {
    const step = naturalSize.w * (big ? 0.02 : 0.004);
    const dx = key === 'ArrowLeft' ? -step : key === 'ArrowRight' ? step : 0;
    const dy = key === 'ArrowUp' ? -step : key === 'ArrowDown' ? step : 0;
    commitShapes((prev) => prev.map((s) => (s.id === id ? {
      ...s,
      x: clamp(s.x + dx, 0, Math.max(naturalSize.w - s.width, 0)),
      y: clamp(s.y + dy, 0, Math.max(naturalSize.h - s.height, 0)),
    } : s)));
  };

  /* ---------- Keyboard shortcuts ---------- */
  useEffect(() => {
    const onKeyDown = (e) => {
      const tag = document.activeElement && document.activeElement.tagName;
      const isTyping = tag === 'INPUT' || tag === 'TEXTAREA';
      const cmd = e.ctrlKey || e.metaKey;

      if (cmd && e.key.toLowerCase() === 'z' && !isTyping) {
        e.preventDefault();
        e.shiftKey ? redo() : undo();
        return;
      }
      if (cmd && e.key.toLowerCase() === 'y' && !isTyping) {
        e.preventDefault();
        redo();
        return;
      }
      if (isTyping) return;

      if (mode !== 'idle') {
        if (e.key === 'Escape') {
          setMode('idle');
          setPendingShape(null);
        }
        return;
      }
      if (!selectedShapeId) return;

      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        requestDeleteShape(selectedShapeId);
      } else if (cmd && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        duplicateShape(selectedShapeId);
      } else if (e.key === 'Escape') {
        setSelectedShapeId(null);
      } else if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        nudgeShape(selectedShapeId, e.key, e.shiftKey);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, selectedShapeId, shapes]);

  /* ---------- Move + resize (drag) ---------- */
  const beginMove = (shape) => (e) => {
    if (mode !== 'idle') return;
    e.stopPropagation();
    selectShape(shape.id);
    setDrag({ type: 'move', shapeId: shape.id, startPoint: clientToImageCoords(e.clientX, e.clientY), origShape: shape });
  };

  const beginResize = (shape, handle) => (e) => {
    e.stopPropagation();
    setDrag({ type: 'resize', shapeId: shape.id, handle, startPoint: clientToImageCoords(e.clientX, e.clientY), origShape: shape });
  };

  const handlePointerMove = (e) => {
    if (!drag) return;
    const current = clientToImageCoords(e.clientX, e.clientY);
    const dx = current.x - drag.startPoint.x;
    const dy = current.y - drag.startPoint.y;

    if (drag.type === 'move') {
      const { origShape } = drag;
      const newX = clamp(origShape.x + dx, 0, Math.max(naturalSize.w - origShape.width, 0));
      const newY = clamp(origShape.y + dy, 0, Math.max(naturalSize.h - origShape.height, 0));
      setShapes((prev) => prev.map((s) => (s.id === drag.shapeId ? { ...s, x: newX, y: newY } : s)));
    } else if (drag.type === 'resize') {
      const { origShape, handle } = drag;
      const minSize = naturalSize.w * 0.03;
      const next = computeResize(handle, origShape, dx, dy, minSize, naturalSize.w, naturalSize.h);
      setShapes((prev) => prev.map((s) => (s.id === drag.shapeId ? { ...s, ...next } : s)));
    }
  };

  const handlePointerUp = () => {
    if (drag) pushHistory(shapes);
    setDrag(null);
  };

  /* ---------- Zoom ---------- */
  const zoomIn = () => setZoom((z) => Math.min(z + 0.25, 4));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.25, 1));
  const zoomReset = () => setZoom(1);

  /* ---------- Scale / area / cost ---------- */
  const areaSummary = useMemo(() => {
    if (!scale) return null;
    const totalArea = shapes.reduce((sum, s) => sum + (areaForShape(s, scale) || 0), 0);
    const litres = coverageRate > 0 ? Math.ceil(totalArea / coverageRate) : 0;
    const cost = pricePerLitre !== '' && !Number.isNaN(Number(pricePerLitre)) ? litres * Number(pricePerLitre) : null;
    return { totalArea, litres, cost };
  }, [shapes, scale, coverageRate, pricePerLitre]);

  const applyScale = (shapeId, realWidthMeters) => {
    const shape = shapes.find((s) => s.id === shapeId);
    const width = Number(realWidthMeters);
    if (!shape || !width || width <= 0) {
      pushToast('error', 'Choose a section and enter its real-world width in metres.');
      return;
    }
    setScale(shape.width / width);
    pushToast('success', 'Scale set — areas and paint estimates are now available.');
  };

  /* ---------- Export ---------- */
  const handleExportPng = () => {
    if (!imageSrc) return;
    setBusy('exporting');
    const img = new Image();
    img.onerror = () => {
      setBusy(null);
      pushToast('error', 'Export failed while reloading the photo. Please try again.');
    };
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = naturalSize.w;
        canvas.height = naturalSize.h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, naturalSize.w, naturalSize.h);

        shapes.forEach((shape) => {
          ctx.save();
          ctx.fillStyle = shape.hex;
          ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
          ctx.restore();
        });

        const link = document.createElement('a');
        link.download = `${businessName.toLowerCase().replace(/\s+/g, '-')}-design.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        pushToast('success', 'Design image downloaded.');
      } catch {
        pushToast('error', 'Export failed. Please try again.');
      } finally {
        setBusy(null);
      }
    };
    img.src = imageSrc;
  };

  const handleSendToWhatsApp = () => {
    if (shapes.length === 0) return;
    if (!isPlausiblePhone(phoneNumber)) {
      pushToast('error', 'This business’s WhatsApp number isn’t configured correctly. Contact support.');
      return;
    }
    const summary = shapes.map((s) => `• *${s.name}:* ${s.colorName} (${s.code}) — ${s.hex}`).join('\n');
    const estimateLine = areaSummary
      ? `\n📐 Estimated area: ${areaSummary.totalArea.toFixed(1)} m²\n🪣 Estimated paint: ${areaSummary.litres} L${
          areaSummary.cost != null ? `\n💰 Estimated cost: ${formatNaira(areaSummary.cost)}` : ''
        }\n`
      : '';
    const message =
      `Hi ${businessName}, I created a custom design on your Paint Studio:\n\n` +
      `🎨 *Sections & Paint Codes:*\n${summary}\n${estimateLine}\n` +
      `Can you give me an estimate to execute this exact color scheme?`;
    window.open(`https://wa.me/${phoneNumber.replace(/[^\d]/g, '')}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  const handlePrintQuote = () => {
    if (shapes.length === 0) {
      pushToast('info', 'Add at least one colored section before printing a quote.');
      return;
    }
    const rows = shapes
      .map((s) => {
        const area = scale ? areaForShape(s, scale) : null;
        return `<tr>
          <td>${s.name}</td>
          <td><span class="swatch" style="background:${s.hex}"></span>${s.colorName}</td>
          <td>${s.code}</td>
          ${scale ? `<td>${area != null ? area.toFixed(2) + ' m²' : '—'}</td>` : ''}
        </tr>`;
      })
      .join('');
    const totalsBlock = areaSummary
      ? `<div class="total">
          <div>Total area: <strong>${areaSummary.totalArea.toFixed(2)} m²</strong></div>
          <div>Estimated paint needed: <strong>${areaSummary.litres} L</strong> (at ${coverageRate} m²/L)</div>
          ${areaSummary.cost != null ? `<div>Estimated cost: <strong>${formatNaira(areaSummary.cost)}</strong></div>` : ''}
        </div>`
      : '';
    const html = `<!doctype html><html><head><title>${businessName} Quote</title><meta charset="utf-8" />
      <style>
        body{font-family: system-ui, -apple-system, sans-serif; padding:40px; color:#0f172a;}
        h1{font-size:22px;margin:0 0 4px;}
        p.meta{color:#64748b;font-size:12px;margin:0 0 20px;}
        table{width:100%;border-collapse:collapse;margin-top:12px;}
        th,td{border-bottom:1px solid #e2e8f0;text-align:left;padding:8px;font-size:13px;}
        th{color:#475569;text-transform:uppercase;font-size:10px;letter-spacing:0.04em;}
        .swatch{display:inline-block;width:11px;height:11px;border-radius:3px;margin-right:6px;vertical-align:middle;border:1px solid #cbd5e1;}
        .total{margin-top:22px;font-size:13px;line-height:1.9;padding-top:14px;border-top:2px solid #0f172a;}
        @media print { body{padding:20px;} }
      </style></head><body>
      <h1>${businessName} — Design Quote</h1>
      <p class="meta">Generated ${new Date().toLocaleDateString()}</p>
      <table><thead><tr><th>Section</th><th>Colour</th><th>Code</th>${scale ? '<th>Area</th>' : ''}</tr></thead>
      <tbody>${rows}</tbody></table>
      ${totalsBlock}
      </body></html>`;
    const win = window.open('', '_blank');
    if (!win) {
      pushToast('error', 'Please allow pop-ups for this site to print a quote.');
      return;
    }
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 350);
  };

  /* ---------- Saved projects ---------- */
  const persistProjectIndex = async (index) => {
    await window.storage.set(STORAGE_KEYS.projectIndex, JSON.stringify(index), false);
    setSavedProjects(index);
  };

  const handleSaveProject = async (name) => {
    const trimmed = name.trim();
    if (!trimmed) {
      pushToast('error', 'Give this design a name before saving.');
      return;
    }
    setBusy('saving');
    try {
      const id = currentProjectId || `proj_${Date.now()}`;
      const imageFits = imageSrc && imageSrc.length < MAX_STORED_IMAGE_CHARS;
      const payload = {
        id,
        name: trimmed,
        savedAt: new Date().toISOString(),
        naturalSize,
        shapes,
        scale,
        coverageRate,
        pricePerLitre,
        imageDataUrl: imageFits ? imageSrc : null,
      };
      await window.storage.set(STORAGE_KEYS.project(id), JSON.stringify(payload), false);
      const nextIndex = [
        { id, name: trimmed, savedAt: payload.savedAt, hasImage: !!imageFits },
        ...savedProjects.filter((p) => p.id !== id),
      ].slice(0, MAX_SAVED_PROJECTS);
      await persistProjectIndex(nextIndex);
      setCurrentProjectId(id);
      setCurrentProjectName(trimmed);
      setDirty(false);
      pushToast('success', `Saved “${trimmed}”.${imageFits ? '' : ' (Photo too large to store — keep the original file handy.)'}`);
    } catch {
      pushToast('error', 'Could not save this design. Please try again.');
    } finally {
      setBusy(null);
    }
  };

  const handleLoadProject = async (id) => {
    setBusy('loading');
    try {
      const res = await window.storage.get(STORAGE_KEYS.project(id), false);
      if (!res) throw new Error('missing');
      const data = JSON.parse(res.value);
      setNaturalSize(data.naturalSize);
      setShapes(data.shapes || []);
      setScale(data.scale || null);
      setCoverageRate(data.coverageRate || 10);
      setPricePerLitre(data.pricePerLitre ?? '');
      resetHistory(data.shapes || []);
      setCurrentProjectId(id);
      setCurrentProjectName(data.name);
      setSelectedShapeId(null);
      setCompareReveal(100);
      setZoom(1);
      if (data.imageDataUrl) {
        setImageSrc(data.imageDataUrl);
        pushToast('success', `Loaded “${data.name}”.`);
      } else {
        setImageSrc(null);
        pushToast('info', `Loaded “${data.name}” — re-upload the same photo to keep editing.`);
      }
      setShowProjects(false);
    } catch {
      pushToast('error', 'Could not load that design.');
    } finally {
      setBusy(null);
    }
  };

  const requestDeleteProject = (id, name) => {
    askConfirm(`Delete the saved design “${name}”? This cannot be undone.`, async () => {
      try {
        await window.storage.delete(STORAGE_KEYS.project(id), false);
        await persistProjectIndex(savedProjects.filter((p) => p.id !== id));
        if (currentProjectId === id) setCurrentProjectId(null);
        pushToast('info', 'Design deleted.');
      } catch {
        pushToast('error', 'Could not delete that design.');
      }
    }, 'Delete');
  };

  /* ---------- Render ---------- */
  const frameWidth = 900 * zoom;
  const frameHeight = frameWidth * (naturalSize.h / naturalSize.w);
  const handleSize = naturalSize.w * 0.012;
  const canExport = shapes.length > 0 && !busy;

  return (
    <div className="relative w-full max-w-6xl mx-auto bg-slate-900 text-white rounded-3xl shadow-2xl overflow-hidden font-sans border border-slate-800">
      {/* Header */}
      <div className="p-6 md:p-8 bg-slate-950 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">PaintByte™ Interactive Studio</span>
          <h2 className="text-2xl md:text-3xl font-black mt-1">Drop Shapes, Color & Preview</h2>
          <p className="text-xs text-slate-400 mt-1">
            Upload a photo, drop a rectangle or square on any section, drag its handles to fit, then paint it.
          </p>
          {imageSrc && (
            <p className="text-[10px] text-slate-500 mt-2">
              {currentProjectName ? `“${currentProjectName}”` : 'Untitled design'}
              {dirty && <span className="text-amber-400"> · unsaved changes</span>}
            </p>
          )}
        </div>
        {imageSrc && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowProjects(true)}
              className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              My Designs
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400"
              aria-label="Estimate settings"
            >
              ⚙ Settings
            </button>
            <button
              onClick={handleSendToWhatsApp}
              disabled={shapes.length === 0}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-extrabold rounded-xl shadow-lg shadow-emerald-500/20 transition-all"
            >
              Send to WhatsApp
            </button>
          </div>
        )}
      </div>

      {/* Empty state — upload */}
      {!imageSrc && (
        <div className="p-8 space-y-4">
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click(); }}
            className="cursor-pointer border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-2xl h-80 flex flex-col items-center justify-center text-center px-6 transition-colors bg-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            {imageLoading ? (
              <>
                <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mb-3" />
                <p className="text-sm font-bold text-white">Loading your photo…</p>
              </>
            ) : (
              <>
                <svg className="w-10 h-10 text-emerald-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <p className="text-sm font-bold text-white">Click to upload, or drag a photo here</p>
                <p className="text-xs text-slate-500 mt-1">A building exterior, a room, a shop front — any photo you have.</p>
                <p className="text-[10px] text-slate-600 mt-3">JPG, PNG or WEBP, up to 20MB</p>
              </>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInputChange} className="hidden" />
          </div>
          {savedProjects.length > 0 && (
            <button
              onClick={() => setShowProjects(true)}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              Or open a saved design ({savedProjects.length})
            </button>
          )}
        </div>
      )}

      {/* Editor */}
      {imageSrc && (
        <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: canvas */}
          <div className="lg:col-span-8 flex flex-col space-y-4">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-2">
              {mode === 'idle' && (
                <>
                  <button
                    onClick={() => startPlacing(false)}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                  >
                    <span className="inline-block w-3 h-2 border-2 border-slate-950" /> + Rectangle
                  </button>
                  <button
                    onClick={() => startPlacing(true)}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                  >
                    <span className="inline-block w-2.5 h-2.5 border-2 border-slate-950" /> + Square
                  </button>
                  <button
                    onClick={undo}
                    disabled={!historyState.canUndo}
                    aria-label="Undo"
                    title="Undo (Ctrl+Z)"
                    className="w-8 h-8 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  >
                    ↶
                  </button>
                  <button
                    onClick={redo}
                    disabled={!historyState.canRedo}
                    aria-label="Redo"
                    title="Redo (Ctrl+Shift+Z)"
                    className="w-8 h-8 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  >
                    ↷
                  </button>
                </>
              )}
              {(mode === 'placing-rect' || mode === 'placing-square') && (
                <>
                  <span className="px-3 py-2 bg-slate-800 rounded-lg text-xs text-slate-300">
                    Click anywhere on the photo to drop a {mode === 'placing-square' ? 'square' : 'rectangle'}
                  </span>
                  <button onClick={cancelPlacing} className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-400">
                    Cancel (Esc)
                  </button>
                </>
              )}

              <div className="ml-auto flex items-center gap-1.5">
                <button onClick={zoomOut} aria-label="Zoom out" className="w-8 h-8 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-400">
                  −
                </button>
                <span className="text-[10px] text-slate-400 w-10 text-center">{Math.round(zoom * 100)}%</span>
                <button onClick={zoomIn} aria-label="Zoom in" className="w-8 h-8 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-400">
                  +
                </button>
                <button onClick={zoomReset} className="px-2 h-8 bg-slate-800 hover:bg-slate-700 rounded-lg text-[10px] font-bold focus:outline-none focus:ring-2 focus:ring-emerald-400">
                  Reset
                </button>
                <button
                  onClick={requestNewPhoto}
                  className="px-2 h-8 bg-slate-800 hover:bg-slate-700 rounded-lg text-[10px] font-bold focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  New Photo
                </button>
              </div>
            </div>

            {/* Before / after compare slider */}
            {shapes.length > 0 && mode === 'idle' && (
              <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide shrink-0">Original</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={compareReveal}
                  onChange={(e) => setCompareReveal(Number(e.target.value))}
                  aria-label="Before and after comparison slider"
                  className="flex-1 accent-emerald-500"
                />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide shrink-0">Design</span>
              </div>
            )}

            {/* Zoomable / scrollable canvas frame */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-auto max-h-[520px]">
              <div className="relative" style={{ width: frameWidth, height: frameHeight }}>
                <img
                  src={imageSrc}
                  alt="Uploaded surface to paint"
                  className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                  draggable={false}
                />
                <div
                  className="absolute inset-0"
                  style={{ clipPath: `inset(0 ${100 - compareReveal}% 0 0)` }}
                >
                  <svg
                    ref={svgRef}
                    viewBox={`0 0 ${naturalSize.w} ${naturalSize.h}`}
                    className="absolute inset-0 w-full h-full"
                    style={{ cursor: mode.startsWith('placing') ? 'crosshair' : 'default', width: frameWidth, height: frameHeight }}
                    onClick={handleBackgroundClick}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                  >
                    {shapes.map((shape) => {
                      const isSelected = shape.id === selectedShapeId;
                      const handles = HANDLES_RECT;
                      return (
                        <g key={shape.id}>
                          <rect
                            x={shape.x}
                            y={shape.y}
                            width={shape.width}
                            height={shape.height}
                            fill={shape.hex}
                            style={{ cursor: mode === 'idle' ? 'move' : 'default' }}
                            onClick={(e) => e.stopPropagation()}
                            onPointerDown={beginMove(shape)}
                          />
                          <rect
                            x={shape.x}
                            y={shape.y}
                            width={shape.width}
                            height={shape.height}
                            fill="none"
                            stroke={isSelected ? '#34D399' : 'rgba(255,255,255,0.4)'}
                            strokeWidth={isSelected ? naturalSize.w * 0.0035 : naturalSize.w * 0.0018}
                            pointerEvents="none"
                          />
                          {isSelected && mode === 'idle' && (
                            <text
                              x={shape.x + 4}
                              y={shape.y - naturalSize.w * 0.008}
                              fill="#34D399"
                              fontSize={naturalSize.w * 0.02}
                              fontWeight="bold"
                            >
                              {shape.name}
                            </text>
                          )}
                          {isSelected && mode === 'idle' &&
                            handles.map((h) => {
                              const pos = handlePosition(shape, h);
                              return (
                                <rect
                                  key={h}
                                  x={pos.x - handleSize / 2}
                                  y={pos.y - handleSize / 2}
                                  width={handleSize}
                                  height={handleSize}
                                  fill="#34D399"
                                  stroke="#0f172a"
                                  strokeWidth={naturalSize.w * 0.0015}
                                  style={{ cursor: `${h}-resize` }}
                                  onPointerDown={beginResize(shape, h)}
                                />
                              );
                            })}
                        </g>
                      );
                    })}

                    {pendingShape && (
                      <rect
                        x={pendingShape.x}
                        y={pendingShape.y}
                        width={pendingShape.width}
                        height={pendingShape.height}
                        fill="rgba(52,211,153,0.25)"
                        stroke="#34D399"
                        strokeDasharray={`${naturalSize.w * 0.006} ${naturalSize.w * 0.004}`}
                        strokeWidth={naturalSize.w * 0.0025}
                      />
                    )}
                  </svg>
                </div>
              </div>
            </div>

            {/* Full palette preview strip */}
            {shapes.length > 0 && (
              <div className="bg-slate-950 rounded-xl border border-slate-800 p-3 flex flex-wrap gap-2">
                {shapes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => selectShape(s.id)}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                      s.id === selectedShapeId ? 'bg-slate-800 border-emerald-500' : 'bg-slate-900 border-slate-800'
                    }`}
                  >
                    <span className="w-4 h-4 rounded border border-white/20 shrink-0" style={{ backgroundColor: s.hex }} />
                    <span className="text-[10px] text-slate-300 font-medium">{s.name}</span>
                    <span className="text-[9px] text-slate-500 font-mono">{s.code}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Area / cost summary */}
            {areaSummary && (
              <div className="bg-slate-950 rounded-xl border border-slate-800 p-3.5 flex flex-wrap gap-x-6 gap-y-1 text-xs">
                <span className="text-slate-400">Area: <strong className="text-white">{areaSummary.totalArea.toFixed(1)} m²</strong></span>
                <span className="text-slate-400">Paint needed: <strong className="text-white">{areaSummary.litres} L</strong></span>
                {areaSummary.cost != null && (
                  <span className="text-slate-400">Estimated cost: <strong className="text-emerald-400">{formatNaira(areaSummary.cost)}</strong></span>
                )}
              </div>
            )}
          </div>

          {/* Right: shape details / color pickers */}
          <div className="lg:col-span-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col gap-4">
            {mode === 'coloring-new' && (
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] text-slate-400 uppercase tracking-wide">Section Name</label>
                  <input
                    type="text"
                    value={pendingShapeName}
                    onChange={(e) => setPendingShapeName(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <ColorPickerPanel
                  confirmLabel="Pick a color for this shape"
                  onPick={confirmNewShapeColor}
                  onCancel={cancelNewShapeColor}
                  recentColors={recentColors}
                  favoriteCodes={favoriteCodes}
                  onToggleFavorite={toggleFavoriteColor}
                />
              </div>
            )}

            {recoloringShapeId && (
              <ColorPickerPanel
                confirmLabel={`Recolor "${shapes.find((s) => s.id === recoloringShapeId)?.name}"`}
                onPick={applyRecolor}
                onCancel={() => setRecoloringShapeId(null)}
                recentColors={recentColors}
                favoriteCodes={favoriteCodes}
                onToggleFavorite={toggleFavoriteColor}
              />
            )}

            {!recoloringShapeId && mode !== 'coloring-new' && (
              <>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
                    {selectedShape ? 'Selected Section' : 'Sections'}
                  </h3>

                  {selectedShape ? (
                    <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                      <input
                        type="text"
                        value={selectedShape.name}
                        onChange={(e) => renameShapeLive(selectedShape.id, e.target.value)}
                        onBlur={commitRename}
                        className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg border border-white/20 shrink-0" style={{ backgroundColor: selectedShape.hex }} />
                        <span className="text-[10px] text-slate-300 font-mono">
                          {selectedShape.colorName} · {selectedShape.code} · {selectedShape.isSquare ? 'Square' : 'Rectangle'}
                        </span>
                      </div>
                      {scale && (
                        <p className="text-[10px] text-slate-500">Area: {areaForShape(selectedShape, scale).toFixed(2)} m²</p>
                      )}
                      <p className="text-[10px] text-slate-500">Drag the green handles to resize, drag inside to move, or use arrow keys to nudge.</p>
                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => setRecoloringShapeId(selectedShape.id)}
                          className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-[11px] focus:outline-none focus:ring-2 focus:ring-emerald-300"
                        >
                          Recolor
                        </button>
                        <button
                          onClick={() => duplicateShape(selectedShape.id)}
                          className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg text-[11px] focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        >
                          Duplicate
                        </button>
                        <button
                          onClick={() => requestDeleteShape(selectedShape.id)}
                          className="flex-1 py-2 bg-red-600/80 hover:bg-red-600 text-white font-bold rounded-lg text-[11px] focus:outline-none focus:ring-2 focus:ring-red-400"
                        >
                          Delete
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => bringToFront(selectedShape.id)}
                          className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-lg text-[10px] focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        >
                          Bring to Front
                        </button>
                        <button
                          onClick={() => sendToBack(selectedShape.id)}
                          className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-lg text-[10px] focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        >
                          Send to Back
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Drop a rectangle or square on the photo, or click an existing shape to select it. Every shape keeps its own
                      color, size and position independently — select any of them at any time to resize, recolor, or delete.
                    </p>
                  )}
                </div>

                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {shapes.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => selectShape(s.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter') selectShape(s.id); }}
                      className={`flex items-center justify-between p-2 rounded-lg text-xs cursor-pointer border focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                        s.id === selectedShapeId ? 'border-emerald-500 bg-slate-900' : 'border-slate-800/60 bg-slate-950 hover:bg-slate-900'
                      }`}
                    >
                      <span className="font-medium text-slate-200 truncate">{s.name}</span>
                      <div className="flex items-center space-x-2 shrink-0">
                        <span className="text-[10px] text-slate-400 font-mono">{s.code}</span>
                        <span className="w-3.5 h-3.5 rounded-full border border-slate-600" style={{ backgroundColor: s.hex }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-800 mt-auto space-y-2">
                  <button
                    onClick={() => handleSaveProject(currentProjectName || `Design ${new Date().toLocaleDateString()}`)}
                    disabled={busy === 'saving'}
                    className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white font-bold rounded-xl text-xs uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  >
                    {busy === 'saving' ? 'Saving…' : currentProjectId ? 'Save Changes' : 'Save Design'}
                  </button>
                  <button
                    onClick={handleExportPng}
                    disabled={!canExport}
                    className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white font-bold rounded-xl text-xs uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  >
                    {busy === 'exporting' ? 'Exporting…' : 'Download Flattened PNG'}
                  </button>
                  <button
                    onClick={handlePrintQuote}
                    disabled={shapes.length === 0}
                    className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white font-bold rounded-xl text-xs uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  >
                    Print / Save Quote as PDF
                  </button>
                  <button
                    onClick={handleSendToWhatsApp}
                    disabled={shapes.length === 0}
                    className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-extrabold rounded-xl text-xs uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-emerald-300"
                  >
                    Send & Book Inspection
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Settings modal — coverage rate, price, real-world scale */}
      {showSettings && (
        <Modal title="Estimate Settings" onClose={() => setShowSettings(false)}>
          <div className="space-y-5">
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide mb-2">Real-world Scale</h4>
              <p className="text-[11px] text-slate-500 mb-2">
                Tell us the true width of one section so every shape's area can be estimated automatically.
              </p>
              {scale ? (
                <div className="flex items-center justify-between bg-slate-800 rounded-lg px-3 py-2">
                  <span className="text-xs text-emerald-400 font-medium">Scale is set — areas are live.</span>
                  <button onClick={() => { setScale(null); pushToast('info', 'Scale cleared.'); }} className="text-[10px] text-slate-400 hover:text-white">
                    Clear
                  </button>
                </div>
              ) : (
                <ScaleForm shapes={shapes} onApply={applyScale} />
              )}
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide mb-2">Coverage Rate</h4>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  value={coverageRate}
                  onChange={(e) => setCoverageRate(Number(e.target.value) || 1)}
                  className="w-24 px-2.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
                />
                <span className="text-[11px] text-slate-400">m² covered per litre</span>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide mb-2">Price per Litre</h4>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-xs">₦</span>
                <input
                  type="number"
                  min={0}
                  value={pricePerLitre}
                  onChange={(e) => setPricePerLitre(e.target.value)}
                  placeholder="e.g. 8500"
                  className="flex-1 px-2.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Saved projects modal */}
      {showProjects && (
        <Modal title="My Designs" onClose={() => setShowProjects(false)} wide>
          <div className="space-y-4">
            {imageSrc && (
              <SaveProjectForm
                defaultName={currentProjectName}
                busy={busy === 'saving'}
                onSave={(name) => handleSaveProject(name)}
              />
            )}
            {savedProjects.length === 0 ? (
              <p className="text-xs text-slate-500">No saved designs yet. Build one, then save it here so you can reopen it any time.</p>
            ) : (
              <div className="space-y-2">
                {savedProjects.map((p) => (
                  <div key={p.id} className="flex items-center justify-between gap-3 bg-slate-800/60 rounded-xl px-3.5 py-3">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate">{p.name}</p>
                      <p className="text-[10px] text-slate-500">
                        Saved {new Date(p.savedAt).toLocaleDateString()} {p.hasImage ? '' : '· photo not stored'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleLoadProject(p.id)}
                        disabled={busy === 'loading'}
                        className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-[10px] focus:outline-none focus:ring-2 focus:ring-emerald-300"
                      >
                        Open
                      </button>
                      <button
                        onClick={() => requestDeleteProject(p.id, p.name)}
                        className="px-3 py-1.5 bg-slate-700 hover:bg-red-600 text-white font-bold rounded-lg text-[10px] focus:outline-none focus:ring-2 focus:ring-red-400"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Modal>
      )}

      <ConfirmDialog state={confirmState} onCancel={() => setConfirmState(null)} />
      <ToastStack toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
};

/* ---------- Small helper forms kept outside the main body for readability ---------- */
function ScaleForm({ shapes, onApply }) {
  const [shapeId, setShapeId] = useState(shapes[0]?.id || '');
  const [widthMeters, setWidthMeters] = useState('');

  if (shapes.length === 0) {
    return <p className="text-[11px] text-slate-500">Add at least one section to the photo first.</p>;
  }

  return (
    <div className="space-y-2">
      <select
        value={shapeId}
        onChange={(e) => setShapeId(e.target.value)}
        aria-label="Choose a reference section"
        className="w-full px-2.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
      >
        {shapes.map((s) => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>
      <div className="flex items-center gap-2">
        <input
          type="number"
          min={0}
          step="0.1"
          value={widthMeters}
          onChange={(e) => setWidthMeters(e.target.value)}
          placeholder="Real width in metres"
          className="flex-1 px-2.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
        />
        <button
          onClick={() => onApply(shapeId, widthMeters)}
          className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-[11px] focus:outline-none focus:ring-2 focus:ring-emerald-300"
        >
          Set Scale
        </button>
      </div>
    </div>
  );
}

function SaveProjectForm({ defaultName, busy, onSave }) {
  const [name, setName] = useState(defaultName || '');
  useEffect(() => setName(defaultName || ''), [defaultName]);
  return (
    <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name this design…"
        aria-label="Design name"
        className="flex-1 px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
      />
      <button
        onClick={() => onSave(name)}
        disabled={busy}
        className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-300"
      >
        {busy ? 'Saving…' : 'Save'}
      </button>
    </div>
  );
}

export default DesignStudio3D;
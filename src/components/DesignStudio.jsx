import React, { useState, useMemo, useCallback } from 'react';

/* ============================================================
   NIGERIAN PAINT CATALOG
   Grouped by the standard local merchandising categories used by
   Nigerian paint retailers, plus a straight Primary & Secondary
   category for the bold, undiluted hues (red/blue/green/etc.)
   that pure "designer name" shade cards usually leave out.
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

const findColor = (code) => ALL_COLORS.find((c) => c.code === code);

/* ============================================================
   SCENE TEMPLATES — real photography (Unsplash, free license).
   Each editable part references a paint code from the catalog
   above, so the studio and the palette always agree.
   ============================================================ */
const SCENE_TEMPLATES = [
  {
    id: 'bungalow',
    title: 'Modern Bungalow Exterior',
    category: 'Exterior',
    image:
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    editableParts: [
      { id: 'main_walls', name: 'Main Facade Walls', defaultCode: 'PB-W02' },
      { id: 'roof', name: 'Roof Tiles & Shingles', defaultCode: 'PB-G04' },
      { id: 'trim', name: 'Window & Door Trim', defaultCode: 'PB-G05' },
      { id: 'pillars', name: 'Front Porch Pillars', defaultCode: 'PB-W08' },
    ],
  },
  {
    id: 'living_room',
    title: 'Luxury Living Room',
    category: 'Interior',
    image:
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80',
    editableParts: [
      { id: 'feature_wall', name: 'Main Accent Wall', defaultCode: 'PB-B05' },
      { id: 'side_walls', name: 'Side Walls', defaultCode: 'PB-W06' },
      { id: 'ceiling', name: 'POP Ceiling', defaultCode: 'PB-W01' },
      { id: 'cabinets', name: 'TV Console / Woodwork', defaultCode: 'PB-E08' },
    ],
  },
  {
    id: 'retail_shop',
    title: 'Commercial Retail Shop',
    category: 'Commercial',
    image:
      'https://images.unsplash.com/photo-1580554430120-94cfcb3adf25?auto=format&fit=crop&w=1200&q=80',
    editableParts: [
      { id: 'shop_front', name: 'Shop Front Panel', defaultCode: 'PB-G05' },
      { id: 'display_wall', name: 'Interior Display Wall', defaultCode: 'PB-B02' },
      { id: 'pillars', name: 'Exterior Pillars', defaultCode: 'PB-G08' },
    ],
  },
  {
    id: 'bedroom',
    title: 'Cozy Bedroom Interior',
    category: 'Interior',
    image:
      'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1200&q=80',
    editableParts: [
      { id: 'headboard_wall', name: 'Headboard Wall', defaultCode: 'PB-E01' },
      { id: 'other_walls', name: 'Adjacent Walls', defaultCode: 'PB-W02' },
      { id: 'trim', name: 'Skirting Boards & Trim', defaultCode: 'PB-W01' },
    ],
  },
];

const buildInitialColors = (template) => {
  const map = {};
  template.editableParts.forEach((part) => {
    const swatch = findColor(part.defaultCode) || ALL_COLORS[0];
    map[part.id] = { hex: swatch.hex, name: swatch.name, code: swatch.code };
  });
  return map;
};

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
const DesignStudio3D = ({ phoneNumber = '2348000000000', businessName = 'PaintByte' }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(SCENE_TEMPLATES[0]);
  const [partColors, setPartColors] = useState(() => buildInitialColors(SCENE_TEMPLATES[0]));
  const [activePartId, setActivePartId] = useState(SCENE_TEMPLATES[0].editableParts[0].id);
  const [customParts, setCustomParts] = useState([]);
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [newSectionName, setNewSectionName] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const currentPartsList = useMemo(
    () => [...selectedTemplate.editableParts, ...customParts],
    [selectedTemplate, customParts]
  );
  const activePartObj = currentPartsList.find((p) => p.id === activePartId);
  const activePartColor = partColors[activePartId] || ALL_COLORS[0];

  const visibleColors = useMemo(
    () => (activeCategory === 'all' ? ALL_COLORS : ALL_COLORS.filter((c) => c.categoryKey === activeCategory)),
    [activeCategory]
  );

  const handleSelectTemplate = useCallback((template) => {
    setSelectedTemplate(template);
    setPartColors(buildInitialColors(template));
    setActivePartId(template.editableParts[0].id);
    setCustomParts([]);
  }, []);

  const handleApplyColor = useCallback(
    (swatch) => {
      if (!activePartId) return;
      setPartColors((prev) => ({
        ...prev,
        [activePartId]: { hex: swatch.hex, name: swatch.name, code: swatch.code },
      }));
    },
    [activePartId]
  );

  const handleAddCustomSection = useCallback(() => {
    const trimmed = newSectionName.trim();
    if (!trimmed) return;
    const newId = `custom_${Date.now()}`;
    const fallback = ALL_COLORS[0];
    setCustomParts((prev) => [...prev, { id: newId, name: trimmed }]);
    setPartColors((prev) => ({
      ...prev,
      [newId]: { hex: fallback.hex, name: fallback.name, code: fallback.code },
    }));
    setActivePartId(newId);
    setNewSectionName('');
    setIsAddingSection(false);
  }, [newSectionName]);

  const handleResetDesign = useCallback(() => {
    setPartColors(buildInitialColors(selectedTemplate));
    setCustomParts([]);
    setActivePartId(selectedTemplate.editableParts[0].id);
  }, [selectedTemplate]);

  const handleSaveAndExport = useCallback(() => {
    const summary = currentPartsList
      .map((part) => {
        const c = partColors[part.id] || ALL_COLORS[0];
        return `• *${part.name}:* ${c.name} (${c.code}) — ${c.hex}`;
      })
      .join('\n');

    const message =
      `Hi ${businessName}, I created a custom 3D visualization design on your studio:\n\n` +
      `🏠 *Template:* ${selectedTemplate.title}\n` +
      `🎨 *Color & Paint Code Specs:*\n${summary}\n\n` +
      `Can you give me an estimate to execute this exact color scheme?`;

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  }, [currentPartsList, partColors, businessName, selectedTemplate, phoneNumber]);

  return (
    <div className="w-full max-w-6xl mx-auto bg-slate-900 text-white rounded-3xl shadow-2xl overflow-hidden font-sans border border-slate-800">
      {/* Header */}
      <div className="p-6 md:p-8 bg-slate-950 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">
            PaintByte™ Interactive Studio
          </span>
          <h2 className="text-2xl md:text-3xl font-black mt-1">3D Visualization & Color Editor</h2>
          <p className="text-xs text-slate-400 mt-1">
            Select building sections and apply real Nigerian paint codes & finishes.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleResetDesign}
            className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors text-xs uppercase tracking-wide"
          >
            Reset
          </button>
          <button
            onClick={handleSaveAndExport}
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center space-x-2"
          >
            <span>Save & Export Design</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
          </button>
        </div>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Visualizer */}
        <div className="lg:col-span-8 flex flex-col space-y-6">
          <div className="relative w-full h-[380px] md:h-[460px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800">
            {/* Real photo */}
            <img
              src={selectedTemplate.image}
              alt={selectedTemplate.title}
              className="w-full h-full object-cover"
            />

            {/* Realistic paint overlay: multiply carries the photo's own shadow/highlight
                detail through the tint, soft-light adds the saturation punch a flat
                'color' blend was washing out. Both layers read the active part only —
                see the "Full palette" strip below for the complete scheme at a glance. */}
            <div
              className="absolute inset-0 pointer-events-none transition-colors duration-300"
              style={{ backgroundColor: activePartColor.hex, mixBlendMode: 'multiply', opacity: 0.5 }}
            />
            <div
              className="absolute inset-0 pointer-events-none transition-colors duration-300"
              style={{ backgroundColor: activePartColor.hex, mixBlendMode: 'soft-light', opacity: 0.35 }}
            />

            {/* Active section badge */}
            <div className="absolute top-4 left-4 bg-slate-900/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-700 text-xs flex items-center space-x-3 shadow-xl">
              <span
                className="w-5 h-5 rounded-md border border-white/50 shadow-inner shrink-0"
                style={{ backgroundColor: activePartColor.hex }}
              />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase tracking-wider">
                  Editing: {activePartObj ? activePartObj.name : ''}
                </span>
                <span className="font-bold text-white">
                  {activePartColor.name}{' '}
                  <span className="text-emerald-400">
                    {activePartColor.code} · {activePartColor.hex}
                  </span>
                </span>
              </div>
            </div>

            {/* Section selector chips */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
              {currentPartsList.map((part) => {
                const isActive = part.id === activePartId;
                const c = partColors[part.id] || ALL_COLORS[0];
                return (
                  <button
                    key={part.id}
                    onClick={() => setActivePartId(part.id)}
                    aria-pressed={isActive}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 border shadow-lg ${
                      isActive
                        ? 'bg-emerald-500 text-slate-950 border-white scale-105 ring-4 ring-emerald-500/30'
                        : 'bg-slate-900/90 text-white border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full border border-white shrink-0" style={{ backgroundColor: c.hex }} />
                    <span>{part.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Full palette preview — since one photo can only preview one tinted
              section at a time (no per-region mask data for these images), this
              strip shows the complete scheme the customer has actually built. */}
          <div className="bg-slate-950 rounded-xl border border-slate-800 p-3 flex flex-wrap gap-2">
            {currentPartsList.map((part) => {
              const c = partColors[part.id] || ALL_COLORS[0];
              return (
                <div key={part.id} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="w-4 h-4 rounded border border-white/20 shrink-0" style={{ backgroundColor: c.hex }} />
                  <span className="text-[10px] text-slate-300 font-medium">{part.name}</span>
                  <span className="text-[9px] text-slate-500 font-mono">{c.code}</span>
                </div>
              );
            })}
          </div>

          {/* Template carousel */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Explore Baseline 3D Models
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {SCENE_TEMPLATES.map((tpl) => {
                const isActive = selectedTemplate.id === tpl.id;
                return (
                  <button
                    key={tpl.id}
                    onClick={() => handleSelectTemplate(tpl)}
                    className={`p-2 rounded-xl text-left border transition-all ${
                      isActive
                        ? 'border-emerald-500 bg-slate-800/80 ring-2 ring-emerald-500/20'
                        : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                    }`}
                  >
                    <div className="h-20 w-full rounded-lg overflow-hidden mb-2 bg-slate-900">
                      <img src={tpl.image} alt={tpl.title} className="w-full h-full object-cover" />
                    </div>
                    <span className="block text-xs font-bold text-white truncate">{tpl.title}</span>
                    <span className="block text-[10px] text-slate-400">{tpl.category}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Editing tools */}
        <div className="lg:col-span-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            {/* Selected section */}
            <div className="mb-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Selected Section</h3>
              <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Target Element</span>
                  <span className="text-sm font-bold text-white">{activePartObj ? activePartObj.name : 'None'}</span>
                </div>
                <div className="w-8 h-8 rounded-lg border border-white/20 shadow shrink-0" style={{ backgroundColor: activePartColor.hex }} />
              </div>
            </div>

            {/* Palette */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Paint Palette (Nigeria)</h3>
                <span className="text-[10px] text-emerald-400 font-mono">{ALL_COLORS.length} shades</span>
              </div>

              {/* Category chips */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                    activeCategory === 'all'
                      ? 'bg-emerald-500 text-slate-950 border-emerald-500'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-600'
                  }`}
                >
                  All
                </button>
                {PAINT_CATALOG.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                      activeCategory === cat.key
                        ? 'bg-emerald-500 text-slate-950 border-emerald-500'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-600'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2.5 max-h-60 overflow-y-auto pr-1">
                {visibleColors.map((col) => {
                  const isSelected = activePartColor.code === col.code;
                  return (
                    <button
                      key={col.code}
                      onClick={() => handleApplyColor(col)}
                      aria-pressed={isSelected}
                      aria-label={`${col.name}, ${col.code}, ${col.hex}`}
                      className={`p-2 rounded-xl border transition-all text-left flex flex-col justify-between ${
                        isSelected
                          ? 'border-emerald-400 bg-slate-800 ring-2 ring-emerald-500/30'
                          : 'border-slate-800 bg-slate-900 hover:border-slate-700'
                      }`}
                    >
                      <div className="w-full h-8 rounded-lg border border-black/20 mb-2 relative" style={{ backgroundColor: col.hex }}>
                        {isSelected && (
                          <span className="absolute top-1 right-1 bg-emerald-500 text-slate-950 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center">
                            ✓
                          </span>
                        )}
                      </div>
                      <div>
                        <span className="block text-[11px] font-bold text-white leading-tight truncate">{col.name}</span>
                        <div className="flex items-center justify-between text-[9px] text-slate-400 mt-1">
                          <span>{col.code}</span>
                          <span className="font-mono">{col.hex}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom sections */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Building Sections</h3>
                <button
                  onClick={() => setIsAddingSection((v) => !v)}
                  className="text-xs text-emerald-400 font-bold hover:underline"
                >
                  {isAddingSection ? 'Cancel' : '+ Add Section'}
                </button>
              </div>

              {isAddingSection && (
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 mb-3">
                  <input
                    type="text"
                    placeholder="e.g. POP Ceiling, Balcony Railing"
                    value={newSectionName}
                    onChange={(e) => setNewSectionName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddCustomSection()}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    onClick={handleAddCustomSection}
                    className="w-full py-2 bg-emerald-500 text-slate-950 font-bold rounded-lg text-xs hover:bg-emerald-400"
                  >
                    Add Element
                  </button>
                </div>
              )}

              <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1">
                {currentPartsList.map((part) => {
                  const c = partColors[part.id] || ALL_COLORS[0];
                  return (
                    <div
                      key={part.id}
                      onClick={() => setActivePartId(part.id)}
                      className={`flex items-center justify-between p-2 rounded-lg text-xs cursor-pointer border ${
                        part.id === activePartId ? 'border-emerald-500 bg-slate-900' : 'border-slate-800/60 bg-slate-950 hover:bg-slate-900'
                      }`}
                    >
                      <span className="font-medium text-slate-200">{part.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] text-slate-400 font-mono">{c.code}</span>
                        <span className="w-3.5 h-3.5 rounded-full border border-slate-600 shrink-0" style={{ backgroundColor: c.hex }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 mt-4">
            <button
              onClick={handleSaveAndExport}
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold rounded-xl shadow-lg shadow-emerald-500/20 transition-all text-xs uppercase tracking-wider"
            >
              Export & Book Inspection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignStudio3D;
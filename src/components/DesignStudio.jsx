import React, { useState } from 'react';

// Template presets for users to choose from
const SCENE_TEMPLATES = [
  {
    id: 'bungalow',
    title: 'Modern Bungalow Exterior',
    category: 'Exterior',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    editableParts: [
      { id: 'main_walls', name: 'Main Facade Walls', defaultColor: '#f8fafc', colorName: 'Chantilly Pure White' },
      { id: 'roof', name: 'Roof Tiles & Shingles', defaultColor: '#1e293b', colorName: 'Charcoal Black' },
      { id: 'trim', name: 'Window & Door Trim', defaultColor: '#0f172a', colorName: 'Ebony Midnight' },
      { id: 'pillars', name: 'Front Porch Pillars', defaultColor: '#e2e8f0', colorName: 'Satin Cream' },
    ]
  },
  {
    id: 'living_room',
    title: 'Luxury Living Room',
    category: 'Interior',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    editableParts: [
      { id: 'feature_wall', name: 'Main Accent Wall', defaultColor: '#1e3a8a', colorName: 'Royal Navy Blue' },
      { id: 'side_walls', name: 'Side Walls', defaultColor: '#f1f5f9', colorName: 'Light Oyster' },
      { id: 'ceiling', name: 'POP Ceiling', defaultColor: '#ffffff', colorName: 'Chantilly Pure White' },
      { id: 'cabinets', name: 'TV Console / Woodwork', defaultColor: '#78350f', colorName: 'Ibadan Earth Brown' },
    ]
  },
  {
    id: 'retail_shop',
    title: 'Commercial Retail Shop',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80',
    editableParts: [
      { id: 'shop_front', name: 'Shop Front Panel', defaultColor: '#0f172a', colorName: 'Ebony Midnight' },
      { id: 'display_wall', name: 'Interior Display Wall', defaultColor: '#e0e7ff', colorName: 'Soft Breeze Blue' },
      { id: 'pillars', name: 'Exterior Pillars', defaultColor: '#64748b', colorName: 'Slate Gray' },
    ]
  },
  {
    id: 'bedroom',
    title: 'Cozy Bedroom Interior',
    category: 'Interior',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1000&q=80',
    editableParts: [
      { id: 'headboard_wall', name: 'Headboard Wall', defaultColor: '#047857', colorName: 'Emerald Green' },
      { id: 'other_walls', name: 'Adjacent Walls', defaultColor: '#f8fafc', colorName: 'Chantilly Pure White' },
      { id: 'trim', name: 'Skirting Boards & Trim', defaultColor: '#ffffff', colorName: 'Chantilly Pure White' },
    ]
  }
];

// Expanded Nigerian Paint Color Palette (Standard Local Shades & Codes)
const NIGERIAN_PAINT_PALETTE = [
  { name: 'Chantilly Pure White', hex: '#FFFFFF', code: 'PB-001', category: 'Neutral' },
  { name: 'Satin Cream / Vanilla', hex: '#FDFBF7', code: 'PB-002', category: 'Neutral' },
  { name: 'Warm Off-White', hex: '#F3EFE0', code: 'PB-003', category: 'Neutral' },
  { name: 'Bodija Sand / Beige', hex: '#E5D3B3', code: 'PB-004', category: 'Earth' },
  { name: 'Ibadan Earth Brown', hex: '#78350F', code: 'PB-005', category: 'Earth' },
  { name: 'Warm Terracotta Brick', hex: '#C2410C', code: 'PB-006', category: 'Earth' },
  { name: 'Lekki Stone Gray', hex: '#94A3B8', code: 'PB-007', category: 'Neutral' },
  { name: 'Slate Gray', hex: '#64748B', code: 'PB-008', category: 'Neutral' },
  { name: 'Charcoal Black', hex: '#1E293B', code: 'PB-009', category: 'Dark' },
  { name: 'Ebony Midnight', hex: '#0F172A', code: 'PB-010', category: 'Dark' },
  { name: 'Emerald Green', hex: '#047857', code: 'PB-011', category: 'Accent' },
  { name: 'Soft Sage Green', hex: '#A7F3D0', code: 'PB-012', category: 'Accent' },
  { name: 'Royal Navy Blue', hex: '#1E3A8A', code: 'PB-013', category: 'Accent' },
  { name: 'Soft Breeze Blue', hex: '#E0E7FF', code: 'PB-014', category: 'Accent' },
  { name: 'Mustard Gold / Ochre', hex: '#D97706', code: 'PB-015', category: 'Accent' },
];

const DesignStudio3D = ({ phoneNumber = "2348000000000", businessName = "PaintByte" }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(SCENE_TEMPLATES[0]);
  
  // Track hex code and color name for each section
  const [partColors, setPartColors] = useState(() => {
    const initial = {};
    SCENE_TEMPLATES[0].editableParts.forEach(part => {
      initial[part.id] = { hex: part.defaultColor, name: part.colorName || 'Default' };
    });
    return initial;
  });

  const [activePartId, setActivePartId] = useState(SCENE_TEMPLATES[0].editableParts[0].id);
  const [customParts, setCustomParts] = useState([]);
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [newSectionName, setNewSectionName] = useState('');

  // Handle template selection change
  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    const updated = {};
    template.editableParts.forEach(part => {
      updated[part.id] = { hex: part.defaultColor, name: part.colorName || 'Default' };
    });
    setPartColors(updated);
    setActivePartId(template.editableParts[0].id);
    setCustomParts([]);
  };

  // Apply selected color box to active section
  const handleApplyColor = (colorObj) => {
    if (!activePartId) return;
    setPartColors(prev => ({
      ...prev,
      [activePartId]: { hex: colorObj.hex, name: `${colorObj.name} (${colorObj.code})` }
    }));
  };

  // Add custom section dynamically
  const handleAddCustomSection = (e) => {
    e.preventDefault();
    if (!newSectionName.trim()) return;
    const newId = `custom_${Date.now()}`;
    const defaultColorObj = NIGERIAN_PAINT_PALETTE[0];
    const newPart = {
      id: newId,
      name: newSectionName,
      defaultColor: defaultColorObj.hex,
      colorName: defaultColorObj.name
    };
    setCustomParts(prev => [...prev, newPart]);
    setPartColors(prev => ({ 
      ...prev, 
      [newId]: { hex: defaultColorObj.hex, name: `${defaultColorObj.name} (${defaultColorObj.code})` } 
    }));
    setActivePartId(newId);
    setNewSectionName('');
    setIsAddingSection(false);
  };

  // Save / Export Design state
  const handleSaveAndExport = () => {
    const allParts = [...selectedTemplate.editableParts, ...customParts];
    const designSummary = allParts.map(part => {
      const colorData = partColors[part.id] || { hex: part.defaultColor, name: 'Default' };
      return `• *${part.name}:* ${colorData.name} - ${colorData.hex}`;
    }).join('\n');

    const message = 
      `Hi ${businessName}, I created a custom 3D visualization design on your studio:\n\n` +
      `🏠 *Template:* ${selectedTemplate.title}\n` +
      `🎨 *Color & Paint Code Specs:* \n${designSummary}\n\n` +
      `Can you give me an estimate to execute this exact color scheme?`;

    const encodedMsg = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMsg}`, '_blank', 'noopener,noreferrer');
  };

  const currentPartsList = [...selectedTemplate.editableParts, ...customParts];
  const activePartObj = currentPartsList.find(p => p.id === activePartId);
  const activePartColor = partColors[activePartId] || { hex: '#FFFFFF', name: 'White' };

  return (
    <div className="w-full max-w-6xl mx-auto bg-slate-900 text-white rounded-3xl shadow-2xl overflow-hidden font-sans border border-slate-800">
      {/* Studio Header */}
      <div className="p-6 md:p-8 bg-slate-950 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">PaintByte™ Interactive Studio</span>
          <h2 className="text-2xl md:text-3xl font-black mt-1">3D Visualization & Color Editor</h2>
          <p className="text-xs text-slate-400 mt-1">Select building sections and apply Nigerian paint codes & standard finishes.</p>
        </div>
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

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Visualizer Window */}
        <div className="lg:col-span-8 flex flex-col space-y-6">
          <div className="relative w-full h-[380px] md:h-[460px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 group">
            {/* Background Image of Selected Template */}
            <img 
              src={selectedTemplate.image} 
              alt={selectedTemplate.title} 
              className="w-full h-full object-cover opacity-80"
            />

            {/* Color Overlay Simulation */}
            <div 
              className="absolute inset-0 pointer-events-none transition-colors duration-300 mix-blend-color opacity-40"
              style={{ backgroundColor: activePartColor.hex }}
            />

            {/* Active Part & Color Badge */}
            <div className="absolute top-4 left-4 bg-slate-900/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-700 text-xs flex items-center space-x-3 shadow-xl">
              <span 
                className="w-5 h-5 rounded-md border border-white/50 shadow-inner" 
                style={{ backgroundColor: activePartColor.hex }}
              />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Editing: {activePartObj ? activePartObj.name : ''}</span>
                <span className="font-bold text-white">{activePartColor.name} <span className="text-emerald-400">({activePartColor.hex})</span></span>
              </div>
            </div>

            {/* Interactive Section Pin Markers */}
            <div className="absolute inset-0 p-6 flex flex-wrap items-center justify-center gap-4">
              {currentPartsList.map((part) => {
                const isActive = part.id === activePartId;
                const partColorData = partColors[part.id] || { hex: '#ffffff' };
                return (
                  <button
                    key={part.id}
                    onClick={() => setActivePartId(part.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 border shadow-lg ${
                      isActive 
                        ? 'bg-emerald-500 text-slate-950 border-white scale-105 ring-4 ring-emerald-500/30' 
                        : 'bg-slate-900/90 text-white border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <span 
                      className="w-3 h-3 rounded-full border border-white" 
                      style={{ backgroundColor: partColorData.hex }}
                    />
                    <span>EDIT: {part.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Template Selection Carousel */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Explore Baseline 3D Models
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {SCENE_TEMPLATES.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => handleSelectTemplate(tpl)}
                  className={`p-2 rounded-xl text-left border transition-all ${
                    selectedTemplate.id === tpl.id
                      ? 'border-emerald-500 bg-slate-800/80 ring-2 ring-emerald-500/20'
                      : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                  }`}
                >
                  <div className="h-20 w-full rounded-lg overflow-hidden mb-2">
                    <img src={tpl.image} alt={tpl.title} className="w-full h-full object-cover" />
                  </div>
                  <span className="block text-xs font-bold text-white truncate">{tpl.title}</span>
                  <span className="block text-[10px] text-slate-400">{tpl.category}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Editing Tools & Nigerian Color Palette */}
        <div className="lg:col-span-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            {/* Active Section Info Card */}
            <div className="mb-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
                Selected Section
              </h3>
              <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Target Element</span>
                  <span className="text-sm font-bold text-white">{activePartObj ? activePartObj.name : 'None'}</span>
                </div>
                <div 
                  className="w-8 h-8 rounded-lg border border-white/20 shadow"
                  style={{ backgroundColor: activePartColor.hex }}
                />
              </div>
            </div>

            {/* Interactive Color Box Palette */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                  Paint Palette (Nigeria)
                </h3>
                <span className="text-[10px] text-emerald-400 font-mono">15 Standard Shades</span>
              </div>

              {/* Color Boxes Grid with Tooltips/Labels */}
              <div className="grid grid-cols-3 gap-2.5 max-h-60 overflow-y-auto pr-1">
                {NIGERIAN_PAINT_PALETTE.map((col) => {
                  const isSelected = activePartColor.hex === col.hex;
                  return (
                    <button
                      key={col.code}
                      onClick={() => handleApplyColor(col)}
                      className={`p-2 rounded-xl border transition-all text-left flex flex-col justify-between ${
                        isSelected 
                          ? 'border-emerald-400 bg-slate-800 ring-2 ring-emerald-500/30' 
                          : 'border-slate-800 bg-slate-900 hover:border-slate-700'
                      }`}
                    >
                      {/* Color Box Swatch */}
                      <div 
                        className="w-full h-8 rounded-lg border border-black/20 mb-2 relative"
                        style={{ backgroundColor: col.hex }}
                      >
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

            {/* Custom Section Add Tool */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                  Building Sections
                </h3>
                <button
                  onClick={() => setIsAddingSection(!isAddingSection)}
                  className="text-xs text-emerald-400 font-bold hover:underline"
                >
                  {isAddingSection ? 'Cancel' : '+ Add Section'}
                </button>
              </div>

              {isAddingSection && (
                <form onSubmit={handleAddCustomSection} className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 mb-3">
                  <input
                    type="text"
                    placeholder="e.g. POP Ceiling, Balcony Railing"
                    value={newSectionName}
                    onChange={(e) => setNewSectionName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 bg-emerald-500 text-slate-950 font-bold rounded-lg text-xs hover:bg-emerald-400"
                  >
                    Add Element
                  </button>
                </form>
              )}

              <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1">
                {currentPartsList.map((part) => {
                  const colorData = partColors[part.id] || { hex: '#ffffff', name: 'White' };
                  return (
                    <div 
                      key={part.id}
                      onClick={() => setActivePartId(part.id)}
                      className={`flex items-center justify-between p-2 rounded-lg text-xs cursor-pointer border ${
                        part.id === activePartId 
                          ? 'border-emerald-500 bg-slate-900' 
                          : 'border-slate-800/60 bg-slate-950 hover:bg-slate-900'
                      }`}
                    >
                      <span className="font-medium text-slate-200">{part.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] text-slate-400 font-mono">{colorData.hex}</span>
                        <span 
                          className="w-3.5 h-3.5 rounded-full border border-slate-600" 
                          style={{ backgroundColor: colorData.hex }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Export Action */}
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
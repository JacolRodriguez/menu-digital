import React from 'react';

export default function CategorySidebar({ isOpen, onClose, categories, activeCategory, onSelectCategory, restaurantName, logo }) {
  if (!isOpen) return null;

  // Se agregó el ícono de fuego para mantener la consistencia con App.jsx
  const allCategories = [{ id: 'all', name: '🔥 Todos los productos' }, ...categories];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Fondo oscuro con desenfoque */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Panel Deslizante Lateral (Drawer) */}
      <div className="relative w-80 max-w-[85%] bg-slate-900 h-full shadow-2xl border-r border-white/10 flex flex-col z-10">
        
        {/* Cabecera del Panel */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-3 overflow-hidden">
            <img 
              src={logo} 
              alt={restaurantName} 
              className="w-11 h-11 rounded-xl object-cover border border-white/10 shrink-0" 
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80";
              }}
            />
            <div className="overflow-hidden">
              <h3 className="font-black text-xs text-white uppercase truncate">{restaurantName}</h3>
              <p className="text-[11px] text-red-400 font-semibold uppercase tracking-wider">Categorías</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition shrink-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Lista de Categorías con tamaño equilibrado */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {allCategories.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  onClose();
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-[13px] font-bold transition-all flex items-center justify-between ${
                  isActive
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/25 border border-red-400/30'
                    : 'bg-slate-950/40 text-slate-200 hover:bg-slate-800 hover:text-white border border-white/5'
                }`}
              >
                <span>{cat.name}</span>
                {isActive && <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>}
              </button>
            );
          })}
        </div>

        {/* Pie del Panel */}
        <div className="p-4 border-t border-white/10 text-center bg-slate-950/40">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
            Menú Digital Profesional
          </p>
        </div>
      </div>
    </div>
  );
}
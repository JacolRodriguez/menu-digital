import React from 'react';

export default function CategoryNav({ categories, activeCategory, onSelectCategory }) {
  const allCategories = [{ id: 'all', name: '✨ Todos' }, ...categories];

  return (
    <nav className="px-4 py-3 bg-slate-950/85 backdrop-blur-xl border-b border-white/10 sticky top-[136px] z-40 shadow-md">
      {/* Contenedor en diseño flexible (wrap) para evitar scroll horizontal en móviles */}
      <div className="max-w-md mx-auto flex flex-wrap justify-center gap-2">
        {allCategories.map(cat => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-300 active:scale-95 ${
              activeCategory === cat.id
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30 scale-105 border border-red-400/30'
                : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-white/10'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </nav>
  );
}
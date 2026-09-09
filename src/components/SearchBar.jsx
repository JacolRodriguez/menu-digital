import React from 'react';

export default function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="relative w-full">
      {/* Ícono de búsqueda */}
      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </span>

      {/* 
        NOTA CLAVE: 'text-base' (16px) es indispensable en móvil 
        para evitar que iOS Safari active el auto-zoom al enfocar.
      */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Buscar hamburguesa, taco, pechurina..."
        className="w-full pl-10 pr-10 py-2.5 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-xl text-base md:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20 transition shadow-inner"
      />

      {/* Botón de limpiar */}
      {searchTerm && (
        <button
          onClick={() => onSearchChange('')}
          aria-label="Limpiar búsqueda"
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-white transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
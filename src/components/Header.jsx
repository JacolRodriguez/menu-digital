import React from 'react';

/**
 * COMPONENTE: Header (Header.jsx)
 * -------------------------------------------------------------
 * Cabecera con identidad centrada, textura de fondo intacta
 * y una barra de controles unificada (Categorías + Buscador compacto)
 * sin botones flotantes a los extremos.
 */
export default function Header({ 
  restaurantName, 
  address, 
  logo, 
  onOpenSidebar, 
  searchTerm = '', 
  onSearchChange = () => {} 
}) {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-xl border-b border-white/10 px-4 pt-4 pb-3 shadow-xl relative overflow-hidden transition-all">
      
      {/* Fondo decorativo lateral derecho con máscara degradada intacta */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-56 md:w-80 pointer-events-none select-none opacity-50 filter brightness-125 saturate-200 contrast-110"
        style={{
          maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 25%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 25%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0) 100%)'
        }}
      >
        <img 
          src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80" 
          alt="Textura de fondo" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Contenedor central con ancho adaptado para móvil y pantallas grandes */}
      <div className="max-w-md md:max-w-2xl lg:max-w-3xl mx-auto relative z-10 flex flex-col items-center text-center">
        
        {/* IDENTIDAD DE LA MARCA: Logotipo, Nombre y Dirección */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-red-500/40 shadow-lg bg-slate-900 flex items-center justify-center p-1 mb-2">
          <img 
            src={logo} 
            alt={restaurantName} 
            className="w-full h-full object-cover rounded-xl"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80";
            }}
          />
        </div>

        <div className="space-y-0.5 mb-3">
          <h1 className="text-sm sm:text-base font-black tracking-wide text-white uppercase line-clamp-1">
            {restaurantName}
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-300 font-medium line-clamp-1">
            {address}
          </p>
        </div>

        {/* BARRA DE ACCIÓN UNIFICADA: Categorías + Buscador compacto */}
        <div className="w-full flex items-center gap-2 pt-1">
          
          {/* Botón de Categorías elegante y compacto */}
          <button 
            onClick={onOpenSidebar}
            className="h-10 px-3.5 rounded-xl bg-slate-900 border border-white/10 hover:border-red-500/40 text-white hover:text-red-400 transition active:scale-95 flex items-center gap-2 shrink-0 shadow-md group"
            aria-label="Abrir categorías"
          >
            <svg className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Menú</span>
          </button>

          {/* Campo de búsqueda integrado */}
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>

            {/* 'text-base' previene el auto-zoom en iPhone */}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar plato, taco, yaroa..."
              className="w-full h-10 pl-9 pr-8 bg-slate-900/90 border border-white/10 focus:border-red-500/50 rounded-xl text-base md:text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition shadow-inner"
            />

            {/* Botón para limpiar búsqueda rápida */}
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                aria-label="Limpiar búsqueda"
                className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400 hover:text-white transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}
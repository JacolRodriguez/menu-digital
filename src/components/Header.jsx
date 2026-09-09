import React from 'react';

export default function Header({ restaurantName, address, logo, onOpenSidebar }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-xl border-b border-white/10 px-4 py-3.5 shadow-xl">
      {/* Añadimos 'relative' aquí para que el botón flote alineado a este contenedor */}
      <div className="max-w-md mx-auto relative flex flex-col items-center text-center">
        
        {/* Botón de menú flotante a la izquierda (ya no empuja el contenido hacia abajo) */}
        <div className="absolute left-0 top-0">
          <button 
            onClick={onOpenSidebar}
            className="p-3.5 rounded-2xl bg-slate-900 border border-white/10 text-slate-100 hover:text-red-400 hover:bg-slate-800 transition active:scale-95 flex items-center justify-center shadow-lg"
            aria-label="Abrir categorías"
          >
            <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* Contenedor central: Logo, Nombre y Dirección (Ahora sube y se alinea mejor) */}
        <div className="flex flex-col items-center space-y-2">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border border-red-500/40 shadow-lg bg-slate-900 flex items-center justify-center p-1">
            <img 
              src={logo} 
              alt={restaurantName} 
              className="w-full h-full object-cover rounded-xl"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80";
              }}
            />
          </div>

          <div className="space-y-0.5">
            <h1 className="text-sm font-black tracking-wide text-white uppercase">
              {restaurantName}
            </h1>
            <p className="text-xs text-slate-300 font-medium">
               {address}
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}
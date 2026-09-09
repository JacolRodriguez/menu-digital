import React from 'react';

export default function Header({ restaurantName, address, logo, onOpenSidebar }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-xl border-b border-white/10 px-4 py-4 shadow-xl relative overflow-hidden">
      
      {/* Fondo integrado lateral derecho más vivo, brillante y colorido */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-56 md:w-80 pointer-events-none select-none opacity-55 filter brightness-125 saturate-200 contrast-110"
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

      {/* Contenedor adaptado con max-w para iPad Pro y pantallas grandes */}
      <div className="max-w-md md:max-w-3xl lg:max-w-4xl mx-auto relative flex flex-col items-center text-center z-10">
        
        {/* Botón de menú a la izquierda */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2">
          <button 
            onClick={onOpenSidebar}
            className="p-3.5 rounded-2xl bg-slate-900 border border-white/10 text-slate-100 hover:text-red-400 hover:bg-slate-800 transition active:scale-95 flex items-center justify-center shadow-lg group"
            aria-label="Abrir categorías"
            title="Categorías"
          >
            <svg className="w-7 h-7 text-red-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* Contenedor central: Logo, Nombre y Dirección */}
        <div className="flex flex-col items-center space-y-2">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border border-red-500/40 shadow-lg bg-slate-900 flex items-center justify-center p-1">
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
            <h1 className="text-sm md:text-base font-black tracking-wide text-white uppercase">
              {restaurantName}
            </h1>
            <p className="text-xs md:text-sm text-slate-300 font-medium">
               {address}
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}
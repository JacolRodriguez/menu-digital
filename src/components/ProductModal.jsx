import React from 'react';

export default function ProductModal({ item, isOpen, onClose, quantity, onAdd, onRemove }) {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Fondo oscuro con desenfoque */}
      <div 
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Ventana Modal */}
      <div className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10">
        
        {/* Botón de cerrar */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-slate-950/80 hover:bg-slate-950 text-slate-300 hover:text-white p-2.5 rounded-full backdrop-blur-md transition shadow-lg"
          aria-label="Cerrar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {/* Imagen Ampliada con Insignia */}
        <div className="w-full h-56 relative bg-slate-950 overflow-hidden">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover filter saturate-125"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=500&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>

          {/* Insignia de Más Vendido (si aplica) */}
          {item.isPopular && (
            <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-red-600 to-orange-600 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg shadow-red-600/40 border border-red-400/30 flex items-center gap-1.5 animate-pulse">
              <span>🔥</span> Más Vendido
            </div>
          )}
        </div>

        {/* Detalles del Producto */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-xl font-black text-white tracking-tight">{item.name}</h3>
            <p className="text-red-400 font-extrabold text-xl mt-1">${item.price}</p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Descripción Completa</h4>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-3.5 rounded-2xl border border-white/5">
              {item.description}
            </p>
          </div>

          {/* Acciones dentro del modal */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">
              {quantity > 0 ? `En tu carrito: ${quantity}` : 'Aún no agregado'}
            </span>

            <div className="flex items-center gap-3">
              {quantity === 0 ? (
                <button 
                  onClick={() => {
                    onAdd(item);
                  }}
                  className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-black text-xs px-5 py-3.5 rounded-2xl transition-all shadow-xl shadow-red-600/30 active:scale-95 flex items-center gap-2 uppercase tracking-wider"
                >
                  <span>Agregar al pedido</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path>
                  </svg>
                </button>
              ) : (
                <div className="flex items-center bg-slate-950 rounded-2xl border border-red-500/50 overflow-hidden shadow-lg p-1">
                  <button 
                    onClick={() => onRemove(item.id)}
                    className="w-9 h-9 rounded-xl bg-slate-900 text-slate-200 hover:bg-slate-800 transition font-black text-sm flex items-center justify-center active:scale-95"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-black text-red-400 text-sm">{quantity}</span>
                  <button 
                    onClick={() => onAdd(item)}
                    className="w-9 h-9 rounded-xl bg-slate-900 text-slate-200 hover:bg-slate-800 transition font-black text-sm flex items-center justify-center active:scale-95"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';

export default function MenuItemCard({ item, quantity = 0, onAdd, onRemove, onSelect }) {
  return (
    <div 
      onClick={() => onSelect(item)}
      className={`group relative bg-slate-900/60 backdrop-blur-xl rounded-2xl overflow-hidden border transition-all duration-300 flex p-3.5 gap-3.5 shadow-xl cursor-pointer ${
        quantity > 0
          ? 'border-red-500 bg-slate-900/90 shadow-red-500/10'
          : 'border-white/10 hover:border-red-500/40 hover:bg-slate-900/90'
      }`}
    >
      {/* Imagen del producto */}
      <div className="w-28 h-28 relative shrink-0 rounded-xl overflow-hidden bg-slate-800">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Detalles y Controles */}
      <div className="flex flex-col justify-between flex-1 py-0.5">
        <div>
          <h3 className="font-bold text-sm tracking-tight text-slate-100 group-hover:text-red-400 transition-colors">
            {item.name}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {item.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="font-extrabold text-red-400 text-sm tracking-tight">
            ${item.price}
          </span>
          
          {/* Botones con stopPropagation para que no abran el modal al hacer clic en + o - */}
          {quantity === 0 ? (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onAdd(item);
              }}
              className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all duration-200 active:scale-95 shadow-lg shadow-red-600/20 flex items-center gap-1.5"
            >
              <span>Agregar</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path>
              </svg>
            </button>
          ) : (
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="flex items-center bg-slate-800 rounded-xl border border-red-500/40 overflow-hidden shadow-md"
            >
              <button 
                onClick={() => onRemove(item.id)}
                className="px-2.5 py-1 text-slate-300 hover:bg-slate-700 transition font-bold text-xs"
              >
                -
              </button>
              <span className="px-2 text-xs font-bold text-red-400">{quantity}</span>
              <button 
                onClick={() => onAdd(item)}
                className="px-2.5 py-1 text-slate-300 hover:bg-slate-700 transition font-bold text-xs"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
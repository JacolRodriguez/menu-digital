import React from 'react';

/**
 * COMPONENTE: MenuItemCard (MenuItemCard.jsx)
 * -------------------------------------------------------------
 * Tarjeta individual para mostrar cada platillo o bebida en la cuadrícula.
 * Permite previsualizar imagen, precio y descripción, además de gestionar
 * la adición rápida al pedido o abrir el modal de detalles completos.
 * 
 * @param {Object} props.item - Datos del producto (id, name, description, price, image).
 * @param {number} props.quantity - Cantidad de este producto actualmente en el carrito.
 * @param {Function} props.onAdd - Callback para añadir o incrementar el producto.
 * @param {Function} props.onRemove - Callback para decrementar la cantidad del producto.
 * @param {Function} props.onSelect - Callback que abre el modal con la información detallada.
 */
export default function MenuItemCard({ item, quantity = 0, onAdd, onRemove, onSelect }) {
  if (!item) return null;

  return (
    <div 
      onClick={() => onSelect(item)}
      className={`group relative bg-slate-900/60 backdrop-blur-xl rounded-2xl overflow-hidden border transition-all duration-300 flex p-3.5 gap-3.5 shadow-xl cursor-pointer ${
        quantity > 0
          ? 'border-red-500 bg-slate-900/90 shadow-red-500/10 ring-1 ring-red-500/20'
          : 'border-white/10 hover:border-red-500/40 hover:bg-slate-900/90'
      }`}
    >
      {/* 
        CONTENEDOR DE IMAGEN
        Incluye lazy loading para acelerar la carga en conexiones móviles 
        y fallback automático en caso de enlace roto.
      */}
      <div className="w-28 h-28 relative shrink-0 rounded-xl overflow-hidden bg-slate-800">
        <img 
          src={item.image} 
          alt={item.name} 
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=300&q=80";
          }}
        />
      </div>

      {/* DETALLES DEL PLATILLO Y CONTROLES DE ACCIÓN */}
      <div className="flex flex-col justify-between flex-1 py-0.5 min-w-0">
        <div>
          <h3 className="font-bold text-sm tracking-tight text-slate-100 group-hover:text-red-400 transition-colors truncate">
            {item.name}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* PIE DE TARJETA: Precio y Acciones de Carrito */}
        <div className="flex items-center justify-between mt-3">
          <span className="font-extrabold text-red-400 text-sm tracking-tight">
            RD${item.price}
          </span>
          
          {/* 
            Los botones usan stopPropagation() para evitar que el clic 
            dispare el evento onClick del contenedor padre (abrir modal).
          */}
          {quantity === 0 ? (
            /* Botón inicial de agregar */
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onAdd(item);
              }}
              aria-label={`Agregar ${item.name} al pedido`}
              className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all duration-200 active:scale-95 shadow-lg shadow-red-600/20 flex items-center gap-1.5"
            >
              <span>Agregar</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path>
              </svg>
            </button>
          ) : (
            /* Contador interactivo (+ / -) cuando el plato ya está en el carrito */
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="flex items-center bg-slate-800 rounded-xl border border-red-500/40 overflow-hidden shadow-md"
            >
              <button 
                onClick={() => onRemove(item.id)}
                aria-label={`Quitar una unidad de ${item.name}`}
                className="px-2.5 py-1 text-slate-300 hover:bg-slate-700 transition font-bold text-xs"
              >
                -
              </button>
              <span className="px-2 text-xs font-bold text-red-400 min-w-[20px] text-center">
                {quantity}
              </span>
              <button 
                onClick={() => onAdd(item)}
                aria-label={`Agregar otra unidad de ${item.name}`}
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
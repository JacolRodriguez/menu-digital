import React from 'react';

/**
 * COMPONENTE: ProductModal (ProductModal.jsx)
 * -------------------------------------------------------------
 * Ventana emergente (modal) que despliega la información detallada
 * de un producto seleccionado y permite gestionar su cantidad
 * dentro del pedido antes de enviarlo por WhatsApp.
 * 
 * @param {Object} props.item - Objeto con los datos del producto actual.
 * @param {boolean} props.isOpen - Bandera que determina si el modal es visible.
 * @param {Function} props.onClose - Función para cerrar la ventana modal.
 * @param {number} props.quantity - Cantidad actual de este producto en el carrito.
 * @param {Function} props.onAdd - Callback para añadir o incrementar el producto.
 * @param {Function} props.onRemove - Callback para decrementar la cantidad del producto.
 */
export default function ProductModal({ item, isOpen, onClose, quantity = 0, onAdd, onRemove }) {
  // Guardia de renderizado: si el modal no está activo o no hay producto, no dibuja nada en el DOM
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 
        FONDO OSCURO CON DESENFOQUE (BACKDROP)
        Se mantiene como elemento independiente para que los clics fuera del modal lo cierren.
      */}
      <div 
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* 
        CONTENEDOR PRINCIPAL DEL MODAL
        Diseño flotante con bordes redondeados y estilo moderno en modo oscuro.
      */}
      <div className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* BOTÓN DE CIERRE SUPERIOR */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-slate-950/80 hover:bg-slate-950 text-slate-300 hover:text-white p-2.5 rounded-full backdrop-blur-md transition shadow-lg"
          aria-label="Cerrar modal de producto"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {/* 
          CABECERA CON IMAGEN Y DEGRADADO
          Muestra la fotografía a tamaño completo y la insignia promocional si aplica.
        */}
        <div className="w-full h-56 relative bg-slate-950 overflow-hidden">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover filter saturate-125"
            onError={(e) => {
              // Previene bucles infinitos si la imagen de respaldo tampoco carga
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=500&q=80";
            }}
          />
          {/* Sombra degradada para mejorar el contraste visual con el contenido inferior */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>

          {/* INSIGNIA DESTACADA (Renderizado condicional si isPopular es true) */}
          {item.isPopular && (
            <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-red-600 to-orange-600 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg shadow-red-600/40 border border-red-400/30 flex items-center gap-1.5 animate-pulse">
              <span>🔥</span> Más Vendido
            </div>
          )}
        </div>

        {/* 
          CUERPO DEL MODAL (DETALLES DEL PRODUCTO)
        */}
        <div className="p-6 space-y-4">
          {/* Nombre y Precio */}
          <div>
            <h3 className="text-xl font-black text-white tracking-tight">{item.name}</h3>
            <p className="text-red-400 font-extrabold text-xl mt-1">RD${item.price}</p>
          </div>

          {/* Bloque descriptivo con contenedor contrastado */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Descripción Completa</h4>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-3.5 rounded-2xl border border-white/5">
              {item.description}
            </p>
          </div>

          {/* 
            SECCIÓN DE ACCIONES Y GESTIÓN DE CANTIDADES
            Muestra el estado actual del carrito para este plato y los controles de incremento/decremento.
          */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">
              {quantity > 0 ? `En tu pedido: ${quantity}` : 'Aún no agregado'}
            </span>

            <div className="flex items-center gap-3">
              {quantity === 0 ? (
                /* Botón de añadir inicial cuando no hay unidades seleccionadas */
                <button 
                  onClick={() => onAdd(item)}
                  className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-black text-xs px-5 py-3.5 rounded-2xl transition-all shadow-xl shadow-red-600/30 active:scale-95 flex items-center gap-2 uppercase tracking-wider"
                >
                  <span>Agregar al pedido</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path>
                  </svg>
                </button>
              ) : (
                /* Selector numérico interactivo (+ / -) cuando ya existen unidades */
                <div className="flex items-center bg-slate-950 rounded-2xl border border-red-500/50 overflow-hidden shadow-lg p-1">
                  <button 
                    onClick={() => onRemove(item.id)}
                    aria-label="Disminuir cantidad"
                    className="w-9 h-9 rounded-xl bg-slate-900 text-slate-200 hover:bg-slate-800 transition font-black text-sm flex items-center justify-center active:scale-95"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-black text-red-400 text-sm">{quantity}</span>
                  <button 
                    onClick={() => onAdd(item)}
                    aria-label="Aumentar cantidad"
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
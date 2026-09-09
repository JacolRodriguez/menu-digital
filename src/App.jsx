import React, { useState } from 'react';
import { menuData } from './data/menuData';
import Header from './components/Header';
import CategorySidebar from './components/CategorySidebar';
import MenuItemCard from './components/MenuItemCard';
import ProductModal from './components/ProductModal';

/**
 * COMPONENTE PRINCIPAL: App.jsx
 * -------------------------------------------------------------
 * Administra el catálogo de productos, la búsqueda reactiva integrada en el Header,
 * el filtrado por categorías, la persistencia del carrito en memoria y
 * la estructuración del pedido para WhatsApp.
 */
export default function App() {
  // =========================================================================
  // ESTADOS DE LA APLICACIÓN
  // =========================================================================
  
  // Categoría activa seleccionada ('all' para mostrar todo el catálogo)
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Término de búsqueda en vivo controlado desde la cabecera
  const [searchTerm, setSearchTerm] = useState('');
  
  // Control de visibilidad del Drawer lateral de categorías
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Objeto de carrito: { [itemId]: { name, price, quantity } }
  const [cart, setCart] = useState({});
  
  // Modalidad del pedido: 'pickup' (Retiro en local) o 'delivery' (A domicilio)
  const [orderType, setOrderType] = useState('pickup');
  
  // Producto actualmente seleccionado para inspección en el modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Control de visibilidad del modal de detalle
  const [isModalOpen, setIsModalOpen] = useState(false);

  // =========================================================================
  // LÓGICA DE FILTRADO (CATEGORÍA + BÚSQUEDA)
  // =========================================================================
  const filteredItems = menuData.items.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const cleanSearch = searchTerm.toLowerCase().trim();
    const matchesSearch = cleanSearch === '' || 
      item.name.toLowerCase().includes(cleanSearch) || 
      item.description.toLowerCase().includes(cleanSearch);

    return matchesCategory && matchesSearch;
  });

  // =========================================================================
  // GESTIÓN DEL CARRITO (MUTACIONES SEGURAS)
  // =========================================================================

  /**
   * Añade un producto al carrito o incrementa su cantidad si ya existe.
   */
  const handleAdd = (item) => {
    setCart(prev => ({
      ...prev,
      [item.id]: {
        name: item.name,
        price: item.price,
        quantity: (prev[item.id]?.quantity || 0) + 1
      }
    }));
  };

  /**
   * Reduce la cantidad de un producto o lo elimina del carrito si llega a 0.
   * Incluye guarda de seguridad para evitar excepciones de tipo undefined.
   */
  const handleRemove = (itemId) => {
    setCart(prev => {
      if (!prev[itemId]) return prev;
      const copy = { ...prev };
      if (copy[itemId].quantity > 1) {
        copy[itemId].quantity -= 1;
      } else {
        delete copy[itemId];
      }
      return copy;
    });
  };

  // Cálculos dinámicos de totales para el carrito
  const totalItemsCount = Object.values(cart).reduce((acc, curr) => acc + curr.quantity, 0);
  const totalPrice = Object.values(cart).reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);

  // =========================================================================
  // GENERACIÓN DEL TICKET Y ENLACE DE WHATSAPP
  // =========================================================================

  /**
   * Ensambla el ticket de pedido con numeración correlativa y lo envía a WhatsApp.
   */
  const handleSendWhatsAppOrder = () => {
    const serviceType = orderType === 'delivery' ? '🛵 Delivery a domicilio' : '🥡 Retirar en local';
    
    // Fechas y horas formateadas en zona horaria local
    const now = new Date();
    const dateStr = now.toLocaleDateString('es-DO', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('es-DO', { hour: '2-digit', minute: '2-digit' });
    
    // Lectura segura del correlativo en localStorage
    let currentTicket = 1;
    try {
      const storedTicket = localStorage.getItem('korexdev_ticket_seq');
      currentTicket = storedTicket ? parseInt(storedTicket, 10) : 1;
      if (isNaN(currentTicket)) currentTicket = 1;
      localStorage.setItem('korexdev_ticket_seq', String(currentTicket + 1));
    } catch {
      currentTicket = Math.floor(Math.random() * 900) + 100;
    }

    const ticketNumber = String(currentTicket).padStart(3, '0');

    // Ensamblado de ticket formateado para WhatsApp
    let message = `*🧾 TICKET DE PEDIDO #${ticketNumber}*\n`;
    message += `🏪 *${menuData.restaurantName}*\n`;
    message += `📅 Fecha: ${dateStr} - ${timeStr}\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `📍 *Modalidad:* ${serviceType}\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    message += `🛒 *DETALLE DE PRODUCTOS:*\n`;
    Object.values(cart).forEach(i => {
      message += `▫️ *${i.quantity}x* ${i.name}\n`;
      message += `   └ Subtotal: _$${i.price * i.quantity}_\n`;
    });

    message += `\n━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `💵 *Monto de productos: $${totalPrice}*\n`;
    if (orderType === 'delivery') {
      message += `🛵 *Envío:* _(Pendiente de cotizar zona)_\n`;
    }
    message += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `_¡Hola! Quedo atento/a a la confirmación de este pedido y el total final._ ✨`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${menuData.whatsappNumber}?text=${encoded}`;
    
    // Apertura protegida contra Reverse Tabnabbing
    const newWindow = window.open(whatsappUrl, '_blank');
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  // Nombre de la categoría actual visible en el filtro
  const currentCategoryName = activeCategory === 'all' 
    ? '🔥 Todos los productos' 
    : menuData.categories.find(c => c.id === activeCategory)?.name || '';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-44 selection:bg-red-600 selection:text-white">
      
      {/* Encabezado fijo con la lupa y búsqueda integrada */}
      <Header 
        restaurantName={menuData.restaurantName} 
        address={menuData.address} 
        logo={menuData.logo}
        onOpenSidebar={() => setIsSidebarOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      {/* Panel lateral deslizable para navegación de categorías */}
      <CategorySidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        categories={menuData.categories}
        activeCategory={activeCategory}
        onSelectCategory={(catId) => {
          setActiveCategory(catId);
          setSearchTerm(''); // Limpia la búsqueda activa al cambiar de categoría
        }}
        restaurantName={menuData.restaurantName}
        logo={menuData.logo}
      />

      {/* Modal emergente para detalle y cantidades del producto */}
      <ProductModal 
        item={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        quantity={selectedProduct ? cart[selectedProduct.id]?.quantity || 0 : 0}
        onAdd={handleAdd}
        onRemove={handleRemove}
      />

      {/* Indicador de estado del filtro activo */}
      <div className="max-w-md md:max-w-3xl lg:max-w-4xl mx-auto px-4 pt-4 pb-2">
        <h2 className="w-full block text-center text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400 bg-slate-900/60 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/5 shadow-sm">
          {searchTerm.trim() !== '' ? (
            <span>Resultados para: <span className="text-red-400">"{searchTerm}"</span></span>
          ) : (
            <span>Mostrando: <span className="text-red-400">{currentCategoryName}</span></span>
          )}
        </h2>
      </div>

      {/* Cuadrícula responsiva de platillos con fallback si no hay coincidencias */}
      <main className="max-w-md md:max-w-3xl lg:max-w-4xl mx-auto p-4 pt-1 grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <MenuItemCard 
              key={item.id} 
              item={item} 
              quantity={cart[item.id]?.quantity || 0}
              onAdd={handleAdd}
              onRemove={handleRemove}
              onSelect={(prod) => {
                setSelectedProduct(prod);
                setIsModalOpen(true);
              }}
            />
          ))
        ) : (
          <div className="col-span-full py-12 px-4 text-center text-slate-400 bg-slate-900/30 rounded-2xl border border-white/5">
            <p className="text-3xl mb-2">🔍</p>
            <p className="text-sm font-bold text-white">No se encontraron productos</p>
            <p className="text-xs text-slate-400 mt-1">Prueba con otra palabra o limpia el campo de búsqueda.</p>
          </div>
        )}
      </main>

      {/* Pie de página con créditos */}
      <footer className="max-w-md md:max-w-3xl lg:max-w-4xl mx-auto px-4 mt-8 mb-6 flex flex-col items-center text-center opacity-85">
        <div className="w-12 h-[2px] bg-white/10 mb-4 rounded-full"></div>
        <p className="text-[11px] text-slate-400 font-medium">
          © {new Date().getFullYear()} {menuData.restaurantName}. Todos los derechos reservados.
        </p>
        <p className="text-[10px] text-slate-500 mt-1.5 uppercase tracking-widest font-bold">
          Desarrollado por <span className="text-red-500/90 font-black">KorexDev</span>
        </p>
      </footer>

      {/* Barra flotante del pedido activo (Visible cuando hay al menos 1 producto agregado) */}
      {totalItemsCount > 0 && (
        <div className="fixed bottom-4 left-4 right-4 max-w-md md:max-w-xl mx-auto z-40 animate-bounce-short">
          <div className="bg-slate-900/95 backdrop-blur-xl text-white p-4 rounded-2xl shadow-2xl border border-white/10 space-y-3">
            
            {/* Selector de servicio: Retiro en tienda o Entrega a domicilio */}
            <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl border border-white/5">
              <button
                onClick={() => setOrderType('pickup')}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  orderType === 'pickup'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🥡 Retirar en local
              </button>
              <button
                onClick={() => setOrderType('delivery')}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  orderType === 'delivery'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🛵 Pedir Delivery
              </button>
            </div>

            {/* Total acumulado y botón de envío directo a WhatsApp */}
            <div className="flex items-center justify-between pt-1">
              <div>
                <p className="text-[11px] font-medium text-slate-400">
                  {totalItemsCount} {totalItemsCount === 1 ? 'artículo' : 'artículos'}
                </p>
                <p className="text-lg font-black tracking-tight text-red-400">${totalPrice}</p>
              </div>
              
              <button 
                onClick={handleSendWhatsAppOrder}
                className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-xs px-4 py-3 rounded-xl transition shadow-lg shadow-red-600/30 flex items-center gap-2 active:scale-95"
              >
                <span>Enviar a WhatsApp</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
export const menuData = {
  restaurantName: "D' Lucy Sabor Familiar",
  whatsappNumber: "18096277777",
  address: "Esq. Josesito, D.M. Baitoa, Santiago, R.D.",
  logo: `${import.meta.env.BASE_URL}D-LUCY-Sabor-Familiar-burger.jpg`,
  
  categories: [
    { id: "hamburguesas", name: "🍔 Hamburguesas" },
    { id: "tacos", name: "🌮 Tacos" },
    { id: "sandwiches", name: "🥪 Sandwiches" },
    { id: "picaderas", name: "🍗 Pica Pollo" },
    { id: "yaroas", name: "🍟 Yaroas" },
    { id: "bebidas", name: "🥤 Bebidas" }
  ],
  
  items: [
    // --- HAMBURGUESAS (Con y sin papas por separado) ---
    {
      id: 1,
      category: "hamburguesas",
      name: "Hamburguesa Clásica (Con Papas)",
      description: "Carne de res jugosa, queso cheddar, lechuga, tomate y salsa de la casa. Incluye porción de papas fritas.",
      price: 200, // <--- Precio con papas (ajusta si es distinto)
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      category: "hamburguesas",
      name: "Hamburguesa Clásica (Sola)",
      description: "Carne de res jugosa, queso cheddar, lechuga, tomate y salsa de la casa. (No incluye papas).",
      price: 150, // <--- Precio sola
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      category: "hamburguesas",
      name: "Hamburguesa Especial D' Lucy (Con Papas)",
      description: "Doble carne, bacon crujiente, doble cheddar, cebolla caramelizada, lechuga y tomate. Incluye papas fritas.",
      price: 300, // <--- Precio con papas
      image: "https://images.unsplash.com/photo-1594212202875-86da4969f5cb?auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 4,
      category: "hamburguesas",
      name: "Hamburguesa Especial D' Lucy (Sola)",
      description: "Doble carne, bacon crujiente, doble cheddar, cebolla caramelizada, lechuga y tomate. (No incluye papas).",
      price: 250, // <--- Precio sola
      image: "https://images.unsplash.com/photo-1594212202875-86da4969f5cb?auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 5,
      category: "hamburguesas",
      name: "Hamburguesa de Pollo Crispy (Con Papas)",
      description: "Pechuga de pollo empanizada y crujiente, queso suizo, lechuga, tomate y mayonesa de ajo. Incluye papas fritas.",
      price: 230, // <--- Precio con papas
      image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 6,
      category: "hamburguesas",
      name: "Hamburguesa de Pollo Crispy (Sola)",
      description: "Pechuga de pollo empanizada y crujiente, queso suizo, lechuga, tomate y mayonesa de ajo. (No incluye papas).",
      price: 180, // <--- Precio sola
      image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=500&q=80"
    },

    // --- TACOS (UNIDAD - GRANDES Y PEQUEÑOS) ---
    {
      id: 7,
      category: "tacos",
      name: "Taco de Res (Pequeño)",
      description: "1 Taco suave pequeño relleno de carne de res sazonada, cilantro, cebolla y limón.",
      price: 70,
      image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 8,
      category: "tacos",
      name: "Taco de Res (Grande)",
      description: "1 Taco suave grande relleno de carne de res sazonada, cilantro, cebolla y limón.",
      price: 120,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 9,
      category: "tacos",
      name: "Taco de Pollo (Pequeño)",
      description: "1 Taco suave pequeño relleno de pollo desmenuzado, queso fresco y pico de gallo.",
      price: 60,
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 10,
      category: "tacos",
      name: "Taco de Pollo (Grande)",
      description: "1 Taco suave grande relleno de pollo desmenuzado, queso fresco y pico de gallo.",
      price: 100,
      image: "https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?auto=format&fit=crop&w=500&q=80"
    },

    // --- SANDWICHES ---
    {
      id: 11,
      category: "sandwiches",
      name: "Club Sandwich Tradicional",
      description: "Tres capas de pan tostado con jamón, queso, pollo desmenuzado, bacon, lechuga y tomate. Acompañado de papas fritas.",
      price: 280,
      image: "https://cafedelaflor.com/images/productos/202306011605339.jpg"
    },
    {
      id: 12,
      category: "sandwiches",
      name: "Sandwich de Jamón y Queso",
      description: "Pan de agua o de molde tostado a la plancha, relleno de abundante jamón y queso danés derretido.",
      price: 120,
      image: "https://recetinas.com/wp-content/uploads/2022/06/sandwich-de-tomate-jamon-y-queso.jpg"
    },

    // --- PICADERAS Y POLLO ---
    {
      id: 13,
      category: "picaderas",
      name: "Pechurinas Crujientes",
      description: "Tiras de pechuga de pollo marinadas, empanizadas y fritas hasta quedar doradas. Acompañadas de salsa rosada y papas fritas o tostones.",
      price: 300,
      image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 14,
      category: "picaderas",
      name: "Servicio de Pollo Frito",
      description: "Piezas de pollo frito tradicional, sazonado con orégano y especias. Servido con papas fritas o tostones (fritos verdes).",
      price: 250,
      image: "https://images.unsplash.com/photo-1569691899455-88464f6d3ab1?auto=format&fit=crop&w=500&q=80"
    },

    // --- YAROAS ---
    {
      id: 15,
      category: "yaroas",
      name: "Yaroa de Plátano Maduro",
      description: "Base de plátano maduro majado, cubierta de carne a elegir (pollo, res o pierna), abundante queso derretido, kétchup y mayonesa.",
      price: 200,
      image: "https://images.unsplash.com/photo-1599487532386-8f328135835b?auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 16,
      category: "yaroas",
      name: "Yaroa de Papas Fritas",
      description: "Base de papas fritas crujientes, cubierta de carne a elegir (pollo, res o pierna), mucho queso derretido, kétchup y mayonesa.",
      price: 200,
      image: "https://static.wixstatic.com/media/ca5c65_060997d8bfb648ffb07ac2bb492a9cda~mv2.png/v1/fill/w_1536,h_1024,al_c/ChatGPT%20Image%2021%20ene%202026%2C%2002_21_23%20p.m..png"
    },

    // --- BEBIDAS ---
    {
      id: 17,
      category: "bebidas",
      name: "Coca-Cola (20 oz)",
      description: "Refresco Coca-Cola bien frío en botella plástica.",
      price: 50,
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 18,
      category: "bebidas",
      name: "Jugo Natural de Chinola",
      description: "Jugo de maracuyá (chinola) recién hecho, refrescante y natural.",
      price: 70,
      image: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=500&q=80"
    }
  ]
};
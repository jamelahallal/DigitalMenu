export const seedMenuItems = [
  {
    id: 1,
    name: "Fresh Orange Juice",
    description: "100% freshly squeezed oranges, no sugar added",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&h=300&fit=crop",
    category: "drinks",
    badge: "Popular"
  },
  {
    id: 2,
    name: "Caramel Macchiato",
    description: "Espresso with vanilla syrup, steamed milk, and caramel drizzle",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400&h=300&fit=crop",
    category: "drinks",
    badge: "Bestseller"
  },
  {
    id: 3,
    name: "Iced Latte",
    description: "Chilled espresso with milk served over ice",
    price: 4.49,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop",
    category: "drinks"
  },
  {
    id: 4,
    name: "Mint Lemonade",
    description: "Fresh lemon juice with mint leaves and honey",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=300&fit=crop",
    category: "drinks"
  },
  {
    id: 5,
    name: "Hot Chocolate",
    description: "Rich dark chocolate with steamed milk and whipped cream",
    price: 4.29,
    image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400&h=300&fit=crop",
    category: "drinks"
  },
  {
    id: 6,
    name: "Margherita Pizza",
    description: "Fresh mozzarella, tomatoes, basil, and olive oil",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop",
    category: "food",
    badge: "Chef's Pick"
  },
  {
    id: 7,
    name: "Classic Burger",
    description: "Beef patty, lettuce, tomato, onion, with special sauce",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    category: "food"
  },
  {
    id: 8,
    name: "Caesar Salad",
    description: "Romaine lettuce, parmesan, croutons, with Caesar dressing",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1550304943-4f24f54dd8cf?w=400&h=300&fit=crop",
    category: "food"
  },
  {
    id: 9,
    name: "Pasta Carbonara",
    description: "Spaghetti with eggs, pecorino cheese, pancetta, and pepper",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop",
    category: "food"
  },
  {
    id: 10,
    name: "Grilled Salmon",
    description: "Fresh salmon with lemon butter sauce and vegetables",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
    category: "food"
  },
  {
    id: 11,
    name: "Chocolate Cake",
    description: "Rich chocolate layer cake with ganache frosting",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1b958e?w=400&h=300&fit=crop",
    category: "desserts"
  },
  {
    id: 12,
    name: "Cheesecake",
    description: "New York style cheesecake with berry compote",
    price: 6.49,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop",
    category: "desserts"
  },
  {
    id: 13,
    name: "Ice Cream Sundae",
    description: "Vanilla ice cream with chocolate sauce and cherry",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop",
    category: "desserts"
  },
  {
    id: 14,
    name: "Fruit Tart",
    description: "Fresh seasonal fruits on vanilla custard",
    price: 5.49,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop",
    category: "desserts"
  },
  {
    id: 15,
    name: "Tiramisu",
    description: "Coffee-flavored Italian dessert with mascarpone",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
    category: "desserts"
  }
];

// Helper function to initialize localStorage with seed data if empty
export const initializeMenuItems = () => {
  const existingItems = localStorage.getItem('menuItems');
  if (!existingItems) {
    localStorage.setItem('menuItems', JSON.stringify(seedMenuItems));
  }
  return JSON.parse(localStorage.getItem('menuItems'));
};

export const getAllItems = () => {
  return JSON.parse(localStorage.getItem('menuItems')) || [];
};
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";

// --- Catalog with images ---
const CATALOG = [
  { id: "1", name: "Espresso", price: 180, category: "coffee", image: "/assets/products/espresso.jpg", note: "Double shot" },
  { id: "2", name: "Cappuccino", price: 250, category: "coffee", image: "/assets/products/cappuccino.jpg" },
  { id: "3", name: "Latte", price: 280, category: "coffee", image: "/assets/products/latte.jpg" },
  { id: "4", name: "Croissant", price: 220, category: "bakery", image: "/assets/products/croissant.png" },
  { id: "5", name: "Blueberry Muffin", price: 200, category: "bakery", image: "/assets/products/muffin.png" },
  { id: "6", name: "Sourdough Loaf", price: 320, category: "bakery", image: "/assets/products/sourdough.png" },
  { id: "7", name: "iPhone Cable", price: 1200, category: "electronics", image: "/assets/products/iphone-cable.png" },
  { id: "8", name: "Earbuds", price: 2400, category: "electronics", image: "/assets/products/earbuds.png" },
  { id: "9", name: "AA Batteries (4)", price: 360, category: "electronics", image: "/assets/products/batteries.png" },
  { id: "10", name: "Fresh Milk 1L", price: 160, category: "groceries", image: "/assets/products/milk.png" },
  { id: "11", name: "Free-Range Eggs (6)", price: 340, category: "groceries", image: "/assets/products/eggs.png" },
  { id: "12", name: "Granola", price: 540, category: "groceries", image: "/assets/products/granola.png" },
];

// --- Main POS Component ---
export default function POSApp() {
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const categories = ["all", ...new Set(CATALOG.map((p) => p.category))];
  const filteredCatalog = activeCategory === "all"
    ? CATALOG
    : CATALOG.filter((p) => p.category === activeCategory);

  return (
    <div className="grid grid-cols-12 h-screen bg-neutral-50">
      {/* Catalog */}
      <div className="col-span-8 p-6 overflow-y-auto">
        <div className="flex gap-2 mb-6">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              onClick={() => setActiveCategory(cat)}
              className="capitalize rounded-xl"
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {filteredCatalog.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ProductCard product={product} onAdd={() => addToCart(product)} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cart */}
      <div className="col-span-4 p-6 border-l bg-white flex flex-col">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <ShoppingCart className="size-5" /> Cart
        </h2>
        <div className="flex-1 overflow-y-auto space-y-4">
          {cart.map((item) => (
            <Card key={item.id} className="rounded-xl shadow-sm">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-neutral-500">
                    {item.qty} × KSh {item.price}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">KSh {item.qty * item.price}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="size-4 text-red-500" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="pt-4 border-t mt-4">
          <p className="text-lg font-semibold">Total: KSh {total}</p>
          <Button className="w-full mt-3 rounded-xl py-6 text-lg">
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}

// --- Product Card ---
function ProductCard({ product, onAdd }) {
  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer" onClick={onAdd}>
      <CardContent className="p-4">
        <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-b from-black/[0.04] to-white">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <h3 className="mt-3 font-medium text-neutral-800">{product.name}</h3>
        <p className="text-sm text-neutral-500">KSh {product.price}</p>
      </CardContent>
    </Card>
  );
}

import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, Search, MapPin, User, Star, Plus, Minus, X, Trash2, 
  ChevronRight, Clock, CheckCircle2, Truck, Utensils, Flame, 
  ShieldCheck, ArrowRight, Tag, LayoutDashboard, Bike, 
  ChevronDown, Heart, Check, CreditCard, QrCode, Banknote, Sparkles, SlidersHorizontal,
  PlusCircle
} from 'lucide-react';

// --- INITIAL MOCK DATA & CONSTANTS ---

const FEATURED_RESTAURANTS = [
  {
    id: 'r1',
    name: 'Artisan Pizza Kitchen',
    cuisine: 'Italian • Pizza • Gourmet',
    rating: 4.8,
    reviewsCount: 320,
    deliveryTime: '20-30 min',
    deliveryFee: 0,
    isFeatured: true,
    hasFreeDelivery: true,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    tags: ['Pizza', 'Italian']
  },
  {
    id: 'r2',
    name: 'Smash & Craft Burgers',
    cuisine: 'American • Wagyu • Fries',
    rating: 4.6,
    reviewsCount: 450,
    deliveryTime: '15-25 min',
    deliveryFee: 0,
    isFeatured: true,
    hasFreeDelivery: true,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    tags: ['Burger', 'American']
  },
  {
    id: 'r3',
    name: 'Sakura Sushi Bar',
    cuisine: 'Japanese • Sushi • Asian',
    rating: 4.9,
    reviewsCount: 510,
    deliveryTime: '25-35 min',
    deliveryFee: 2.99,
    isFeatured: true,
    hasFreeDelivery: false,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
    tags: ['Sushi', 'Japanese']
  }
];

const INITIAL_CATEGORIES = [
  { id: 'all', name: 'All Cuisines', icon: '🍽️' },
  { id: 'pizza', name: 'Pizza', icon: '🍕' },
  { id: 'burger', name: 'Burgers', icon: '🍔' },
  { id: 'sushi', name: 'Sushi & Asian', icon: '🍣' },
  { id: 'classics', name: 'Curries & Bowls', icon: '🍲' },
  { id: 'pasta', name: 'Italian & Pasta', icon: '🍝' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
  { id: 'beverages', name: 'Drinks', icon: '🍹' }
];

const INITIAL_MENU = [
  {
    id: 'm1',
    name: 'Truffle Mushroom & Burrata Pizza',
    category: 'pizza',
    restaurant: 'Artisan Pizza Kitchen',
    price: 18.99,
    rating: 4.9,
    reviewsCount: 142,
    isVeg: true,
    isChefSpecial: true,
    description: 'Hand-stretched sourdough base, wild black truffle cream, double burrata, roasted mushrooms, fresh basil.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    available: true,
    sizes: [
      { id: 'regular', name: 'Medium 10"', extraPrice: 0 },
      { id: 'large', name: 'Large 14"', extraPrice: 6.00 }
    ],
    crusts: [
      { id: 'sourdough', name: 'Classic Sourdough', extraPrice: 0 },
      { id: 'cheese-burst', name: 'Four-Cheese Burst', extraPrice: 3.50 }
    ],
    toppings: [
      { id: 't1', name: 'Extra Burrata', price: 3.00 },
      { id: 't2', name: 'Caramelized Onions', price: 1.50 }
    ]
  },
  {
    id: 'm2',
    name: 'Smoked Wagyu Double Smash Burger',
    category: 'burger',
    restaurant: 'Smash & Craft Burgers',
    price: 16.49,
    rating: 4.8,
    reviewsCount: 230,
    isVeg: false,
    isChefSpecial: true,
    description: 'Dual smashed Wagyu beef patties, aged cheddar, smoked bacon jam, truffle aioli on toasted brioche.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    available: true,
    sizes: [
      { id: 'single', name: 'Single Patty', extraPrice: -3.00 },
      { id: 'double', name: 'Double Patty', extraPrice: 0 },
      { id: 'triple', name: 'Triple Monster', extraPrice: 4.50 }
    ]
  },
  {
    id: 'm3',
    name: 'Dragon Salmon Roll & Nigiri Platter',
    category: 'sushi',
    restaurant: 'Sakura Sushi Bar',
    price: 21.50,
    rating: 4.9,
    reviewsCount: 310,
    isVeg: false,
    isChefSpecial: true,
    description: 'Fresh Atlantic salmon, avocado, spicy mayo, toasted sesame, flying fish roe, wasabi and pickled ginger.',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
    available: true
  },
  {
    id: 'm4',
    name: 'Fiery Panang Curry Ramen Bowl',
    category: 'classics',
    restaurant: 'Sakura Sushi Bar',
    price: 15.99,
    rating: 4.7,
    reviewsCount: 98,
    isVeg: false,
    isChefSpecial: false,
    description: 'Rich Thai Panang coconut curry broth, handmade ramen noodles, grilled chicken, charred bok choy, chili oil.',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    available: true
  },
  {
    id: 'm5',
    name: 'Old Delhi Butter Chicken & Garlic Naan',
    category: 'classics',
    restaurant: 'Khana Indian Kitchen',
    price: 17.50,
    rating: 4.95,
    reviewsCount: 310,
    isVeg: false,
    isChefSpecial: true,
    description: 'Tandoor-roasted chicken tikka simmered in rich velvety tomato, butter, and fenugreek gravy. Served with 2 garlic naans.',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80',
    available: true
  },
  {
    id: 'm6',
    name: 'Pesto Genovese Penne with Stracciatella',
    category: 'pasta',
    restaurant: 'Artisan Pizza Kitchen',
    price: 14.99,
    rating: 4.6,
    reviewsCount: 88,
    isVeg: true,
    isChefSpecial: false,
    description: 'Fresh basil and pine nut pesto tossed with bronze-cut penne, topped with creamy stracciatella cheese.',
    image: 'https://images.unsplash.com/photo-1621996346565-e3def6164286?auto=format&fit=crop&w=800&q=80',
    available: true
  },
  {
    id: 'm7',
    name: 'Molten Belgian Chocolate Lava Cake',
    category: 'desserts',
    restaurant: 'Artisan Pizza Kitchen',
    price: 7.99,
    rating: 4.9,
    reviewsCount: 420,
    isVeg: true,
    isChefSpecial: true,
    description: 'Warm chocolate cake with an oozing dark Belgian chocolate center. Served with Madagascan vanilla scoop.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    available: true
  }
];

const INITIAL_COUPONS = [
  { code: 'KHANA50', type: 'percent', value: 50, maxDiscount: 15, minOrder: 25, active: true },
  { code: 'FREEDEL', type: 'free_delivery', value: 3.99, minOrder: 15, active: true }
];

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [menuItems, setMenuItems] = useLocalStorage('khana_menu', INITIAL_MENU);
  const [coupons, setCoupons] = useLocalStorage('khana_coupons', INITIAL_COUPONS);
  const [orders, setOrders] = useLocalStorage('khana_orders', [
    {
      id: 'ORD-8921',
      date: new Date(Date.now() - 3600000 * 2).toISOString(),
      items: [
        { ...INITIAL_MENU[0], quantity: 1 }
      ],
      subtotal: 18.99,
      discount: 0,
      deliveryFee: 0,
      tip: 2.00,
      total: 20.99,
      status: 'Out for Delivery',
      fulfillment: 'delivery',
      address: '742 Evergreen Terrace, New York, NY',
      paymentMethod: 'CARD',
      estimatedTime: '15 mins'
    }
  ]);
  const [favorites, setFavorites] = useLocalStorage('khana_favs', ['m1', 'm3']);

  // Cart & Checkout state
  const [cart, setCart] = useLocalStorage('khana_cart', []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [tipAmount, setTipAmount] = useState(3.00);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('New York, NY');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDish, setSelectedDish] = useState(null);
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState(orders[0]?.id || null);

  // Cart Calculations
  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => {
      let itemPrice = item.price;
      if (item.selectedSize?.extraPrice) itemPrice += item.selectedSize.extraPrice;
      if (item.selectedCrust?.extraPrice) itemPrice += item.selectedCrust.extraPrice;
      if (item.selectedToppings) {
        itemPrice += item.selectedToppings.reduce((tAcc, t) => tAcc + t.price, 0);
      }
      return acc + (itemPrice * item.quantity);
    }, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (subtotal < appliedCoupon.minOrder) return 0;
    if (appliedCoupon.type === 'percent') {
      const calc = (subtotal * appliedCoupon.value) / 100;
      return appliedCoupon.maxDiscount ? Math.min(calc, appliedCoupon.maxDiscount) : calc;
    }
    return 0;
  }, [subtotal, appliedCoupon]);

  const deliveryFee = useMemo(() => {
    if (appliedCoupon?.type === 'free_delivery') return 0;
    return cart.length > 0 ? 2.99 : 0;
  }, [cart, appliedCoupon]);

  const grandTotal = useMemo(() => {
    return Math.max(0, subtotal - discountAmount + deliveryFee + (cart.length > 0 ? tipAmount : 0));
  }, [subtotal, discountAmount, deliveryFee, tipAmount, cart]);

  const addToCart = (dish, customOptions = {}) => {
    const cartItemId = `${dish.id}-${customOptions.selectedSize?.id || 'std'}-${customOptions.selectedCrust?.id || 'std'}`;
    setCart(prev => {
      const existingIdx = prev.findIndex(item => item.cartItemId === cartItemId);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += (customOptions.quantity || 1);
        return updated;
      } else {
        return [...prev, {
          ...dish,
          cartItemId,
          quantity: customOptions.quantity || 1,
          selectedSize: customOptions.selectedSize || null,
          selectedCrust: customOptions.selectedCrust || null,
          selectedToppings: customOptions.selectedToppings || []
        }];
      }
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const handleApplyCoupon = (codeToApply) => {
    const code = (codeToApply || couponInput).trim().toUpperCase();
    const found = coupons.find(c => c.code === code && c.active);
    if (!found) {
      setCouponError('Invalid coupon code');
      return;
    }
    setAppliedCoupon(found);
    setCouponError('');
  };

  // Modern Checkout Modal State
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [fulfillmentType, setFulfillmentType] = useState('delivery');
  const [deliveryAddress, setDeliveryAddress] = useState('742 Evergreen Terrace, New York, NY');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [upiId, setUpiId] = useState('');

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    setCheckoutStep(3);
    setTimeout(() => {
      const newOrder = {
        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toISOString(),
        items: [...cart],
        subtotal,
        discount: discountAmount,
        deliveryFee,
        tip: tipAmount,
        total: grandTotal,
        status: 'Kitchen Preparing',
        fulfillment: fulfillmentType,
        address: deliveryAddress,
        paymentMethod: paymentMethod.toUpperCase(),
        estimatedTime: '20-30 mins'
      };
      setOrders(prev => [newOrder, ...prev]);
      setActiveTrackingOrderId(newOrder.id);
      setCart([]);
      setAppliedCoupon(null);
      setCheckoutStep(0);
      setIsCartOpen(false);
      setCurrentView('tracking');
    }, 1500);
  };

  const activeOrder = useMemo(() => {
    return orders.find(o => o.id === activeTrackingOrderId) || orders[0];
  }, [orders, activeTrackingOrderId]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-800 font-sans flex flex-col selection:bg-orange-500 selection:text-white">
      
      {/* --- TOP KHANA NAVIGATION BAR --- */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          
          {/* Logo & Location Dropdown */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button 
              onClick={() => setCurrentView('home')} 
              className="flex items-center gap-2.5 focus:outline-none group"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-600 to-orange-500 flex items-center justify-center shadow-md shadow-orange-500/30 group-hover:scale-105 transition-transform">
                <span className="text-white font-black text-lg font-serif">K</span>
              </div>
              <span className="text-2xl font-black tracking-tight text-slate-900">
                Khana
              </span>
            </button>

            {/* Location Pill */}
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 transition cursor-pointer">
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              <span>{locationQuery}</span>
            </div>
          </div>

          {/* Top Search Input */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <input 
              type="text" 
              placeholder="Search restaurants or cuisines..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentView !== 'menu') setCurrentView('menu');
              }}
              className="w-full bg-slate-100/80 border border-slate-200/80 rounded-full px-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
            />
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-full text-xs font-semibold text-slate-600">
              <button
                onClick={() => setCurrentView('home')}
                className={`px-3 py-1.5 rounded-full transition ${currentView === 'home' ? 'bg-white text-orange-600 shadow-sm font-bold' : 'hover:text-slate-900'}`}
              >
                Home
              </button>
              <button
                onClick={() => setCurrentView('menu')}
                className={`px-3 py-1.5 rounded-full transition ${currentView === 'menu' ? 'bg-white text-orange-600 shadow-sm font-bold' : 'hover:text-slate-900'}`}
              >
                Menu
              </button>
              <button
                onClick={() => setCurrentView('tracking')}
                className={`px-3 py-1.5 rounded-full transition relative ${currentView === 'tracking' ? 'bg-white text-orange-600 shadow-sm font-bold' : 'hover:text-slate-900'}`}
              >
                Status
                {orders.some(o => o.status !== 'Delivered') && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full animate-ping" />
                )}
              </button>
              <button
                onClick={() => setCurrentView('admin')}
                className={`px-3 py-1.5 rounded-full transition flex items-center gap-1 ${currentView === 'admin' ? 'bg-slate-900 text-white shadow-sm' : 'hover:text-slate-900'}`}
              >
                <LayoutDashboard className="w-3 h-3" />
                Admin
              </button>
            </nav>

            {/* Cart Orange Button */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-bold px-4 py-2 rounded-full transition shadow-md shadow-orange-500/30 text-xs"
            >
              <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
              <span>Cart</span>
              {cart.reduce((a, b) => a + b.quantity, 0) > 0 && (
                <span className="bg-white text-orange-600 text-[11px] font-black px-1.5 py-0.2 rounded-full ml-0.5">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>

          </div>

        </div>
      </header>

      {/* --- MAIN PAGE VIEW --- */}
      <main className="flex-1 w-full">

        {/* 1. KHANA HOME HERO & FEATURED RESTAURANTS VIEW */}
        {currentView === 'home' && (
          <div className="space-y-12 pb-16 animate-in fade-in duration-300">
            
            {/* HERO BANNER SECTION WITH IMAGE OVERLAY */}
            <div className="relative bg-slate-900 min-h-[480px] sm:min-h-[520px] flex items-center justify-center overflow-hidden">
              {/* Background Dish Image */}
              <img 
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=80" 
                alt="Khana Hero Table"
                className="absolute inset-0 w-full h-full object-cover object-center opacity-45 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/60 to-slate-950/80" />

              <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6 py-16">
                
                {/* Restaurant Count Pill */}
                <div className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-white text-xs px-3.5 py-1.5 rounded-full font-medium">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  Over 200+ restaurants in your area
                </div>

                {/* Main Headline matching Image */}
                <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none font-sans">
                  Great food, <br />
                  <span className="text-orange-500 font-serif italic font-normal">delivered fast.</span>
                </h1>

                <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-normal leading-relaxed">
                  Discover restaurants near you. From sushi to pizza — freshly prepared and at your door in minutes.
                </p>

                {/* Hero Search Capsule Card */}
                <div className="max-w-2xl mx-auto bg-white p-2 sm:p-2.5 rounded-full sm:rounded-full shadow-2xl flex flex-col sm:flex-row items-center gap-2">
                  
                  {/* Location Pin Segment */}
                  <div className="flex items-center gap-2 px-4 py-2 border-b sm:border-b-0 sm:border-r border-slate-200 w-full sm:w-auto">
                    <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                    <input 
                      type="text"
                      value={locationQuery}
                      onChange={(e) => setLocationQuery(e.target.value)}
                      className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none w-28"
                    />
                  </div>

                  {/* Food Search Input */}
                  <div className="flex-1 flex items-center gap-2 px-3 w-full">
                    <Search className="w-4 h-4 text-slate-400 shrink-0" />
                    <input 
                      type="text"
                      placeholder="Restaurants, cuisines, dishes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') setCurrentView('menu');
                      }}
                      className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
                    />
                  </div>

                  {/* Find food Button */}
                  <button 
                    onClick={() => setCurrentView('menu')}
                    className="w-full sm:w-auto bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs px-6 py-3 rounded-full transition shadow-md shadow-orange-600/30 shrink-0"
                  >
                    Find food
                  </button>

                </div>

                {/* Quick Stats Row */}
                <div className="pt-4 flex items-center justify-center gap-8 text-xs text-slate-300 font-medium">
                  <div><strong className="text-white text-sm font-bold">200+</strong> Restaurants</div>
                  <div className="flex items-center gap-1"><strong className="text-white text-sm font-bold">4.8</strong> <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> Average rating</div>
                  <div><strong className="text-white text-sm font-bold">30 min</strong> Avg. delivery</div>
                </div>

              </div>
            </div>

            {/* FEATURED RESTAURANTS SECTION */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-orange-500 rounded-full" />
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-sans">
                    Featured restaurants
                  </h2>
                </div>
                <button 
                  onClick={() => setCurrentView('menu')}
                  className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1"
                >
                  View all <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Restaurant Grid matching Image */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {FEATURED_RESTAURANTS.map((resto) => (
                  <div 
                    key={resto.id}
                    onClick={() => setCurrentView('menu')}
                    className="group bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    {/* Card Cover Image */}
                    <div className="relative h-48 bg-slate-100 overflow-hidden">
                      <img 
                        src={resto.image} 
                        alt={resto.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60" />

                      {/* Featured & Free Delivery Badges Top Left */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        {resto.isFeatured && (
                          <span className="bg-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                            Featured
                          </span>
                        )}
                        {resto.hasFreeDelivery && (
                          <span className="bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-medium px-2 py-1 rounded-md flex items-center gap-1">
                            <Clock className="w-3 h-3 text-orange-400" /> Free delivery
                          </span>
                        )}
                      </div>

                      {/* Rating Badge Bottom Right */}
                      <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1 text-xs font-bold text-slate-900">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{resto.rating}</span>
                      </div>
                    </div>

                    {/* Resto Info */}
                    <div className="p-4 space-y-1">
                      <h3 className="font-bold text-slate-900 text-base group-hover:text-orange-600 transition-colors">
                        {resto.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">{resto.cuisine}</p>
                      <div className="flex items-center gap-3 text-xs text-slate-400 pt-2 border-t border-slate-100 mt-2">
                        <span>{resto.deliveryTime}</span>
                        <span>•</span>
                        <span>{resto.hasFreeDelivery ? 'Free Delivery' : `$${resto.deliveryFee} Delivery`}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* EXPLORE MENU CATEGORIES ROW */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Browse by Category</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                {INITIAL_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setCurrentView('menu');
                    }}
                    className="bg-white border border-slate-200 hover:border-orange-500/60 rounded-2xl p-4 text-center transition hover:-translate-y-1 shadow-sm flex flex-col items-center gap-2 group"
                  >
                    <span className="text-3xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                    <span className="text-xs font-bold text-slate-700 group-hover:text-orange-600">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* 2. MENU & DISH DISCOVERY VIEW */}
        {currentView === 'menu' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in">
            
            {/* Filter Bar */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="Search dishes, burgers, sushi..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto">
                  {INITIAL_CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${selectedCategory === cat.id ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>

              </div>
            </div>

            {/* Menu Dish Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {menuItems.filter(item => {
                if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
                if (searchQuery) {
                  const q = searchQuery.toLowerCase();
                  return item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
                }
                return true;
              }).map(dish => (
                <div key={dish.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col justify-between">
                  <div>
                    <div className="relative h-44 bg-slate-100">
                      <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-md text-xs font-bold text-slate-900 flex items-center gap-1 shadow-sm">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {dish.rating}
                      </div>
                    </div>
                    <div className="p-4 space-y-1.5">
                      <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">{dish.restaurant}</span>
                      <h3 className="font-bold text-slate-900 text-sm leading-snug">{dish.name}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2">{dish.description}</p>
                    </div>
                  </div>

                  <div className="p-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-base font-black text-slate-900">${dish.price.toFixed(2)}</span>
                    <button 
                      onClick={() => addToCart(dish)}
                      className="bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition flex items-center gap-1 shadow-sm"
                    >
                      <Plus className="w-4 h-4" /> Add
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* 3. TRACKING VIEW */}
        {currentView === 'tracking' && (
          <div className="max-w-3xl mx-auto px-4 py-12 space-y-6 animate-in fade-in">
            <h2 className="text-2xl font-black text-slate-900">Live Delivery Tracker</h2>
            {activeOrder ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded">{activeOrder.id}</span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">{activeOrder.status}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Est. Time</span>
                    <span className="text-lg font-black text-orange-600">{activeOrder.estimatedTime}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between font-semibold">
                    <span>Delivering to</span>
                    <span className="text-slate-900">{activeOrder.address}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total Amount</span>
                    <span className="text-slate-900">${activeOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500">No active orders found.</p>
            )}
          </div>
        )}

        {/* 4. ADMIN VIEW */}
        {currentView === 'admin' && (
          <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 animate-in fade-in">
            <div className="bg-slate-900 text-white rounded-3xl p-6 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Khana Admin Operations</h2>
                <p className="text-xs text-slate-400">Live orders and store inventory control</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Active Customer Orders ({orders.length})</h3>
              <div className="space-y-3">
                {orders.map(o => (
                  <div key={o.id} className="p-4 bg-slate-50 rounded-xl flex justify-between items-center border border-slate-200 text-xs">
                    <div>
                      <strong className="text-slate-900">{o.id}</strong> — ${o.total.toFixed(2)} ({o.items.length} items)
                    </div>
                    <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded font-bold">{o.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* --- CART DRAWER --- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div onClick={() => setIsCartOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white border-l border-slate-200 text-slate-800 flex flex-col shadow-2xl">
              
              <div className="p-5 border-b border-slate-200 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">Your Basket</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-1 text-slate-400 hover:text-slate-800">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-center text-xs text-slate-400 py-12">Your cart is empty.</p>
                ) : (
                  cart.map(item => (
                    <div key={item.cartItemId} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                      <div>
                        <h4 className="font-bold text-slate-900">{item.name}</h4>
                        <span className="text-slate-500">${item.price.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.cartItemId, -1)} className="p-1 bg-white border rounded"><Minus className="w-3 h-3" /></button>
                        <span className="font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.cartItemId, 1)} className="p-1 bg-white border rounded"><Plus className="w-3 h-3" /></button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-5 border-t border-slate-200 space-y-3 bg-slate-50">
                  <div className="flex justify-between font-bold text-slate-900 text-sm">
                    <span>Total</span>
                    <span className="text-orange-600">${grandTotal.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={() => setCheckoutStep(1)}
                    className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-full transition shadow-md shadow-orange-600/30 text-xs"
                  >
                    Checkout Now
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* --- CHECKOUT MODAL --- */}
      {checkoutStep > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl relative">
            <button onClick={() => setCheckoutStep(0)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800">
              <X className="w-5 h-5" />
            </button>

            {checkoutStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">Confirm Order & Address</h3>
                <input 
                  type="text" 
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-orange-500"
                />
                <button 
                  onClick={handlePlaceOrder}
                  className="w-full bg-orange-600 text-white font-bold py-3 rounded-full text-xs shadow-md shadow-orange-600/30"
                >
                  Pay & Place Order (${grandTotal.toFixed(2)})
                </button>
              </div>
            )}

            {checkoutStep === 3 && (
              <div className="py-8 text-center space-y-3">
                <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs font-bold text-slate-800">Processing order with Khana...</p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

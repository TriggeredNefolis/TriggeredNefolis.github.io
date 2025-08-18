import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingCart, Phone, Mail, ExternalLink, Plus, Minus, X, GamepadIcon, Gamepad2 } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog';
import { Textarea } from './components/ui/textarea';
import './App.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [cartId] = useState('guest-cart-' + Math.random().toString(36).substr(2, 9));
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orderForm, setOrderForm] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    customer_address: '',
    notes: ''
  });

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/products`);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/cart/${cartId}`);
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/cart/${cartId}/add`, {
        product_id: productId,
        quantity: quantity
      });
      setCart(response.data);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/cart/${cartId}/remove/${productId}`);
      setCart(response.data);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/api/orders`, {
        ...orderForm,
        items: cart.items,
        total: cart.total
      });
      
      if (response.data.success) {
        // Redirect to Discord
        window.open(response.data.discord_url, '_blank');
        
        // Clear cart and close modals
        setCart({ items: [], total: 0 });
        setIsCheckoutOpen(false);
        setIsCartOpen(false);
        
        // Reset form
        setOrderForm({
          customer_name: '',
          customer_email: '',
          customer_phone: '',
          customer_address: '',
          notes: ''
        });
        
        alert('Order placed successfully! Check the Discord server for updates.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  const handleBuyNow = (productId) => {
    addToCart(productId, 1);
    setTimeout(() => setIsCheckoutOpen(true), 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <Gamepad2 className="w-16 h-16 text-emerald-500 animate-pulse mx-auto mb-4" />
          <p className="text-white text-xl">Loading GamePort Nepal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GamepadIcon className="w-10 h-10 text-emerald-500" />
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  GamePort Nepal
                </h1>
                <p className="text-slate-400 text-sm">Your Gaming Paradise</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex items-center gap-2 border-slate-600 hover:border-emerald-500"
                onClick={() => window.open('mailto:gameportnepal@gmail.com')}
              >
                <Mail className="w-4 h-4" />
                Contact
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex items-center gap-2 border-slate-600 hover:border-emerald-500"
                onClick={() => window.open('https://discord.gg/XjuaQBFD8W', '_blank')}
              >
                <ExternalLink className="w-4 h-4" />
                Discord
              </Button>
              
              <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
                <DialogTrigger asChild>
                  <Button className="relative bg-emerald-600 hover:bg-emerald-700">
                    <ShoppingCart className="w-5 h-5" />
                    {cart.items.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 px-2 py-1 bg-red-500 text-white text-xs">
                        {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
                      </Badge>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-emerald-400">Shopping Cart</DialogTitle>
                  </DialogHeader>
                  {cart.items.length === 0 ? (
                    <p className="text-center py-8 text-slate-400">Your cart is empty</p>
                  ) : (
                    <div className="space-y-4">
                      {cart.items.map(item => (
                        <div key={item.product_id} className="flex items-center gap-3 p-3 bg-slate-700 rounded-lg">
                          <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-emerald-400">Rs. {item.price.toLocaleString()}</p>
                            <p className="text-xs text-slate-400">Qty: {item.quantity}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFromCart(item.product_id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <div className="border-t border-slate-600 pt-4">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total:</span>
                          <span className="text-emerald-400">Rs. {cart.total.toLocaleString()}</span>
                        </div>
                        <Button 
                          className="w-full mt-3 bg-emerald-600 hover:bg-emerald-700"
                          onClick={() => setIsCheckoutOpen(true)}
                        >
                          Proceed to Checkout
                        </Button>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-cyan-900/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Game On Nepal!
            </h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Discover the latest video games, gaming accessories, and exclusive items. 
              Your ultimate gaming destination in Nepal.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-slate-400">
              <div className="flex items-center gap-2">
                <GamepadIcon className="w-5 h-5 text-emerald-500" />
                <span>Latest Games</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-emerald-500" />
                <span>Gaming Gear</span>
              </div>
              <div className="flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-emerald-500" />
                <span>Quick Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Featured Products
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <Card key={product.id} className="group bg-slate-800 border-slate-700 hover:border-emerald-500 transition-all duration-300 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-2">
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      onClick={() => addToCart(product.id)}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add to Cart
                    </Button>
                    <Button
                      size="sm"
                      className="bg-cyan-600 hover:bg-cyan-700 text-white"
                      onClick={() => handleBuyNow(product.id)}
                    >
                      Buy Now
                    </Button>
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg leading-tight text-white">{product.name}</CardTitle>
                    <Badge variant="secondary" className="bg-emerald-600 text-white">
                      {product.platform}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="self-start border-slate-600 text-slate-300">
                    {product.category}
                  </Badge>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-slate-400 text-sm mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-emerald-400">
                      Rs. {product.price.toLocaleString()}
                    </span>
                    <Badge className={product.inStock ? "bg-green-600" : "bg-red-600"}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Checkout Modal */}
      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-emerald-400">Checkout</DialogTitle>
            <DialogDescription className="text-slate-400">
              Complete your order details below
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleOrderSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customer_name" className="text-slate-300">Full Name *</Label>
                <Input
                  id="customer_name"
                  required
                  value={orderForm.customer_name}
                  onChange={(e) => setOrderForm({...orderForm, customer_name: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="customer_phone" className="text-slate-300">Phone *</Label>
                <Input
                  id="customer_phone"
                  required
                  value={orderForm.customer_phone}
                  onChange={(e) => setOrderForm({...orderForm, customer_phone: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="customer_email" className="text-slate-300">Email *</Label>
              <Input
                id="customer_email"
                type="email"
                required
                value={orderForm.customer_email}
                onChange={(e) => setOrderForm({...orderForm, customer_email: e.target.value})}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            
            <div>
              <Label htmlFor="customer_address" className="text-slate-300">Delivery Address *</Label>
              <Textarea
                id="customer_address"
                required
                value={orderForm.customer_address}
                onChange={(e) => setOrderForm({...orderForm, customer_address: e.target.value})}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            
            <div>
              <Label htmlFor="notes" className="text-slate-300">Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={orderForm.notes}
                onChange={(e) => setOrderForm({...orderForm, notes: e.target.value})}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            
            <div className="border-t border-slate-600 pt-4">
              <div className="space-y-2">
                {cart.items.map(item => (
                  <div key={item.product_id} className="flex justify-between text-sm">
                    <span>{item.name} x{item.quantity}</span>
                    <span>Rs. {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-slate-600">
                  <span>Total:</span>
                  <span className="text-emerald-400">Rs. {cart.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
              Place Order
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <GamepadIcon className="w-8 h-8 text-emerald-500" />
                <h3 className="text-2xl font-bold text-white">GamePort Nepal</h3>
              </div>
              <p className="text-slate-400">
                Your trusted gaming destination in Nepal. We bring you the latest games and accessories.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
              <div className="space-y-2 text-slate-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:gameportnepal@gmail.com" className="hover:text-emerald-400">
                    gameportnepal@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  <a href="https://discord.gg/XjuaQBFD8W" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">
                    Join our Discord
                  </a>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Categories</h4>
              <div className="space-y-2 text-slate-400">
                <p>Video Games</p>
                <p>Controllers</p>
                <p>Gaming Accessories</p>
                <p>Consoles</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-8 pt-6 text-center text-slate-400">
            <p>&copy; 2025 GamePort Nepal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
export interface Product {
  id: string;
  name: string;
  brand: "company" | "other"; // Added brand field
  category: string;
  subcategory?: string;
  basePrice: number; // Changed from price to basePrice
  gst: number; // Added GST field
  price: number; // Total price (basePrice + GST)
  originalPrice?: number;
  description: string;
  image: string;
  stock: number;
  rating: number;
  reviews: number;
  isCompanyBrand: boolean;
  maxSize?: number;
  minOrderQuantity?: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: number; // For other brand customizable sizes
}

export interface WishlistItem extends Product {}

export interface Order {
  id: string;
  orderDate: string;
  totalAmount: number;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  items: CartItem[];
  shippingAddress: string;
}

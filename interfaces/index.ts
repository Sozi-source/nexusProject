import { Timestamp } from "firebase/firestore"

export interface Review {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

export interface Dimensions {
  width: number
  height: number
  depth: number
}

export interface Meta {
  createdAt: string
  updatedAt: string
  barcode: string
  qrCode: string
}

export interface productsProps {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  quantity: number
  tags: string[]
  brand: string
  sku: string
  weight: number
  dimensions: Dimensions
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  reviews: Review[]
  returnPolicy: string
  minimumOrderQuantity: number
  meta: Meta
  images: string[]
  thumbnail: string
}

export interface CartContextprops{
  cart: productsProps[];
  addToCart: (item:productsProps)=>void;
  removeFromCart: (id:number)=>void;
  incrementQuantity: (id:number)=>void;
  decrementQuantity: (id:number)=>void;
  getTotalPrice:()=> number; 
  clearCart:()=>void;
}

export interface profileBioProps{
  name: string;
  age?: number;
  email?: string;
}

 export interface Orderprops {
  id: string;
  productName: string;
  price: number;   
  quantity: number;
  status: string;
  createdAt: Timestamp;
}

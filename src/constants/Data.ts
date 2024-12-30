import { ImageSourcePropType } from "react-native";
import Colors from "./Colors";

interface User {
  id: number;
  name: string;
  image: ImageSourcePropType;
}

export const user: User = {
  id: 1,
  name: "Nishant Makwana",
  image: require("../assets/images/user/Avatar.png"),
};

export interface Category {
  id: number;
  name: string;
}

export const categories: Category[] = [
  {
    id: 1,
    name: "Men's",
  },
  {
    id: 2,
    name: "Women'S",
  },
  {
    id: 3,
    name: "Sports",
  },
  {
    id: 4,
    name: "Kids",
  },
];

interface Color {
  id: number;
  code: string;
}

const colors: Color[] = [
  {
    id: 1,
    code: Colors.primary,
  },
  {
    id: 2,
    code: Colors.secondary,
  },
  {
    id: 3,
    code: Colors.text,
  },
];

interface Size {
  id: number;
  name: string;
}
export interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
  description: string;
  image: ImageSourcePropType;
  reviews: number;
  rating: number;
  brand: string;
  colors: Color[];
  sizes: Size[];
}

const sizes: Size[] = [
  { id: 1, name: "S" },
  { id: 2, name: "M" },
  { id: 3, name: "L" },
  { id: 4, name: "XL" },
  { id: 5, name: "XXL" },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Second-Hand Blazer",
    price: 1200,
    category: categories.find((cat) => cat.id === 1)!,
    description:
      "Gently Used, Perfect For Office Or Casual Wear. Good Condition, Minimal Signs Of Wear.",
    image: require("../assets/images/products/Yellow.jpg"),
    reviews: 80,
    rating: 4.0,
    colors: colors,
    brand: "Puma",
    sizes,
  },
  {
    id: 2,
    name: "Pre-Owned Men’s Sportswear",
    price: 4000,
    category: categories.find((cat) => cat.id === 1)!,
    description:
      "Lightly Worn Sports-Wear Suitable For Both Casual And Work-Out Wear. Comfortable And Durable.",
    image: require("../assets/images/products/Green.jpg"),
    reviews: 28,
    rating: 3.7,
    colors: colors,
    brand: "Zara",
    sizes,
  },
  {
    id: 3,
    name: "Used Violet Hoodie",
    price: 1800,
    category: categories.find((cat) => cat.id === 1)!,
    description:
      "Pre-Loved Hoodie In Excellent Condition. Soft Fabric, Great For Casual Outings.",
    image: require("../assets/images/products/Purple.jpg"),
    reviews: 70,
    rating: 5.0,
    colors: colors,
    brand: "Zudio",
    sizes,
  },
  {
    id: 4,
    name: "Gently Used Skinny Fit Blazer",
    price: 2500,
    category: categories.find((cat) => cat.id === 2)!, 
    description:
      "Second-Hand Blazer In Very Good Condition. Stylish And Versatile For Both Formal And Casual Looks.",
    image: require("../assets/images/products/Blue.jpg"),
    reviews: 65,
    rating: 4.2,
    colors: colors,
    brand: "Nike",
    sizes,
  },
];
import { IMAGES } from "./images";

export type TeaBase = { id: string; name: string; price: number; color: string; tint: string; swatch: string };
export type Topping = { id: string; name: string; price: number; kind: "pearl" | "pop" | "jelly" | "cloud" | "cube"; color: string };
export type MenuItem = {
  id: string; name: string; price: number; rating: number; kcal: number;
  image: string; accent: string; badge?: { label: string; tone: "mango" | "matcha" };
};

export const TEA_BASES: TeaBase[] = [
  { id: "taro", name: "Taro Milk", price: 70, color: "#C7A9E5", tint: "#EADFF6", swatch: "#C7A9E5" },
  { id: "oolong", name: "Roasted Oolong", price: 60, color: "#B07A45", tint: "#EBD6BC", swatch: "#B07A45" },
  { id: "matcha", name: "Organic Matcha", price: 80, color: "#7FB07F", tint: "#DCEBDD", swatch: "#4E8752" },
  { id: "thai", name: "Thai Tea", price: 65, color: "#F08A3C", tint: "#FFE0C7", swatch: "#F08A3C" },
];

export const TOPPINGS: Topping[] = [
  { id: "tapioca", name: "Tapioca Pearls", price: 10, kind: "pearl", color: "#2B1A0E" },
  { id: "popping", name: "Mango Popping Boba", price: 15, kind: "pop", color: "#FFB020" },
  { id: "lychee", name: "Lychee Jelly", price: 12, kind: "jelly", color: "#F7ECEF" },
  { id: "cream", name: "Salted Cream Cloud", price: 15, kind: "cloud", color: "#FFFFFF" },
  { id: "aloe", name: "Aloe Vera", price: 10, kind: "cube", color: "#CFE8C9" },
];

export const SWEETNESS_STEPS = [
  { value: 0, label: "None" },
  { value: 25, label: "Light" },
  { value: 50, label: "Medium" },
  { value: 75, label: "Sweet" },
  { value: 100, label: "Extra" },
];

export const ICE_STEPS = [
  { value: 0, label: "No ice" },
  { value: 1, label: "Less" },
  { value: 2, label: "Regular" },
  { value: 3, label: "Extra" },
];

export const MENU_ITEMS: MenuItem[] = [
  { id: "tiger", name: "Tiger Brown Sugar", price: 95, rating: 4.8, kcal: 320, image: IMAGES.brownSugar, accent: "#F6C9A4", badge: { label: "Best seller", tone: "mango" } },
  { id: "colada", name: "Mango Colada", price: 80, rating: 4.7, kcal: 280, image: IMAGES.mangoColada, accent: "#FFE08A" },
  { id: "strawberry-matcha", name: "Strawberry Matcha Latte", price: 90, rating: 4.9, kcal: 240, image: IMAGES.matchaLatte, accent: "#CDE6CF", badge: { label: "Vegan", tone: "matcha" } },
  { id: "waffle", name: "Belgian Chocolate Waffle", price: 110, rating: 4.8, kcal: 460, image: IMAGES.waffle, accent: "#E6C7AE" },
];

export const NAV_LINKS = [
  { href: "/menu", key: "menu" },
  { href: "/menu#boba-lab", key: "lab" },
  { href: "/kids", key: "kids" },
  { href: "/kids#packages", key: "catering" },
  { href: "/locations", key: "locations" },
] as const;

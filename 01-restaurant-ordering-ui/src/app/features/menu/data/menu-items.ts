export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category:
    | "starters"
    | "dum-biryani"
    | "curries"
    | "tandoor-breads"
    | "desserts";

  isVeg: boolean;
  rating: number;
  bestseller?: boolean;
  emoji: string;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "paneer-tikka-lababdar",
    name: "Paneer Tikka Lababdar",
    description:
      "Chargrilled cottage cheese cubes simmered in a velvety tomato-cashew gravy with roasted kasuri methi.",
    price: 289,
    category: "curries",
    isVeg: true,
    rating: 4.8,
    bestseller: true,
    emoji: "🍛",
  },
  {
    id: "hyderabadi-chicken-dum-biryani",
    name: "Hyderabadi Chicken Dum Biryani",
    description:
      "Aged saffron basmati layered with spiced chicken, caramelized birista, and mint—sealed in a clay handi.",
    price: 349,
    category: "dum-biryani",
    isVeg: false,
    rating: 4.9,
    bestseller: true,
    emoji: "🍲",
  },
  {
    id: "dal-makhani",
    name: "24-Hour Dal Makhani",
    description:
      "Whole black urad lentils slow-cooked overnight over embers with ginger, cream, and hand-churned butter.",
    price: 229,
    category: "curries",
    isVeg: true,
    rating: 4.7,
    bestseller: true,
    emoji: "🥘",
  },
  {
    id: "subz-dum-handi-biryani",
    name: "Subz Dum Handi Biryani",
    description:
      "Fragrant long-grain basmati slow-cooked with seasonal vegetables, paneer, saffron milk, and rose water.",
    price: 279,
    category: "dum-biryani",
    isVeg: true,
    rating: 4.6,
    emoji: "🍚",
  },
  {
    id: "tandoori-paneer-tikka",
    name: "Achari Paneer Tikka",
    description:
      "Chunks of malai paneer marinated in hung curd and mustard-pickle spices, roasted over live charcoal.",
    price: 249,
    category: "starters",
    isVeg: true,
    rating: 4.7,
    emoji: "🍢",
  },
  {
    id: "murgh-malai-kebab",
    name: "Murgh Malai Kebab",
    description:
      "Melt-in-the-mouth chicken supreme marinated in cream cheese, cardamom, and white pepper.",
    price: 299,
    category: "starters",
    isVeg: false,
    rating: 4.8,
    emoji: "🍗",
  },
  {
    id: "garlic-butter-naan",
    name: "Roasted Garlic Butter Naan",
    description:
      "Leavened tandoor flatbread topped with minced garlic, fresh coriander, and brushed with cultured butter.",
    price: 65,
    category: "tandoor-breads",
    isVeg: true,
    rating: 4.8,
    emoji: "🫓",
  },
  {
    id: "kesar-rasmalai",
    name: "Shahi Kesar Rasmalai",
    description:
      "Soft chhena patties soaked in chilled saffron-cardamom reduced milk, garnished with slivered pistachios.",
    price: 129,
    category: "desserts",
    isVeg: true,
    rating: 4.9,
    emoji: "🍮",
  },
];

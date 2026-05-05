import torso from "@/assets/torso-black-pair.png";
import textured from "@/assets/torso-textured.png";
import showroom from "@/assets/showroom.png";
import ganesha from "@/assets/ganesha-statue.png";
import welcome from "@/assets/welcome-statues.png";
import camel from "@/assets/camel-statue.png";
import arch from "@/assets/wedding-arch.png";
import mandap from "@/assets/mandap-pillars.png";
import decorVases from "@/assets/decor-vases.png";

// New product images
import blackFemaleTrio from "@/assets/black-female-trio.png";
import goldFemaleDuo from "@/assets/gold-female-duo.png";
import goldWhiteFemale from "@/assets/gold-white-female-set.png";
import goldMaleTrio from "@/assets/gold-male-trio.png";
import whiteMalePose from "@/assets/white-male-pose-set.png";
import matteBlackMale from "@/assets/matte-black-male.png";
import royalSofa from "@/assets/royal-wedding-sofa.png";
import mandapWheel from "@/assets/mandap-chariot-wheel.png";
import goldenThrone from "@/assets/golden-royal-throne.png";
import laughingBuddhaDisplay from "@/assets/laughing-buddha-display.png";

export interface Product {
  id: string;
  name: string;
  tag: string;
  /** Raw INR amount — used for currency conversion */
  priceINR: number;
  /** Display suffix, e.g. "each", "pair", "set" — shown after the formatted price */
  priceSuffix?: string;
  /** @deprecated kept for backward compat; use priceINR + useCurrency() instead */
  price: string;
  img: string;
}

export const isProductInStock = (_id: string) => true;

export const PRODUCTS: Product[] = [
  // New arrivals – Female Full Body
  { id: "black-female-trio", name: "Black Female Trio", tag: "Full Body", priceINR: 23500, priceSuffix: "each", price: "₹ 23,500 each", img: blackFemaleTrio },
  { id: "gold-female-duo", name: "Gold Female Duo", tag: "Full Body", priceINR: 23500, priceSuffix: "each", price: "₹ 23,500 each", img: goldFemaleDuo },
  { id: "gold-white-female", name: "Gold & White Female", tag: "Full Body", priceINR: 23500, priceSuffix: "each", price: "₹ 23,500 each", img: goldWhiteFemale },
  // New arrivals – Male Full Body
  { id: "gold-male-trio", name: "Gold Male Trio", tag: "Full Body Male", priceINR: 22500, priceSuffix: "each", price: "₹ 22,500 each", img: goldMaleTrio },
  { id: "white-male-pose", name: "White Male Pose", tag: "Full Body Male", priceINR: 22500, priceSuffix: "each", price: "₹ 22,500 each", img: whiteMalePose },
  { id: "matte-black-male", name: "Matte Black Male", tag: "Full Body Male", priceINR: 22500, priceSuffix: "each", price: "₹ 22,500 each", img: matteBlackMale },
  // New arrivals – Decor & Mandap
  { id: "royal-wedding-sofa", name: "VIP Chair", tag: "Mandap", priceINR: 35000, price: "₹ 35,000", img: royalSofa },
  { id: "dholi", name: "Kuberan scent spray", tag: "Decor Statue", priceINR: 27500, price: "₹ 27,500", img: mandapWheel },
  { id: "vip-chair", name: "Dholi", tag: "Mandap", priceINR: 45000, price: "₹ 45,000", img: goldenThrone },
  { id: "laughing-buddha-display", name: "Laughing Buddha Display", tag: "Decor Statue", priceINR: 18500, price: "₹ 18,500", img: laughingBuddhaDisplay },
  { id: "welcome-statues", name: "Welcome Statues", tag: "Decor Statue", priceINR: 24000, priceSuffix: "pair", price: "₹ 24,000 pair", img: welcome },
  { id: "decorative-vases", name: "Decorative Vases", tag: "Accent Decor", priceINR: 12500, priceSuffix: "set", price: "₹ 12,500 set", img: decorVases },
  // Classic catalogue
  { id: "dress-form", name: "Dress Form", tag: "Torso Bust", priceINR: 9500, priceSuffix: "each", price: "₹ 9,500 each", img: torso },
  { id: "adjustable-dummy", name: "Adjustable Dummy", tag: "Adjustable Form", priceINR: 45000, priceSuffix: "each", price: "₹ 45,000 each", img: textured },
  { id: "vinayakar-with-base", name: "Vinayakar with base", tag: "Decor Statue", priceINR: 15500, price: "₹ 15,500", img: ganesha },
  { id: "decorative-camel", name: "Decorative Camel", tag: "Statement Piece", priceINR: 90000, price: "₹ 90,000", img: camel },
  { id: "fiber-entrance-arch", name: "Fiber Entrance Arch", tag: "Mandap", priceINR: 145000, price: "₹ 1,45,000", img: arch },
  { id: "stage-mandapam", name: "Stage Mandapam", tag: "Mandap", priceINR: 125000, price: "₹ 1,25,000", img: mandap },
];

export const FILTERS = [
  "All",
  "Torso Bust",
  "Adjustable Form",
  "Full Body",
  "Full Body Male",
  "Kids Range",
  "Decor Statue",
  "Mandap",
  "Accent Decor",
  "Statement Piece",
];

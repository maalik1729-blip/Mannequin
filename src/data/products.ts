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
import stageMandabamNew from "@/assets/stage-mandabam.png";
import stageMandabam680k from "@/assets/stage-mandabam-680k.png";
import stageMandabam650k from "@/assets/stage-mandabam-650k.png";
import templeOpenStageMandabam from "@/assets/temple-open-stage-mandabam.png";
import threeTypesBigStageMandabam from "@/assets/three-types-big-stage-mandabam.png";
import openTypeStageMandabam from "@/assets/open-type-stage-mandabam.png";
import entranceArch150k1 from "@/assets/entrance-arch-150k.png";
import entranceArch150k2 from "@/assets/entrance-arch-150k-2.png";
import woodenTypeMandabamWalkwayElephant from "@/assets/wooden-type-mandabam-walkway-elephant.png";

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
  description: string;
}

export const isProductInStock = (_id: string) => true;

export const PRODUCTS: Product[] = [
  // New arrivals – Female Full Body
  { id: "black-female-trio", name: "Black Female Trio", tag: "Full Body", priceINR: 23500, priceSuffix: "each", price: "₹ 23,500 each", img: blackFemaleTrio, description: "A set of three sleek matte-black full-body female mannequins crafted for bold retail displays. Their uniform finish and contemporary poses make garments pop in fashion boutiques, showrooms, and window displays." },
  { id: "gold-female-duo", name: "Gold Female Duo", tag: "Full Body", priceINR: 23500, priceSuffix: "each", price: "₹ 23,500 each", img: goldFemaleDuo, description: "A stunning pair of gold-finish full-body female mannequins with graceful, lifelike poses. Ideal for bridal studios, ethnic wear boutiques, and luxury fashion exhibitions where elegance is paramount." },
  { id: "gold-white-female", name: "Gold & White Female", tag: "Full Body", priceINR: 23500, priceSuffix: "each", price: "₹ 23,500 each", img: goldWhiteFemale, description: "A complementary duo of gold and white full-body female mannequins that create a striking contrast for high-fashion displays. Perfect for premium saree stores, designer boutiques, and curated fashion events." },
  // New arrivals – Male Full Body
  { id: "gold-male-trio", name: "Gold Male Trio", tag: "Full Body Male", priceINR: 22500, priceSuffix: "each", price: "₹ 22,500 each", img: goldMaleTrio, description: "Three gold-finish full-body male mannequins with confident, dynamic poses. Built to showcase men's ethnic wear, sherwanis, and formal suits with regal appeal in showrooms and exhibition stalls." },
  { id: "white-male-pose", name: "White Male Pose", tag: "Full Body Male", priceINR: 22500, priceSuffix: "each", price: "₹ 22,500 each", img: whiteMalePose, description: "A clean white full-body male mannequin set with versatile lifestyle poses. Its neutral finish suits casual wear, western fashion, and sportswear displays across modern retail environments." },
  { id: "matte-black-male", name: "Matte Black Male", tag: "Full Body Male", priceINR: 22500, priceSuffix: "each", price: "₹ 22,500 each", img: matteBlackMale, description: "A bold matte-black full-body male mannequin ideal for luxury menswear and premium brand showcases. Its refined silhouette and dramatic finish create an authoritative visual presence in any retail space." },
  // New arrivals – Decor & Mandap
  { id: "wooden-type-mandabam-walkway-elephant", name: "Wooden type mandabam with walk way Elephant", tag: "Mandap", priceINR: 3000000, price: "₹ 30,00,000", img: woodenTypeMandabamWalkwayElephant, description: "A grand, hand-crafted wooden mandabam featuring a majestic elephant walkway — the ultimate statement piece for royal weddings and heritage celebrations. Intricate carvings and a palatial structure create an unforgettable ceremonial entrance." },
  { id: "entrance-arch-150k-1", name: "Entrance arch", tag: "Mandap", priceINR: 150000, priceSuffix: "each", price: "₹ 1,50,000 each", img: entranceArch150k1, description: "An intricately crafted fiber entrance arch that sets a grand first impression for weddings and events. Featuring ornate detailing and a classic silhouette, this arch frames your celebration entrance with timeless elegance." },
  { id: "entrance-arch-150k-2", name: "Entrance arch", tag: "Mandap", priceINR: 150000, priceSuffix: "each", price: "₹ 1,50,000 each", img: entranceArch150k2, description: "A beautifully sculpted fiber entrance arch with premium decorative elements, perfect for wedding halls, reception venues, and festive events. Designed to create a memorable gateway for every special occasion." },
  { id: "open-type-stage-mandabam", name: "Open type stage Mandabam", tag: "Mandap", priceINR: 750000, price: "₹ 7,50,000", img: openTypeStageMandabam, description: "A spacious open-type stage mandabam with an airy, contemporary design ideal for weddings and large-scale events. Its open structure provides unobstructed views for guests while creating a grand focal point for the celebration." },
  { id: "three-types-big-stage-mandabam", name: "Three types of big stage Mandabam", tag: "Mandap", priceINR: 1250000, price: "₹ 12,50,000", img: threeTypesBigStageMandabam, description: "A premium collection of three distinct large-stage mandabam designs offered as a versatile package. Each mandabam is elaborately crafted with fiber and decorative motifs, catering to grand weddings, high-profile receptions, and royal events." },
  { id: "temple-open-stage-mandabam", name: "Temple open stage Mandabam", tag: "Mandap", priceINR: 980000, price: "₹ 9,80,000", img: templeOpenStageMandabam, description: "Inspired by traditional South Indian temple architecture, this open-stage mandabam features ornate gopuram-style columns and intricate fiber carvings. Perfect for cultural weddings and ceremonies that celebrate heritage in grandeur." },
  { id: "stage-mandabam-650k", name: "Stage Mandabam", tag: "Mandap", priceINR: 650000, price: "₹ 6,50,000", img: stageMandabam650k, description: "A classically styled stage mandabam with elegant fiber construction and refined decorative details. Designed to create a dignified and beautiful focal point for wedding ceremonies, receptions, and grand celebrations." },
  { id: "stage-mandabam-680k", name: "Stage Mandabam", tag: "Mandap", priceINR: 680000, price: "₹ 6,80,000", img: stageMandabam680k, description: "A premium stage mandabam featuring enhanced decorative columns and elaborate fiber artistry. Its sophisticated design elevates wedding stages and event venues into breathtaking ceremonial centrepieces." },
  { id: "stage-mandabam-new", name: "Stage Mandabam", tag: "Mandap", priceINR: 725000, price: "₹ 7,25,000", img: stageMandabamNew, description: "Our latest stage mandabam design blending contemporary aesthetics with traditional craftsmanship. Featuring refined fiber detailing and a commanding structure, it transforms any venue into a royal wedding stage." },
  { id: "royal-wedding-sofa", name: "VIP Chair", tag: "Mandap", priceINR: 35000, price: "₹ 35,000", img: royalSofa, description: "A luxuriously crafted VIP chair upholstered in rich fabric with gold accent detailing, designed to seat the bride and groom in regal comfort. A statement centrepiece for wedding stages and high-profile event seating." },
  { id: "dholi", name: "Kuberan scent spray", tag: "Decor Statue", priceINR: 27500, price: "₹ 27,500", img: mandapWheel, description: "An ornate Kuberan scent spray decor piece crafted in fiber, inspired by the ancient chariot wheel motif. Combines aromatic ambiance with decorative artistry — ideal for wedding mandaps, entrance displays, and festive settings." },
  { id: "vip-chair", name: "Dholi", tag: "Mandap", priceINR: 45000, price: "₹ 45,000", img: goldenThrone, description: "A magnificent golden Dholi throne crafted with intricate fiber detailing, perfect as a centrepiece for wedding stages, photo booths, and ceremonial seating. Its regal design adds an unmatched sense of grandeur to any event." },
  { id: "laughing-buddha-display", name: "Laughing Buddha Display", tag: "Decor Statue", priceINR: 18500, price: "₹ 18,500", img: laughingBuddhaDisplay, description: "A cheerful and auspicious Laughing Buddha display statue crafted in fiber with a premium finish. Believed to bring prosperity and positive energy, this piece is perfect for retail store entrances, reception lobbies, and home decor." },
  { id: "welcome-statues", name: "Welcome Statues", tag: "Decor Statue", priceINR: 24000, priceSuffix: "pair", price: "₹ 24,000 pair", img: welcome, description: "A pair of beautifully crafted welcome statues in graceful traditional poses, ideal for greeting guests at wedding halls, hotels, and event venues. Their warm, inviting presence creates a memorable first impression at any occasion." },
  { id: "decorative-vases", name: "Decorative Vases", tag: "Accent Decor", priceINR: 12500, priceSuffix: "set", price: "₹ 12,500 set", img: decorVases, description: "A curated set of decorative fiber vases with elegant proportions and refined surface detailing. Versatile accent pieces that enhance event tables, mandap stages, showroom interiors, and retail display corners." },
  // Classic catalogue
  { id: "dress-form", name: "Dress Form", tag: "Torso Bust", priceINR: 9500, priceSuffix: "each", price: "₹ 9,500 each", img: torso, description: "A sleek black torso dress form designed for professional garment display and tailoring. Its clean silhouette and sturdy construction make it an essential tool for fashion boutiques, ateliers, and retail displays." },
  { id: "adjustable-dummy", name: "Adjustable Dummy", tag: "Adjustable Form", priceINR: 45000, priceSuffix: "each", price: "₹ 45,000 each", img: textured, description: "A professional adjustable dress dummy with a textured fabric surface and expandable sections for a precise fit. Ideal for tailors, fashion designers, and dressmakers who need a customizable form that adapts to any size or silhouette." },
  { id: "vinayakar-with-base", name: "Vinayakar with base", tag: "Decor Statue", priceINR: 15500, price: "₹ 15,500", img: ganesha, description: "A beautifully crafted Vinayakar (Ganesha) statue with a decorative base, made with premium fiber and fine detailing. An auspicious decor piece perfect for temple mandaps, event entrances, pooja halls, and spiritual retail spaces." },
  { id: "decorative-camel", name: "Decorative Camel", tag: "Statement Piece", priceINR: 90000, price: "₹ 90,000", img: camel, description: "A striking life-size decorative camel statue crafted in fiber with intricate painted detailing. A bold statement piece that commands attention at wedding venues, resort lobbies, exhibition stalls, and luxury event displays." },
  { id: "fiber-entrance-arch", name: "Fiber Entrance Arch", tag: "Mandap", priceINR: 145000, price: "₹ 1,45,000", img: arch, description: "A premium fiber entrance arch with finely sculpted ornamental details, crafted to frame wedding and event entrances with grandeur. Lightweight yet durable, this arch is easy to install and creates a stunning ceremonial gateway." },
  { id: "stage-mandapam", name: "Stage Mandapam", tag: "Mandap", priceINR: 125000, price: "₹ 1,25,000", img: mandap, description: "A classic fiber stage mandapam with elegant pillar columns and traditional design elements. Ideal for wedding ceremonies, cultural events, and felicitation functions where a dignified and beautiful stage setting is essential." },
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

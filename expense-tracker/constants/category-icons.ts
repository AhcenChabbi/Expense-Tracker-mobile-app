const CATEGORY_ICONS = {
  "Food & Drinks": "fast-food",
  Shopping: "cart",
  Transportation: "car",
  Entertainment: "film",
  Bills: "receipt",
  Income: "cash",
  Other: "ellipsis-horizontal",
} as const;
export const categoryKeys = Object.keys(CATEGORY_ICONS) as [
  keyof typeof CATEGORY_ICONS,
  ...(keyof typeof CATEGORY_ICONS)[],
];
export default CATEGORY_ICONS;

import data from "../database";

/**
 * Recommendations
 */

const recos = data.recommendations;

function averageColor(colors) {
  const total = colors.reduce(
    (acc, [r, g, b]) => [acc[0] + r, acc[1] + g, acc[2] + b],
    [0, 0, 0]
  );
  return total.map((c) => Math.round(c / colors.length));
}

function skusToColors(skus) {
  return skus.filter((sku) => recos[sku]).map((sku) => recos[sku].rgb);
}

function colorDistance(rgb1, rgb2) {
  const [r1, g1, b1] = rgb1;
  const [r2, g2, b2] = rgb2;
  return Math.sqrt(
    Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2)
  );
}

export function recosForSkus(skusString = "", length = 4) {
  skus = skusString.split(",");
  const targetRgb = averageColor(skusToColors(skus));
  let distances = [];

  for (let sku in recos) {
    if (!skus.includes(sku)) {
      const distance = colorDistance(targetRgb, recos[sku].rgb);
      distances.push({ sku, distance });
    }
  }

  distances.sort((a, b) => a.distance - b.distance);
  return distances.slice(0, length).map((d) => recos[d.sku]);
}

/**
 * Category Page
 */

function categoryByFilter(filter) {
  return filter && data.categories.find((c) => c.key === filter);
}

export function categoryFilter(filter) {
  const cat = categoryByFilter(filter);
  return [
    { url: "/products", name: "All", active: !cat },
    ...data.categories.map((c) => ({
      url: `/products/${c.key}`,
      name: c.name,
      active: c.key === filter,
    })),
  ];
}

export function categoryTitle(filter) {
  const cat = categoryByFilter(filter);
  return cat ? cat.name : "All Machines";
}

export function categoryProducs(filter) {
  const cat = categoryByFilter(filter);
  const products = cat
    ? cat.products
    : data.categories.flatMap((c) => c.products);
  // sort products by price descending
  products.sort((a, b) => b.startPrice - a.startPrice);
  return products;
}

/**
 * Home Page
 */
export function homeTeasers() {
  return data.teaser;
}

/**
 * Stores Page
 */
export function stores() {
  return data.stores;
}

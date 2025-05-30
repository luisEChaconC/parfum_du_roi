// Product interface matching the JSON structure
export interface ProductData {
  id: string;
  marca: string;
  name: string;
  image: string;
  price: number;
}

// Function to load products from JSON files
export const loadProducts = async (category: string): Promise<ProductData[]> => {
  try {
    const response = await import(`../data/${category}.json`);
    return response.default;
  } catch (error) {
    console.error(`Error loading products for category ${category}:`, error);
    return [];
  }
};

// Available product categories
export const PRODUCT_CATEGORIES = {
  NICHO: 'nicho',
  DISEÑADOR: 'diseñador',
  ARABES: 'arabes',
  TESTER: 'tester',
  DECANTS: 'decants',
  NUEVOS: 'nuevos'
} as const;

export type ProductCategory = typeof PRODUCT_CATEGORIES[keyof typeof PRODUCT_CATEGORIES]; 
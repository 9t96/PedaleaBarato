interface Retailer {
  name: string;
  url: string;
  scrapUrl: string;
  bicycles: BicycleScraped[];
}

interface BicycleScraped {
  name: string;
  price: number;
  oldPrice: number;
  discount: string;
  productUrl: string;
  imageUrl: string;
}

export { Retailer, BicycleScraped };
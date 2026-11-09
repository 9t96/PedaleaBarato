interface RetailerScraped {
  name: string;
  url: string;
  scrapUrl: string;
  siteLogo: string;
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

export { RetailerScraped, BicycleScraped };
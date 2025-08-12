export default interface ProductType {
  products: any;
  id: number,
  title: string;
  price: number;
  category: string;
  image: string;
  rating?: Object;
  discountPercentage?: number;
}
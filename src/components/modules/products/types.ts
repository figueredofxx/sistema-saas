
export interface Product {
  id: string;
  name: string;
  category: string;
  color?: string;
  stock: number;
  imei?: string;
  costPrice: number;
  salePrice: number;
  photo?: string;
  createdAt: Date;
}

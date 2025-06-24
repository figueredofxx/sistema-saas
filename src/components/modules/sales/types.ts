
export interface SaleItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Sale {
  id: string;
  customer: string;
  seller: string;
  items: SaleItem[];
  total: number;
  paymentMethod: string;
  date: Date;
}

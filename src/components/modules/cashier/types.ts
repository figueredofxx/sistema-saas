
export interface CashMovement {
  id: string;
  type: "entrada" | "saida" | "sangria";
  amount: number;
  description: string;
  category?: string;
  date: Date;
}

export interface CashierSession {
  id: string;
  openedAt: Date;
  closedAt?: Date;
  initialAmount: number;
  finalAmount?: number;
  movements: CashMovement[];
  isOpen: boolean;
}

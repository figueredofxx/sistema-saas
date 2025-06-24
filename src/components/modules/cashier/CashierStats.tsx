
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Calculator } from "lucide-react";

interface CashierStatsProps {
  currentBalance: number;
  totalIn: number;
  totalOut: number;
  initialAmount: number;
  openedAt: Date;
}

export function CashierStats({
  currentBalance,
  totalIn,
  totalOut,
  initialAmount,
  openedAt
}: CashierStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Saldo Atual</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">
            R$ {currentBalance.toFixed(2)}
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Abertura: {openedAt.toLocaleTimeString('pt-BR')}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Entradas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            R$ {totalIn.toFixed(2)}
          </div>
          <div className="flex items-center mt-1">
            <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-sm text-gray-600">Vendas e recebimentos</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Saídas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            R$ {totalOut.toFixed(2)}
          </div>
          <div className="flex items-center mt-1">
            <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
            <span className="text-sm text-gray-600">Despesas e sangrias</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Valor Inicial</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">
            R$ {initialAmount.toFixed(2)}
          </div>
          <p className="text-sm text-gray-600 mt-1">Troco inicial</p>
        </CardContent>
      </Card>
    </div>
  );
}

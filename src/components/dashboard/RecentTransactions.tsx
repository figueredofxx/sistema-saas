
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function RecentTransactions() {
  const transactions = [
    {
      id: "#22",
      description: "14 Vestido Azul",
      amount: "189,00",
      status: "Pago",
      type: "venda",
    },
    {
      id: "#23",
      description: "2 x Camisa polo P",
      amount: "",
      status: "",
      type: "venda",
    },
    {
      id: "#24",
      description: "1 x Vestido longo",
      amount: "",
      status: "",
      type: "venda",
    },
    {
      id: "Boleto",
      description: "Boleto Fornecedor",
      amount: "289,00",
      status: "Pago",
      type: "pagamento",
    },
    {
      id: "#25",
      description: "3 x Blusa Verão P",
      amount: "",
      status: "",
      type: "venda",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray-900">Movimento de caixa</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.map((transaction, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                  transaction.type === 'venda' ? 'bg-emerald-500' : 'bg-red-500'
                }`}>
                  {transaction.type === 'venda' ? '↗' : '↙'}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{transaction.type === 'venda' ? 'Venda' : 'Pagamento'} {transaction.id}</p>
                  <p className="text-sm text-gray-600">{transaction.description}</p>
                </div>
              </div>
              <div className="text-right">
                {transaction.amount && (
                  <p className="font-bold text-gray-900">{transaction.amount}</p>
                )}
                {transaction.status && (
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                    {transaction.status}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

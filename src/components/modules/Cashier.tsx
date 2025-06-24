
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpCircle, ArrowDownCircle, DollarSign, Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CashierHeader } from "./cashier/CashierHeader";
import { CashierStats } from "./cashier/CashierStats";
import { CashierSession, CashMovement } from "./cashier/types";

export function Cashier() {
  const { toast } = useToast();
  const [currentSession, setCurrentSession] = useState<CashierSession>({
    id: "1",
    openedAt: new Date("2024-06-24T08:30:00"),
    initialAmount: 200,
    movements: [
      {
        id: "1",
        type: "entrada",
        amount: 825,
        description: "Venda #001 - João Silva",
        date: new Date("2024-06-24T14:30:00")
      },
      {
        id: "2",
        type: "sangria",
        amount: 100,
        description: "Sangria para banco",
        date: new Date("2024-06-24T16:00:00")
      },
      {
        id: "3",
        type: "saida",
        amount: 50,
        description: "Compra material limpeza",
        category: "Materiais",
        date: new Date("2024-06-24T17:00:00")
      }
    ],
    isOpen: true
  });

  const calculateTotals = () => {
    const entradas = currentSession.movements
      .filter(m => m.type === "entrada")
      .reduce((acc, m) => acc + m.amount, 0);
    
    const saidas = currentSession.movements
      .filter(m => m.type === "saida" || m.type === "sangria")
      .reduce((acc, m) => acc + m.amount, 0);
    
    const saldoAtual = currentSession.initialAmount + entradas - saidas;
    
    return { entradas, saidas, saldoAtual };
  };

  const { entradas, saidas, saldoAtual } = calculateTotals();

  const handleOpenCashier = () => {
    setCurrentSession({
      id: Date.now().toString(),
      openedAt: new Date(),
      initialAmount: 200,
      movements: [],
      isOpen: true
    });
    
    toast({
      title: "Caixa aberto!",
      description: "Caixa iniciado com R$ 200,00"
    });
  };

  const handleNewMovement = () => {
    toast({
      title: "Nova movimentação!",
      description: "Funcionalidade será implementada"
    });
  };

  const handleCloseCashier = () => {
    setCurrentSession({
      ...currentSession,
      closedAt: new Date(),
      finalAmount: saldoAtual,
      isOpen: false
    });
    
    toast({
      title: "Caixa fechado!",
      description: "Relatório de fechamento gerado"
    });
  };

  const getMovementIcon = (type: string) => {
    switch (type) {
      case "entrada":
        return <ArrowUpCircle className="w-4 h-4 text-green-600" />;
      case "sangria":
        return <ArrowDownCircle className="w-4 h-4 text-orange-600" />;
      case "saida":
        return <ArrowDownCircle className="w-4 h-4 text-red-600" />;
      default:
        return <DollarSign className="w-4 h-4" />;
    }
  };

  const getMovementColor = (type: string) => {
    switch (type) {
      case "entrada":
        return "text-green-600";
      case "sangria":
        return "text-orange-600";
      case "saida":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <CashierHeader
        isOpen={currentSession.isOpen}
        onOpenCashier={handleOpenCashier}
        onNewMovement={handleNewMovement}
        onCloseCashier={handleCloseCashier}
      />

      {currentSession.isOpen ? (
        <>
          <div className="flex items-center justify-center mb-6">
            <Badge className="bg-green-100 text-green-700 text-lg px-6 py-3">
              <Calculator className="w-5 h-5 mr-2" />
              Caixa Aberto!
            </Badge>
          </div>

          <CashierStats
            currentBalance={saldoAtual}
            totalIn={entradas}
            totalOut={saidas}
            initialAmount={currentSession.initialAmount}
            openedAt={currentSession.openedAt}
          />

          <Card>
            <CardHeader>
              <CardTitle>Movimentações do Dia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentSession.movements.length === 0 ? (
                  <div className="text-center py-8">
                    <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Nenhuma movimentação registrada</p>
                    <p className="text-sm text-gray-400 mt-2">
                      As vendas e movimentações aparecerão aqui
                    </p>
                  </div>
                ) : (
                  currentSession.movements.map((movement) => (
                    <div key={movement.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getMovementIcon(movement.type)}
                        <div>
                          <p className="font-medium">{movement.description}</p>
                          <p className="text-sm text-gray-600">
                            {movement.date.toLocaleTimeString('pt-BR')} - {movement.type.charAt(0).toUpperCase() + movement.type.slice(1)}
                            {movement.category && ` - ${movement.category}`}
                          </p>
                        </div>
                      </div>
                      <div className={`text-lg font-semibold ${getMovementColor(movement.type)}`}>
                        {movement.type === "entrada" ? "+" : "-"}R$ {movement.amount.toFixed(2)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Caixa Fechado</h3>
            <p className="text-gray-600 mb-6">
              O caixa está fechado. Abra o caixa para começar as operações do dia.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

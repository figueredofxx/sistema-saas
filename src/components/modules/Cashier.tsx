
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpCircle, ArrowDownCircle, DollarSign, Printer, TrendingUp, TrendingDown, Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CashMovement {
  id: string;
  type: "entrada" | "saida" | "sangria";
  amount: number;
  description: string;
  category?: string;
  date: Date;
}

interface CashierSession {
  id: string;
  openedAt: Date;
  closedAt?: Date;
  initialAmount: number;
  finalAmount?: number;
  movements: CashMovement[];
  isOpen: boolean;
}

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

  const [showMovementDialog, setShowMovementDialog] = useState(false);
  const [showOpenDialog, setShowOpenDialog] = useState(false);
  const [showCloseDialog, setShowCloseDialog] = useState(false);
  const [newMovement, setNewMovement] = useState({
    type: "entrada" as "entrada" | "saida" | "sangria",
    amount: 0,
    description: "",
    category: ""
  });
  const [initialAmount, setInitialAmount] = useState(200);

  const expenseCategories = ["Aluguel", "Fornecedores", "Materiais", "Combustível", "Outros"];

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

  const handleAddMovement = () => {
    if (!newMovement.description || newMovement.amount <= 0) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    const movement: CashMovement = {
      id: Date.now().toString(),
      type: newMovement.type,
      amount: newMovement.amount,
      description: newMovement.description,
      category: newMovement.category || undefined,
      date: new Date()
    };

    setCurrentSession({
      ...currentSession,
      movements: [...currentSession.movements, movement]
    });

    setNewMovement({
      type: "entrada",
      amount: 0,
      description: "",
      category: ""
    });
    setShowMovementDialog(false);

    toast({
      title: "Movimento registrado!",
      description: "Operação adicionada ao caixa"
    });
  };

  const handleOpenCashier = () => {
    setCurrentSession({
      id: Date.now().toString(),
      openedAt: new Date(),
      initialAmount: initialAmount,
      movements: [],
      isOpen: true
    });
    setShowOpenDialog(false);
    
    toast({
      title: "Caixa aberto!",
      description: `Caixa iniciado com R$ ${initialAmount.toFixed(2)}`
    });
  };

  const handleCloseCashier = () => {
    setCurrentSession({
      ...currentSession,
      closedAt: new Date(),
      finalAmount: saldoAtual,
      isOpen: false
    });
    setShowCloseDialog(false);
    
    toast({
      title: "Caixa fechado!",
      description: "Relatório de fechamento gerado"
    });
  };

  const printClosingReport = () => {
    window.print();
    toast({
      title: "Relatório impresso!",
      description: "Comprovante de fechamento enviado para impressão"
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

  if (showCloseDialog) {
    return (
      <div className="space-y-6">
        <div className="no-print flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Relatório de Fechamento de Caixa</h1>
          <div className="space-x-4">
            <Button onClick={printClosingReport} className="bg-orange-500 hover:bg-orange-600">
              <Printer className="w-4 h-4 mr-2" />
              Imprimir
            </Button>
            <Button variant="outline" onClick={() => setShowCloseDialog(false)}>
              Voltar
            </Button>
            <Button onClick={handleCloseCashier} className="bg-red-500 hover:bg-red-600">
              Confirmar Fechamento
            </Button>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow print:shadow-none print:rounded-none max-w-4xl mx-auto">
          <div className="border-b-2 border-gray-200 pb-4 mb-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-orange-600">APEX COMÉRCIO</h2>
              <p className="text-lg font-bold mt-2">RELATÓRIO DE FECHAMENTO DE CAIXA</p>
              <p className="text-sm text-gray-600">Data: {new Date().toLocaleDateString('pt-BR')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-bold text-lg mb-3">INFORMAÇÕES DO CAIXA</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Abertura:</strong> {currentSession.openedAt.toLocaleString('pt-BR')}</p>
                <p><strong>Fechamento:</strong> {new Date().toLocaleString('pt-BR')}</p>
                <p><strong>Valor Inicial:</strong> R$ {currentSession.initialAmount.toFixed(2)}</p>
                <p><strong>Operador:</strong> Ronei</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3">RESUMO FINANCEIRO</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Total Entradas:</strong> <span className="text-green-600">R$ {entradas.toFixed(2)}</span></p>
                <p><strong>Total Saídas:</strong> <span className="text-red-600">R$ {saidas.toFixed(2)}</span></p>
                <p><strong>Saldo Final:</strong> <span className="text-lg font-bold">R$ {saldoAtual.toFixed(2)}</span></p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-lg mb-3">MOVIMENTAÇÕES DO DIA</h3>
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Hora</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Tipo</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Descrição</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Valor</th>
                </tr>
              </thead>
              <tbody>
                {currentSession.movements.map((movement) => (
                  <tr key={movement.id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {movement.date.toLocaleTimeString('pt-BR')}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 capitalize">
                      {movement.type}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {movement.description}
                    </td>
                    <td className={`border border-gray-300 px-4 py-2 text-right ${getMovementColor(movement.type)}`}>
                      {movement.type === "entrada" ? "+" : "-"}R$ {movement.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-8 pt-4 border-t border-gray-200 text-xs text-gray-500">
            <p>Relatório gerado automaticamente pelo sistema Apex Comércio</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Caixa</h1>
          <p className="text-gray-600">Controle financeiro e movimentações</p>
        </div>
        <div className="flex space-x-2">
          {!currentSession.isOpen ? (
            <Dialog open={showOpenDialog} onOpenChange={setShowOpenDialog}>
              <DialogTrigger asChild>
                <Button className="bg-green-500 hover:bg-green-600">
                  Abrir Caixa
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Abrir Caixa</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="initialAmount">Valor Inicial</Label>
                    <Input
                      id="initialAmount"
                      type="number"
                      min="0"
                      step="0.01"
                      value={initialAmount}
                      onChange={(e) => setInitialAmount(parseFloat(e.target.value) || 0)}
                      placeholder="0,00"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setShowOpenDialog(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleOpenCashier} className="bg-green-500 hover:bg-green-600">
                      Abrir Caixa
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <>
              <Dialog open={showMovementDialog} onOpenChange={setShowMovementDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Nova Movimentação
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Nova Movimentação</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Tipo de Movimento</Label>
                      <Select 
                        value={newMovement.type} 
                        onValueChange={(value: "entrada" | "saida" | "sangria") => 
                          setNewMovement({ ...newMovement, type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="entrada">Entrada</SelectItem>
                          <SelectItem value="saida">Saída/Despesa</SelectItem>
                          <SelectItem value="sangria">Sangria</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="amount">Valor</Label>
                      <Input
                        id="amount"
                        type="number"
                        min="0"
                        step="0.01"
                        value={newMovement.amount}
                        onChange={(e) => setNewMovement({ ...newMovement, amount: parseFloat(e.target.value) || 0 })}
                        placeholder="0,00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea
                        id="description"
                        value={newMovement.description}
                        onChange={(e) => setNewMovement({ ...newMovement, description: e.target.value })}
                        placeholder="Descreva a movimentação"
                      />
                    </div>
                    {newMovement.type === "saida" && (
                      <div>
                        <Label>Categoria da Despesa</Label>
                        <Select 
                          value={newMovement.category} 
                          onValueChange={(value) => setNewMovement({ ...newMovement, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            {expenseCategories.map(cat => (
                              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setShowMovementDialog(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleAddMovement} className="bg-orange-500 hover:bg-orange-600">
                        Registrar
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Button 
                onClick={() => setShowCloseDialog(true)} 
                className="bg-red-500 hover:bg-red-600"
              >
                Fechar Caixa
              </Button>
            </>
          )}
        </div>
      </div>

      {currentSession.isOpen ? (
        <>
          <div className="flex items-center justify-center mb-6">
            <Badge className="bg-green-100 text-green-700 text-lg px-6 py-3">
              <Calculator className="w-5 h-5 mr-2" />
              Caixa Aberto!
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Saldo Atual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  R$ {saldoAtual.toFixed(2)}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Abertura: {currentSession.openedAt.toLocaleTimeString('pt-BR')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Entradas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  R$ {entradas.toFixed(2)}
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
                  R$ {saidas.toFixed(2)}
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
                  R$ {currentSession.initialAmount.toFixed(2)}
                </div>
                <p className="text-sm text-gray-600 mt-1">Troco inicial</p>
              </CardContent>
            </Card>
          </div>

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
            <Button onClick={() => setShowOpenDialog(true)} className="bg-orange-500 hover:bg-orange-600">
              Abrir Caixa
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Printer, Trash2, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SaleItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Customer {
  name: string;
  cpf: string;
  address: string;
  phone: string;
  email: string;
}

interface Sale {
  id: string;
  customer: Customer;
  items: SaleItem[];
  subtotal: number;
  total: number;
  paymentMethod: string;
  date: Date;
}

export function Sales() {
  const { toast } = useToast();
  const [currentSale, setCurrentSale] = useState<Partial<Sale>>({
    customer: { name: "", cpf: "", address: "", phone: "", email: "" },
    items: [],
    subtotal: 0,
    total: 0,
    paymentMethod: "dinheiro"
  });
  
  const [newItem, setNewItem] = useState({
    description: "",
    quantity: 1,
    unitPrice: 0
  });

  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [completedSale, setCompletedSale] = useState<Sale | null>(null);

  const addItem = () => {
    if (!newItem.description || newItem.unitPrice <= 0) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos do produto",
        variant: "destructive"
      });
      return;
    }

    const item: SaleItem = {
      id: Date.now().toString(),
      description: newItem.description,
      quantity: newItem.quantity,
      unitPrice: newItem.unitPrice,
      total: newItem.quantity * newItem.unitPrice
    };

    const updatedItems = [...(currentSale.items || []), item];
    const subtotal = updatedItems.reduce((acc, item) => acc + item.total, 0);

    setCurrentSale({
      ...currentSale,
      items: updatedItems,
      subtotal,
      total: subtotal
    });

    setNewItem({ description: "", quantity: 1, unitPrice: 0 });
  };

  const removeItem = (id: string) => {
    const updatedItems = currentSale.items?.filter(item => item.id !== id) || [];
    const subtotal = updatedItems.reduce((acc, item) => acc + item.total, 0);

    setCurrentSale({
      ...currentSale,
      items: updatedItems,
      subtotal,
      total: subtotal
    });
  };

  const finalizeSale = () => {
    if (!currentSale.customer?.name || !currentSale.customer?.cpf || !currentSale.items?.length) {
      toast({
        title: "Erro",
        description: "Preencha os dados do cliente e adicione pelo menos um item",
        variant: "destructive"
      });
      return;
    }

    const sale: Sale = {
      id: Date.now().toString(),
      customer: currentSale.customer as Customer,
      items: currentSale.items as SaleItem[],
      subtotal: currentSale.subtotal || 0,
      total: currentSale.total || 0,
      paymentMethod: currentSale.paymentMethod || "dinheiro",
      date: new Date()
    };

    setCompletedSale(sale);
    setShowPrintPreview(true);
    
    toast({
      title: "Venda finalizada!",
      description: "Venda registrada com sucesso",
    });
  };

  const printSale = () => {
    window.print();
  };

  const newSale = () => {
    setCurrentSale({
      customer: { name: "", cpf: "", address: "", phone: "", email: "" },
      items: [],
      subtotal: 0,
      total: 0,
      paymentMethod: "dinheiro"
    });
    setCompletedSale(null);
    setShowPrintPreview(false);
  };

  if (showPrintPreview && completedSale) {
    return (
      <div className="space-y-6">
        {/* Print Preview */}
        <div className="no-print flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Comprovante de Venda</h1>
          <div className="space-x-4">
            <Button onClick={printSale} className="bg-orange-500 hover:bg-orange-600">
              <Printer className="w-4 h-4 mr-2" />
              Imprimir
            </Button>
            <Button variant="outline" onClick={newSale}>
              Nova Venda
            </Button>
          </div>
        </div>

        {/* Receipt */}
        <div className="bg-white p-8 rounded-lg shadow print:shadow-none print:rounded-none max-w-4xl mx-auto">
          {/* Header */}
          <div className="border-b-2 border-gray-200 pb-4 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-orange-600">APEX COMÉRCIO</h2>
                <p className="text-sm text-gray-600">Sistema de Gestão Comercial</p>
                <p className="text-xs text-gray-500 mt-1">www.apexcomercio.com.br</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">COMPROVANTE DE VENDA</p>
                <p className="text-sm">Nº {completedSale.id}</p>
                <p className="text-xs text-gray-500">DOCUMENTO SEM VALOR FISCAL</p>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="mb-6">
            <h3 className="font-bold text-lg mb-3 text-gray-900">DADOS DO CLIENTE</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Nome:</strong> {completedSale.customer.name}</p>
                <p><strong>CPF:</strong> {completedSale.customer.cpf}</p>
                <p><strong>Telefone:</strong> {completedSale.customer.phone}</p>
              </div>
              <div>
                <p><strong>Email:</strong> {completedSale.customer.email}</p>
                <p><strong>Endereço:</strong> {completedSale.customer.address}</p>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="mb-6">
            <h3 className="font-bold text-lg mb-3 text-gray-900">ITENS DA VENDA</h3>
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Item</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Qtd</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Valor Unit.</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {completedSale.items.map((item, index) => (
                  <tr key={item.id}>
                    <td className="border border-gray-300 px-4 py-2">{item.description}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{item.quantity}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      R$ {item.unitPrice.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      R$ {item.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="mb-6">
            <div className="flex justify-end">
              <div className="w-64">
                <div className="flex justify-between py-2 border-t border-gray-300">
                  <span className="font-bold">TOTAL:</span>
                  <span className="font-bold text-lg">R$ {completedSale.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Forma de Pagamento:</span>
                  <span className="capitalize">{completedSale.paymentMethod}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Warranty */}
          <div className="border-t-2 border-gray-200 pt-4 mt-6">
            <h3 className="font-bold text-lg mb-3 text-gray-900">INFORMAÇÕES DE GARANTIA</h3>
            <div className="text-sm text-gray-700 space-y-2">
              <p>• Este comprovante é válido como garantia dos produtos adquiridos.</p>
              <p>• Prazo de garantia: 90 dias para produtos eletrônicos, 30 dias para demais produtos.</p>
              <p>• Para acionamento da garantia, apresente este comprovante junto com o produto.</p>
              <p>• Garantia não cobre danos causados por mau uso ou desgaste natural.</p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 pt-4 border-t border-gray-200 text-xs text-gray-500">
            <p>Data/Hora: {completedSale.date.toLocaleString('pt-BR')}</p>
            <p className="mt-2">Obrigado pela preferência!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nova Venda</h1>
          <p className="text-gray-600">Registre uma nova venda</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2 text-orange-500" />
              Dados do Cliente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                value={currentSale.customer?.name || ""}
                onChange={(e) => setCurrentSale({
                  ...currentSale,
                  customer: { ...currentSale.customer!, name: e.target.value }
                })}
                placeholder="Digite o nome do cliente"
              />
            </div>
            <div>
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                value={currentSale.customer?.cpf || ""}
                onChange={(e) => setCurrentSale({
                  ...currentSale,
                  customer: { ...currentSale.customer!, cpf: e.target.value }
                })}
                placeholder="000.000.000-00"
              />
            </div>
            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={currentSale.customer?.phone || ""}
                onChange={(e) => setCurrentSale({
                  ...currentSale,
                  customer: { ...currentSale.customer!, phone: e.target.value }
                })}
                placeholder="(00) 00000-0000"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={currentSale.customer?.email || ""}
                onChange={(e) => setCurrentSale({
                  ...currentSale,
                  customer: { ...currentSale.customer!, email: e.target.value }
                })}
                placeholder="cliente@email.com"
              />
            </div>
            <div>
              <Label htmlFor="address">Endereço</Label>
              <Textarea
                id="address"
                value={currentSale.customer?.address || ""}
                onChange={(e) => setCurrentSale({
                  ...currentSale,
                  customer: { ...currentSale.customer!, address: e.target.value }
                })}
                placeholder="Endereço completo do cliente"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Items */}
        <Card>
          <CardHeader>
            <CardTitle>Produtos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="description">Descrição do Produto</Label>
                <Input
                  id="description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  placeholder="Nome do produto"
                />
              </div>
              <div>
                <Label htmlFor="quantity">Quantidade</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })}
                />
              </div>
              <div>
                <Label htmlFor="unitPrice">Valor Unitário</Label>
                <Input
                  id="unitPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={newItem.unitPrice}
                  onChange={(e) => setNewItem({ ...newItem, unitPrice: parseFloat(e.target.value) || 0 })}
                  placeholder="0,00"
                />
              </div>
            </div>
            <Button onClick={addItem} className="w-full bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Item
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Items List */}
      {currentSale.items && currentSale.items.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Itens da Venda</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Produto</th>
                    <th className="text-center py-2">Qtd</th>
                    <th className="text-right py-2">Valor Unit.</th>
                    <th className="text-right py-2">Total</th>
                    <th className="text-center py-2">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSale.items.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-2">{item.description}</td>
                      <td className="text-center py-2">{item.quantity}</td>
                      <td className="text-right py-2">R$ {item.unitPrice.toFixed(2)}</td>
                      <td className="text-right py-2">R$ {item.total.toFixed(2)}</td>
                      <td className="text-center py-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <Label htmlFor="paymentMethod">Forma de Pagamento</Label>
                  <select
                    id="paymentMethod"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500"
                    value={currentSale.paymentMethod}
                    onChange={(e) => setCurrentSale({ ...currentSale, paymentMethod: e.target.value })}
                  >
                    <option value="dinheiro">Dinheiro</option>
                    <option value="cartao_debito">Cartão de Débito</option>
                    <option value="cartao_credito">Cartão de Crédito</option>
                    <option value="pix">PIX</option>
                    <option value="boleto">Boleto</option>
                  </select>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">
                    Total: R$ {(currentSale.total || 0).toFixed(2)}
                  </p>
                  <Button onClick={finalizeSale} className="mt-2 bg-orange-500 hover:bg-orange-600">
                    Finalizar Venda
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

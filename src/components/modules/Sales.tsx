
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Printer, Trash2, ShoppingCart, Filter, Search, MessageCircle, Download, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SaleItem {
  id: string;
  name: string;
  code: string;
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
  seller: string;
  date: Date;
}

export function Sales() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"new" | "list">("new");
  const [currentSale, setCurrentSale] = useState<Partial<Sale>>({
    customer: { name: "", cpf: "", address: "", phone: "", email: "" },
    items: [],
    subtotal: 0,
    total: 0,
    paymentMethod: "dinheiro",
    seller: "Ronei"
  });
  
  const [newItem, setNewItem] = useState({
    name: "",
    code: "",
    quantity: 1,
    unitPrice: 0
  });

  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [completedSale, setCompletedSale] = useState<Sale | null>(null);
  const [salesList] = useState<Sale[]>([
    {
      id: "001",
      customer: { name: "João Silva", cpf: "123.456.789-10", address: "Rua A, 123", phone: "(11) 99999-9999", email: "joao@email.com" },
      items: [
        { id: "1", name: "Smartphone", code: "SM001", quantity: 1, unitPrice: 800, total: 800 },
        { id: "2", name: "Capinha", code: "CP001", quantity: 1, unitPrice: 25, total: 25 }
      ],
      subtotal: 825,
      total: 825,
      paymentMethod: "cartao_credito",
      seller: "Ronei",
      date: new Date("2024-06-23T14:30:00")
    }
  ]);

  const [filters, setFilters] = useState({
    seller: "",
    paymentMethod: "",
    dateFrom: "",
    dateTo: ""
  });

  const addItem = () => {
    if (!newItem.name || !newItem.code || newItem.unitPrice <= 0) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos do produto",
        variant: "destructive"
      });
      return;
    }

    const item: SaleItem = {
      id: Date.now().toString(),
      name: newItem.name,
      code: newItem.code,
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

    setNewItem({ name: "", code: "", quantity: 1, unitPrice: 0 });
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
      seller: currentSale.seller || "Ronei",
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

  const sendWhatsApp = (sale: Sale) => {
    const message = `🧾 *COMPROVANTE DE VENDA*\n\n*Cliente:* ${sale.customer.name}\n*Total:* R$ ${sale.total.toFixed(2)}\n*Forma de Pagamento:* ${sale.paymentMethod}\n\nObrigado pela preferência!`;
    const whatsappUrl = `https://wa.me/${sale.customer.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "WhatsApp aberto!",
      description: "Comprovante enviado via WhatsApp",
    });
  };

  const downloadPDF = (sale: Sale) => {
    // Simular download do PDF
    toast({
      title: "PDF gerado!",
      description: "Download iniciado com sucesso",
    });
  };

  const newSale = () => {
    setCurrentSale({
      customer: { name: "", cpf: "", address: "", phone: "", email: "" },
      items: [],
      subtotal: 0,
      total: 0,
      paymentMethod: "dinheiro",
      seller: "Ronei"
    });
    setCompletedSale(null);
    setShowPrintPreview(false);
  };

  const getPaymentMethodLabel = (method: string) => {
    const methods: Record<string, string> = {
      dinheiro: "Dinheiro",
      cartao_debito: "Cartão Débito",
      cartao_credito: "Cartão Crédito",
      pix: "PIX",
      boleto: "Boleto"
    };
    return methods[method] || method;
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
            <Button onClick={() => sendWhatsApp(completedSale)} className="bg-green-500 hover:bg-green-600">
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
            <Button onClick={() => downloadPDF(completedSale)} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
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

          {/* Customer and Sale Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-bold text-lg mb-3 text-gray-900">DADOS DO CLIENTE</h3>
              <div className="text-sm space-y-1">
                <p><strong>Nome:</strong> {completedSale.customer.name}</p>
                <p><strong>CPF:</strong> {completedSale.customer.cpf}</p>
                <p><strong>Telefone:</strong> {completedSale.customer.phone}</p>
                <p><strong>Email:</strong> {completedSale.customer.email}</p>
                <p><strong>Endereço:</strong> {completedSale.customer.address}</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3 text-gray-900">DADOS DA VENDA</h3>
              <div className="text-sm space-y-1">
                <p><strong>Data:</strong> {completedSale.date.toLocaleDateString('pt-BR')}</p>
                <p><strong>Hora:</strong> {completedSale.date.toLocaleTimeString('pt-BR')}</p>
                <p><strong>Vendedor:</strong> {completedSale.seller}</p>
                <p><strong>Forma de Pagamento:</strong> {getPaymentMethodLabel(completedSale.paymentMethod)}</p>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="mb-6">
            <h3 className="font-bold text-lg mb-3 text-gray-900">ITENS DA VENDA</h3>
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Código</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Item</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Qtd</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Valor Unit.</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {completedSale.items.map((item) => (
                  <tr key={item.id}>
                    <td className="border border-gray-300 px-4 py-2">{item.code}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.name}</td>
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
            <p>Obrigado pela preferência!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vendas (PDV)</h1>
          <p className="text-gray-600">Ponto de Venda e gerenciamento de vendas</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant={activeTab === "new" ? "default" : "outline"}
            onClick={() => setActiveTab("new")}
            className={activeTab === "new" ? "bg-orange-500 hover:bg-orange-600" : ""}
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Venda
          </Button>
          <Button 
            variant={activeTab === "list" ? "default" : "outline"}
            onClick={() => setActiveTab("list")}
            className={activeTab === "list" ? "bg-orange-500 hover:bg-orange-600" : ""}
          >
            <Search className="w-4 h-4 mr-2" />
            Listar Vendas
          </Button>
        </div>
      </div>

      {activeTab === "new" ? (
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
                  <Label htmlFor="productName">Nome do Produto</Label>
                  <Input
                    id="productName"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    placeholder="Nome do produto"
                  />
                </div>
                <div>
                  <Label htmlFor="productCode">Código</Label>
                  <Input
                    id="productCode"
                    value={newItem.code}
                    onChange={(e) => setNewItem({ ...newItem, code: e.target.value })}
                    placeholder="Código do produto"
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
                <div className="sm:col-span-2">
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
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Lista de Vendas</span>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <Label>Vendedor</Label>
                <Select value={filters.seller} onValueChange={(value) => setFilters({...filters, seller: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos</SelectItem>
                    <SelectItem value="Ronei">Ronei</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Forma de Pagamento</Label>
                <Select value={filters.paymentMethod} onValueChange={(value) => setFilters({...filters, paymentMethod: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas</SelectItem>
                    <SelectItem value="dinheiro">Dinheiro</SelectItem>
                    <SelectItem value="cartao_credito">Cartão Crédito</SelectItem>
                    <SelectItem value="cartao_debito">Cartão Débito</SelectItem>
                    <SelectItem value="pix">PIX</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Data Inicial</Label>
                <Input 
                  type="date" 
                  value={filters.dateFrom}
                  onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                />
              </div>
              <div>
                <Label>Data Final</Label>
                <Input 
                  type="date" 
                  value={filters.dateTo}
                  onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3">ID</th>
                    <th className="text-left py-3">Cliente</th>
                    <th className="text-left py-3">Vendedor</th>
                    <th className="text-center py-3">Itens</th>
                    <th className="text-right py-3">Total</th>
                    <th className="text-center py-3">Pagamento</th>
                    <th className="text-center py-3">Data</th>
                    <th className="text-center py-3">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {salesList.map((sale) => (
                    <tr key={sale.id} className="border-b hover:bg-gray-50">
                      <td className="py-3">#{sale.id}</td>
                      <td className="py-3">{sale.customer.name}</td>
                      <td className="py-3">{sale.seller}</td>
                      <td className="text-center py-3">{sale.items.length}</td>
                      <td className="text-right py-3 font-semibold">R$ {sale.total.toFixed(2)}</td>
                      <td className="text-center py-3">
                        <Badge variant="outline">{getPaymentMethodLabel(sale.paymentMethod)}</Badge>
                      </td>
                      <td className="text-center py-3">{sale.date.toLocaleDateString('pt-BR')}</td>
                      <td className="text-center py-3">
                        <div className="flex justify-center space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setCompletedSale(sale);
                              setShowPrintPreview(true);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => sendWhatsApp(sale)}
                            className="text-green-600"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => downloadPDF(sale)}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Items List for New Sale */}
      {activeTab === "new" && currentSale.items && currentSale.items.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Itens da Venda</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Código</th>
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
                      <td className="py-2">{item.code}</td>
                      <td className="py-2">{item.name}</td>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full sm:w-auto">
                  <div>
                    <Label htmlFor="seller">Vendedor</Label>
                    <Select 
                      value={currentSale.seller} 
                      onValueChange={(value) => setCurrentSale({ ...currentSale, seller: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o vendedor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ronei">Ronei</SelectItem>
                        <SelectItem value="Maria">Maria</SelectItem>
                        <SelectItem value="João">João</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="paymentMethod">Forma de Pagamento</Label>
                    <Select 
                      value={currentSale.paymentMethod} 
                      onValueChange={(value) => setCurrentSale({ ...currentSale, paymentMethod: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a forma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dinheiro">Dinheiro</SelectItem>
                        <SelectItem value="cartao_debito">Cartão de Débito</SelectItem>
                        <SelectItem value="cartao_credito">Cartão de Crédito</SelectItem>
                        <SelectItem value="pix">PIX</SelectItem>
                        <SelectItem value="boleto">Boleto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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

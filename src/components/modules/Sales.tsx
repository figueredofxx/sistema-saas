
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { SalesHeader } from "./sales/SalesHeader";
import { SalesFilters } from "./sales/SalesFilters";
import { SalesTable } from "./sales/SalesTable";
import { Sale } from "./sales/types";

export function Sales() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeller, setSelectedSeller] = useState("todos");
  const [selectedPayment, setSelectedPayment] = useState("todas");

  const [sales] = useState<Sale[]>([
    {
      id: "001",
      customer: "João Silva",
      seller: "Maria",
      items: [
        { id: "1", name: "iPhone 15", quantity: 1, price: 8500 },
        { id: "2", name: "Capinha", quantity: 1, price: 25 }
      ],
      total: 8525,
      paymentMethod: "pix",
      date: new Date("2024-06-24")
    },
    {
      id: "002", 
      customer: "Ana Costa",
      seller: "Pedro",
      items: [
        { id: "3", name: "Carregador", quantity: 2, price: 55 }
      ],
      total: 110,
      paymentMethod: "dinheiro",
      date: new Date("2024-06-24")
    }
  ]);

  const filteredSales = sales.filter(sale => {
    const matchesSearch = sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sale.id.includes(searchTerm);
    const matchesSeller = selectedSeller === "todos" || sale.seller === selectedSeller;
    const matchesPayment = selectedPayment === "todas" || sale.paymentMethod === selectedPayment;
    
    return matchesSearch && matchesSeller && matchesPayment;
  });

  const handleNewSale = () => {
    toast({
      title: "Nova venda!",
      description: "Funcionalidade será implementada"
    });
  };

  const handleViewDetails = (sale: Sale) => {
    toast({
      title: "Detalhes da venda",
      description: `Venda #${sale.id} - ${sale.customer}`
    });
  };

  const handlePrint = (sale: Sale) => {
    window.print();
    toast({
      title: "Comprovante impresso!",
      description: `Venda #${sale.id} enviada para impressão`
    });
  };

  const handleSendWhatsApp = (sale: Sale) => {
    const message = `*COMPROVANTE DE VENDA*\n\nVenda: #${sale.id}\nCliente: ${sale.customer}\nTotal: R$ ${sale.total.toFixed(2)}\nData: ${sale.date.toLocaleDateString('pt-BR')}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "WhatsApp aberto!",
      description: "Comprovante pronto para envio"
    });
  };

  const handleDownloadPDF = (sale: Sale) => {
    toast({
      title: "PDF gerado!",
      description: `Comprovante da venda #${sale.id} baixado`
    });
  };

  return (
    <div className="space-y-6">
      <SalesHeader onNewSale={handleNewSale} />
      
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Vendas</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedSeller={selectedSeller}
            onSellerChange={setSelectedSeller}
            selectedPayment={selectedPayment}
            onPaymentChange={setSelectedPayment}
          />
          
          <SalesTable
            sales={filteredSales}
            onViewDetails={handleViewDetails}
            onPrint={handlePrint}
            onSendWhatsApp={handleSendWhatsApp}
            onDownloadPDF={handleDownloadPDF}
          />
        </CardContent>
      </Card>
    </div>
  );
}

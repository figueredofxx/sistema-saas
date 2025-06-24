
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Printer, MessageSquare, Download } from "lucide-react";
import { Sale } from "./types";

interface SalesTableProps {
  sales: Sale[];
  onViewDetails: (sale: Sale) => void;
  onPrint: (sale: Sale) => void;
  onSendWhatsApp: (sale: Sale) => void;
  onDownloadPDF: (sale: Sale) => void;
}

export function SalesTable({
  sales,
  onViewDetails,
  onPrint,
  onSendWhatsApp,
  onDownloadPDF
}: SalesTableProps) {
  const getPaymentMethodLabel = (method: string) => {
    const labels = {
      dinheiro: "Dinheiro",
      cartao: "Cartão",
      pix: "PIX",
      boleto: "Boleto"
    };
    return labels[method as keyof typeof labels] || method;
  };

  const getPaymentMethodColor = (method: string) => {
    const colors = {
      dinheiro: "bg-green-100 text-green-700",
      cartao: "bg-blue-100 text-blue-700",
      pix: "bg-purple-100 text-purple-700",
      boleto: "bg-yellow-100 text-yellow-700"
    };
    return colors[method as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  if (sales.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Nenhuma venda encontrada</p>
        <p className="text-sm text-gray-400 mt-2">
          Registre uma nova venda para começar
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3">ID</th>
            <th className="text-left py-3">Cliente</th>
            <th className="text-left py-3">Vendedor</th>
            <th className="text-center py-3">Produtos</th>
            <th className="text-right py-3">Total</th>
            <th className="text-center py-3">Pagamento</th>
            <th className="text-center py-3">Data</th>
            <th className="text-center py-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id} className="border-b hover:bg-gray-50">
              <td className="py-3 font-mono">#{sale.id}</td>
              <td className="py-3">{sale.customer}</td>
              <td className="py-3">{sale.seller}</td>
              <td className="text-center py-3">{sale.items.length}</td>
              <td className="text-right py-3 font-semibold">
                R$ {sale.total.toFixed(2)}
              </td>
              <td className="text-center py-3">
                <Badge className={getPaymentMethodColor(sale.paymentMethod)}>
                  {getPaymentMethodLabel(sale.paymentMethod)}
                </Badge>
              </td>
              <td className="text-center py-3">
                {sale.date.toLocaleDateString('pt-BR')}
              </td>
              <td className="text-center py-3">
                <div className="flex justify-center space-x-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onViewDetails(sale)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onPrint(sale)}
                  >
                    <Printer className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onSendWhatsApp(sale)}
                  >
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onDownloadPDF(sale)}
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
  );
}

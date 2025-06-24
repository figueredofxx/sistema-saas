
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface SalesHeaderProps {
  onNewSale: () => void;
}

export function SalesHeader({ onNewSale }: SalesHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Vendas (PDV)</h1>
        <p className="text-gray-600">Gerenciamento de vendas e ponto de venda</p>
      </div>
      <Button onClick={onNewSale} className="bg-orange-500 hover:bg-orange-600">
        <Plus className="w-4 h-4 mr-2" />
        Nova Venda
      </Button>
    </div>
  );
}

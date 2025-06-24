
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, DollarSign } from "lucide-react";

interface CashierHeaderProps {
  isOpen: boolean;
  onOpenCashier: () => void;
  onNewMovement: () => void;
  onCloseCashier: () => void;
}

export function CashierHeader({
  isOpen,
  onOpenCashier,
  onNewMovement,
  onCloseCashier
}: CashierHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Caixa</h1>
        <p className="text-gray-600">Controle financeiro e movimentações</p>
      </div>
      <div className="flex space-x-2">
        {!isOpen ? (
          <Button onClick={onOpenCashier} className="bg-green-500 hover:bg-green-600">
            Abrir Caixa
          </Button>
        ) : (
          <>
            <Button variant="outline" onClick={onNewMovement}>
              <DollarSign className="w-4 h-4 mr-2" />
              Nova Movimentação
            </Button>
            <Button onClick={onCloseCashier} className="bg-red-500 hover:bg-red-600">
              Fechar Caixa
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

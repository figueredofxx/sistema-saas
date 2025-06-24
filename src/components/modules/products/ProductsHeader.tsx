
import { Button } from "@/components/ui/button";
import { Plus, Upload, Download } from "lucide-react";

interface ProductsHeaderProps {
  onNewProduct: () => void;
  onImport: () => void;
  onExport: () => void;
}

export function ProductsHeader({ onNewProduct, onImport, onExport }: ProductsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Produtos</h1>
        <p className="text-gray-600">Gerencie seu estoque e catálogo</p>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" onClick={onImport}>
          <Upload className="w-4 h-4 mr-2" />
          Importar
        </Button>
        <Button variant="outline" onClick={onExport}>
          <Download className="w-4 h-4 mr-2" />
          Exportar
        </Button>
        <Button onClick={onNewProduct} className="bg-orange-500 hover:bg-orange-600">
          <Plus className="w-4 h-4 mr-2" />
          Novo Produto
        </Button>
      </div>
    </div>
  );
}

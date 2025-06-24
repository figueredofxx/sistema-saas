
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

interface ProductsFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  lowStockFilter: boolean;
  onLowStockToggle: () => void;
  categories: string[];
}

export function ProductsFilters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  lowStockFilter,
  onLowStockToggle,
  categories
}: ProductsFiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="md:col-span-2">
        <Label>Buscar Produto</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Nome ou código do produto..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <div>
        <Label>Categoria</Label>
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Todas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todas</SelectItem>
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-end">
        <Button
          variant={lowStockFilter ? "default" : "outline"}
          onClick={onLowStockToggle}
          className={lowStockFilter ? "bg-orange-500 hover:bg-orange-600" : ""}
        >
          <Filter className="w-4 h-4 mr-2" />
          Estoque Baixo
        </Button>
      </div>
    </div>
  );
}

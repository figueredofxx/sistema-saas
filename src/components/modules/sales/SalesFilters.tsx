
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface SalesFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedSeller: string;
  onSellerChange: (value: string) => void;
  selectedPayment: string;
  onPaymentChange: (value: string) => void;
}

export function SalesFilters({
  searchTerm,
  onSearchChange,
  selectedSeller,
  onSellerChange,
  selectedPayment,
  onPaymentChange
}: SalesFiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div>
        <Label>Buscar Venda</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Cliente ou ID da venda..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <div>
        <Label>Vendedor</Label>
        <Select value={selectedSeller} onValueChange={onSellerChange}>
          <SelectTrigger>
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="João">João</SelectItem>
            <SelectItem value="Maria">Maria</SelectItem>
            <SelectItem value="Pedro">Pedro</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Forma de Pagamento</Label>
        <Select value={selectedPayment} onValueChange={onPaymentChange}>
          <SelectTrigger>
            <SelectValue placeholder="Todas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas</SelectItem>
            <SelectItem value="dinheiro">Dinheiro</SelectItem>
            <SelectItem value="cartao">Cartão</SelectItem>
            <SelectItem value="pix">PIX</SelectItem>
            <SelectItem value="boleto">Boleto</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

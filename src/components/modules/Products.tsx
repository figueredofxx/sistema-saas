
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ProductsHeader } from "./products/ProductsHeader";
import { ProductsFilters } from "./products/ProductsFilters";
import { Product } from "./products/types";

export function Products() {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "iPhone 15 Pro",
      category: "Smartphones",
      color: "Azul Titânio",
      stock: 5,
      imei: "123456789012345",
      costPrice: 7500,
      salePrice: 8500,
      createdAt: new Date("2024-06-20")
    },
    {
      id: "2",
      name: "Capinha Transparente",
      category: "Acessórios",
      color: "Transparente",
      stock: 25,
      costPrice: 15,
      salePrice: 25,
      createdAt: new Date("2024-06-21")
    },
    {
      id: "3",
      name: "Carregador USB-C",
      category: "Acessórios",
      stock: 2,
      costPrice: 35,
      salePrice: 55,
      createdAt: new Date("2024-06-22")
    }
  ]);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    lowStock: false
  });

  const categories = ["Smartphones", "Acessórios", "Tablets", "Eletrônicos", "Capas"];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         product.imei?.includes(filters.search);
    const matchesCategory = !filters.category || product.category === filters.category;
    const matchesLowStock = !filters.lowStock || product.stock <= 5;
    
    return matchesSearch && matchesCategory && matchesLowStock;
  });

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { color: "bg-red-100 text-red-700", label: "Sem estoque" };
    if (stock <= 5) return { color: "bg-yellow-100 text-yellow-700", label: "Estoque baixo" };
    return { color: "bg-green-100 text-green-700", label: "Em estoque" };
  };

  const handleNewProduct = () => {
    toast({
      title: "Novo produto!",
      description: "Funcionalidade será implementada"
    });
  };

  const handleImport = () => {
    toast({
      title: "Importação iniciada!",
      description: "Funcionalidade será implementada"
    });
  };

  const handleExport = () => {
    const csv = [
      ["Nome", "Categoria", "Cor", "Estoque", "IMEI/Código", "Preço Custo", "Preço Venda"].join(","),
      ...filteredProducts.map(p => [
        p.name,
        p.category,
        p.color || "",
        p.stock,
        p.imei || "",
        p.costPrice,
        p.salePrice
      ].join(","))
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "produtos.csv";
    a.click();
    
    toast({
      title: "Exportação concluída!",
      description: "Lista de produtos exportada com sucesso"
    });
  };

  const handleEdit = (product: Product) => {
    toast({
      title: "Editar produto",
      description: `Editando ${product.name}`
    });
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast({
      title: "Produto removido!",
      description: "Produto excluído do estoque"
    });
  };

  return (
    <div className="space-y-6">
      <ProductsHeader
        onNewProduct={handleNewProduct}
        onImport={handleImport}
        onExport={handleExport}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="w-5 h-5 mr-2 text-orange-500" />
            Catálogo de Produtos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ProductsFilters
            searchTerm={filters.search}
            onSearchChange={(value) => setFilters({ ...filters, search: value })}
            selectedCategory={filters.category}
            onCategoryChange={(value) => setFilters({ ...filters, category: value })}
            lowStockFilter={filters.lowStock}
            onLowStockToggle={() => setFilters({ ...filters, lowStock: !filters.lowStock })}
            categories={categories}
          />

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Nome</th>
                  <th className="text-left py-3">Categoria</th>
                  <th className="text-left py-3">Cor</th>
                  <th className="text-center py-3">Estoque</th>
                  <th className="text-left py-3">IMEI/Código</th>
                  <th className="text-right py-3">Preço Custo</th>
                  <th className="text-right py-3">Preço Venda</th>
                  <th className="text-center py-3">Status</th>
                  <th className="text-center py-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const stockStatus = getStockStatus(product.stock);
                  return (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 font-medium">{product.name}</td>
                      <td className="py-3">{product.category}</td>
                      <td className="py-3">{product.color || "-"}</td>
                      <td className="text-center py-3 font-semibold">{product.stock}</td>
                      <td className="py-3 font-mono text-sm">{product.imei || "-"}</td>
                      <td className="text-right py-3">R$ {product.costPrice.toFixed(2)}</td>
                      <td className="text-right py-3 font-semibold">R$ {product.salePrice.toFixed(2)}</td>
                      <td className="text-center py-3">
                        <Badge className={stockStatus.color}>
                          {stockStatus.label}
                        </Badge>
                      </td>
                      <td className="text-center py-3">
                        <div className="flex justify-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(product)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Nenhum produto encontrado</p>
              <p className="text-sm text-gray-400 mt-2">
                Tente ajustar os filtros ou adicione novos produtos
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Filter, Edit, Trash2, Upload, Download, ArrowUpDown, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Product {
  id: string;
  name: string;
  category: string;
  color?: string;
  stock: number;
  imei?: string;
  costPrice: number;
  salePrice: number;
  photo?: string;
  createdAt: Date;
}

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

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    category: "",
    color: "",
    stock: 0,
    imei: "",
    costPrice: 0,
    salePrice: 0
  });

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

  const handleSaveProduct = () => {
    if (!newProduct.name || !newProduct.category || newProduct.salePrice! <= 0) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...newProduct, id: editingProduct.id, createdAt: editingProduct.createdAt } as Product
          : p
      ));
      toast({
        title: "Produto atualizado!",
        description: "Produto editado com sucesso"
      });
    } else {
      const product: Product = {
        ...newProduct,
        id: Date.now().toString(),
        createdAt: new Date()
      } as Product;
      
      setProducts([...products, product]);
      toast({
        title: "Produto cadastrado!",
        description: "Novo produto adicionado ao estoque"
      });
    }

    setNewProduct({
      name: "",
      category: "",
      color: "",
      stock: 0,
      imei: "",
      costPrice: 0,
      salePrice: 0
    });
    setShowAddDialog(false);
    setEditingProduct(null);
  };

  const handleEditProduct = (product: Product) => {
    setNewProduct(product);
    setEditingProduct(product);
    setShowAddDialog(true);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast({
      title: "Produto removido!",
      description: "Produto excluído do estoque"
    });
  };

  const handleImportProducts = () => {
    toast({
      title: "Importação iniciada!",
      description: "Funcionalidade de importação será implementada"
    });
  };

  const handleExportProducts = () => {
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

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { color: "bg-red-100 text-red-700", label: "Sem estoque" };
    if (stock <= 5) return { color: "bg-yellow-100 text-yellow-700", label: "Estoque baixo" };
    return { color: "bg-green-100 text-green-700", label: "Em estoque" };
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Produtos</h1>
          <p className="text-gray-600">Gerencie seu estoque e catálogo</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleImportProducts}>
            <Upload className="w-4 h-4 mr-2" />
            Importar
          </Button>
          <Button variant="outline" onClick={handleExportProducts}>
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Plus className="w-4 h-4 mr-2" />
                Novo Produto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingProduct ? "Editar Produto" : "Novo Produto"}
                </DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="productName">Nome do Produto *</Label>
                  <Input
                    id="productName"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="Nome do produto"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Categoria *</Label>
                  <Select 
                    value={newProduct.category} 
                    onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="color">Cor</Label>
                  <Input
                    id="color"
                    value={newProduct.color}
                    onChange={(e) => setNewProduct({ ...newProduct, color: e.target.value })}
                    placeholder="Cor do produto"
                  />
                </div>
                <div>
                  <Label htmlFor="stock">Quantidade em Estoque *</Label>
                  <Input
                    id="stock"
                    type="number"
                    min="0"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="imei">IMEI/Código/SN</Label>
                  <Input
                    id="imei"
                    value={newProduct.imei}
                    onChange={(e) => setNewProduct({ ...newProduct, imei: e.target.value })}
                    placeholder="Código identificador"
                  />
                </div>
                <div>
                  <Label htmlFor="costPrice">Preço de Custo</Label>
                  <Input
                    id="costPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={newProduct.costPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, costPrice: parseFloat(e.target.value) || 0 })}
                    placeholder="0,00"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="salePrice">Preço de Venda *</Label>
                  <Input
                    id="salePrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={newProduct.salePrice}
                    onChange={(e) => setNewProduct({ ...newProduct, salePrice: parseFloat(e.target.value) || 0 })}
                    placeholder="0,00"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline" onClick={() => {
                  setShowAddDialog(false);
                  setEditingProduct(null);
                  setNewProduct({
                    name: "",
                    category: "",
                    color: "",
                    stock: 0,
                    imei: "",
                    costPrice: 0,
                    salePrice: 0
                  });
                }}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveProduct} className="bg-orange-500 hover:bg-orange-600">
                  {editingProduct ? "Atualizar" : "Cadastrar"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="w-5 h-5 mr-2 text-orange-500" />
            Catálogo de Produtos
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="md:col-span-2">
              <Label>Buscar Produto</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Nome ou código do produto..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label>Categoria</Label>
              <Select value={filters.category} onValueChange={(value) => setFilters({...filters, category: value})}>
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
                variant={filters.lowStock ? "default" : "outline"}
                onClick={() => setFilters({ ...filters, lowStock: !filters.lowStock })}
                className={filters.lowStock ? "bg-orange-500 hover:bg-orange-600" : ""}
              >
                <Filter className="w-4 h-4 mr-2" />
                Estoque Baixo
              </Button>
            </div>
          </div>

          {/* Products Table */}
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
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteProduct(product.id)}
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

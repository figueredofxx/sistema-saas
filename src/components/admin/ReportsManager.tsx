
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { FileText, Download, Filter, Calendar, User, TrendingUp } from 'lucide-react';

export function ReportsManager() {
  const [filters, setFilters] = useState({
    lojista: 'todos',
    periodo: '30dias',
    status: 'todos',
    categoria: 'todos'
  });

  const [reports] = useState([
    {
      id: 1,
      nome: 'Relatório de Vendas',
      periodo: 'Últimos 30 dias',
      lojista: 'Todos',
      gerado: '2024-06-24 10:30',
      status: 'concluido'
    },
    {
      id: 2,
      nome: 'Relatório Financeiro',
      periodo: 'Junho 2024',
      lojista: 'João Silva',
      gerado: '2024-06-23 15:45',
      status: 'concluido'
    },
    {
      id: 3,
      nome: 'Relatório de Suporte',
      periodo: 'Última semana',
      lojista: 'Todos',
      gerado: '2024-06-22 09:15',
      status: 'processando'
    }
  ]);

  const { toast } = useToast();

  const handleGenerateReport = () => {
    toast({
      title: "Relatório em processamento",
      description: "Seu relatório está sendo gerado e ficará disponível em breve."
    });
  };

  const handleDownloadReport = (reportId: number) => {
    toast({
      title: "Download iniciado",
      description: "O download do relatório foi iniciado."
    });
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      concluido: 'bg-green-100 text-green-700',
      processando: 'bg-yellow-100 text-yellow-700',
      erro: 'bg-red-100 text-red-700'
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-700';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      concluido: 'Concluído',
      processando: 'Processando',
      erro: 'Erro'
    };
    return labels[status as keyof typeof labels] || status;
  };

  return (
    <div className="space-y-6">
      {/* Filtros Dinâmicos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-blue-600" />
            Filtros de Relatórios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <Label>Lojista</Label>
              <Select value={filters.lojista} onValueChange={(value) => setFilters({ ...filters, lojista: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="joao">João Silva</SelectItem>
                  <SelectItem value="maria">Maria Santos</SelectItem>
                  <SelectItem value="pedro">Pedro Costa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Período</Label>
              <Select value={filters.periodo} onValueChange={(value) => setFilters({ ...filters, periodo: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7dias">Últimos 7 dias</SelectItem>
                  <SelectItem value="30dias">Últimos 30 dias</SelectItem>
                  <SelectItem value="3meses">Últimos 3 meses</SelectItem>
                  <SelectItem value="ano">Último ano</SelectItem>
                  <SelectItem value="personalizado">Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Status</Label>
              <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                  <SelectItem value="teste">Em Teste</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Categoria</Label>
              <Select value={filters.categoria} onValueChange={(value) => setFilters({ ...filters, categoria: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas</SelectItem>
                  <SelectItem value="vendas">Vendas</SelectItem>
                  <SelectItem value="financeiro">Financeiro</SelectItem>
                  <SelectItem value="suporte">Suporte</SelectItem>
                  <SelectItem value="sistema">Sistema</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              onClick={handleGenerateReport}
              className="hover:bg-slate-700 hover:text-white transition-colors"
            >
              <FileText className="w-4 h-4 mr-2" />
              Gerar Relatório
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Relatórios Rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:bg-slate-700 hover:text-white transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 text-green-600" />
            <h3 className="font-semibold text-lg mb-2">Relatório de Vendas</h3>
            <p className="text-sm text-gray-600 mb-4">
              Performance de vendas por lojista e período
            </p>
            <Button 
              size="sm" 
              variant="outline"
              className="hover:bg-white hover:text-slate-700 transition-colors"
            >
              Gerar Agora
            </Button>
          </CardContent>
        </Card>
        
        <Card className="hover:bg-slate-700 hover:text-white transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <User className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h3 className="font-semibold text-lg mb-2">Relatório de Lojistas</h3>
            <p className="text-sm text-gray-600 mb-4">
              Status e performance dos lojistas
            </p>
            <Button 
              size="sm" 
              variant="outline"
              className="hover:bg-white hover:text-slate-700 transition-colors"
            >
              Gerar Agora
            </Button>
          </CardContent>
        </Card>
        
        <Card className="hover:bg-slate-700 hover:text-white transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-purple-600" />
            <h3 className="font-semibold text-lg mb-2">Relatório Financeiro</h3>
            <p className="text-sm text-gray-600 mb-4">
              Receitas, pagamentos e inadimplência
            </p>
            <Button 
              size="sm" 
              variant="outline"
              className="hover:bg-white hover:text-slate-700 transition-colors"
            >
              Gerar Agora
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Relatórios Gerados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-600" />
            Relatórios Gerados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Nome do Relatório</th>
                  <th className="text-center py-3">Período</th>
                  <th className="text-center py-3">Lojista</th>
                  <th className="text-center py-3">Gerado em</th>
                  <th className="text-center py-3">Status</th>
                  <th className="text-center py-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 font-medium">{report.nome}</td>
                    <td className="text-center py-3">{report.periodo}</td>
                    <td className="text-center py-3">{report.lojista}</td>
                    <td className="text-center py-3 text-sm">{report.gerado}</td>
                    <td className="text-center py-3">
                      <Badge className={getStatusBadge(report.status)}>
                        {getStatusLabel(report.status)}
                      </Badge>
                    </td>
                    <td className="text-center py-3">
                      <div className="flex justify-center gap-2">
                        {report.status === 'concluido' && (
                          <Button
                            size="sm"
                            onClick={() => handleDownloadReport(report.id)}
                            className="hover:bg-slate-700 hover:text-white transition-colors"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="hover:bg-slate-700 hover:text-white transition-colors"
                        >
                          Detalhes
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
    </div>
  );
}

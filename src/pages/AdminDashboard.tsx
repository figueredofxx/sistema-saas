
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  DollarSign, 
  AlertTriangle, 
  TrendingUp, 
  MessageSquare,
  Settings,
  Search,
  Filter,
  Download
} from 'lucide-react';
import { StoreProfile } from '@/components/admin/StoreProfile';
import { TicketManager } from '@/components/admin/TicketManager';
import { FinancialManager } from '@/components/admin/FinancialManager';
import { SystemMonitoring } from '@/components/admin/SystemMonitoring';
import { SystemConfig } from '@/components/admin/SystemConfig';
import { ReportsManager } from '@/components/admin/ReportsManager';

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [lojistas, setLojistas] = useState([
    {
      id: 1,
      name: 'João Silva',
      store: 'Loja do João',
      cnpj: '12.345.678/0001-90',
      email: 'joao@loja.com',
      phone: '(11) 99999-1111',
      plan: 'single',
      status: 'active',
      lastLogin: '2024-06-24',
      revenue: 'R$ 2.340'
    },
    {
      id: 2,
      name: 'Maria Santos',
      store: 'Fashion Store',
      cnpj: '98.765.432/0001-10',
      email: 'maria@fashion.com',
      phone: '(11) 99999-2222',
      plan: 'multi',
      status: 'trial',
      lastLogin: '2024-06-23',
      revenue: 'R$ 5.670'
    },
    {
      id: 3,
      name: 'Pedro Costa',
      store: 'TechnoShop',
      cnpj: '11.222.333/0001-44',
      email: 'pedro@techno.com',
      phone: '(11) 99999-3333',
      plan: 'single',
      status: 'expired',
      lastLogin: '2024-06-20',
      revenue: 'R$ 890'
    }
  ]);

  const tickets = [
    {
      id: 1,
      lojista: 'João Silva',
      subject: 'Erro na impressão de cupons',
      category: 'Técnico',
      status: 'open',
      created: '2024-06-24 14:30',
      priority: 'high'
    },
    {
      id: 2,
      lojista: 'Maria Santos',
      subject: 'Dúvida sobre cobrança',
      category: 'Financeiro',
      status: 'in_progress',
      created: '2024-06-24 10:15',
      priority: 'medium'
    },
    {
      id: 3,
      lojista: 'Pedro Costa',
      subject: 'Solicitação de reativação',
      category: 'Comercial',
      status: 'resolved',
      created: '2024-06-23 16:45',
      priority: 'low'
    }
  ];

  const stats = [
    {
      title: 'Lojistas Ativos',
      value: '1,234',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Receita Mensal',
      value: 'R$ 45.678',
      change: '+8%',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Tickets Abertos',
      value: '23',
      change: '-15%',
      icon: MessageSquare,
      color: 'text-orange-600'
    },
    {
      title: 'Sistema',
      value: '99.9%',
      change: 'Uptime',
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ];

  const handleUpdateLojista = (id: number, data: any) => {
    setLojistas(lojistas.map(lojista => 
      lojista.id === id ? { ...lojista, ...data } : lojista
    ));
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-700',
      trial: 'bg-orange-100 text-orange-700',
      expired: 'bg-red-100 text-red-700',
      open: 'bg-red-100 text-red-700',
      in_progress: 'bg-yellow-100 text-yellow-700',
      resolved: 'bg-green-100 text-green-700'
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-700';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      active: 'Ativo',
      trial: 'Teste',
      expired: 'Expirado',
      open: 'Aberto',
      in_progress: 'Em Andamento',
      resolved: 'Resolvido'
    };
    return labels[status as keyof typeof labels] || status;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
              <p className="text-gray-600">Gestão completa da plataforma SaaS</p>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="outline"
                className="hover:bg-slate-700 hover:text-white transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Relatórios
              </Button>
              <Button className="bg-orange-600 hover:bg-slate-700 hover:text-white transition-colors">
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:bg-slate-700 hover:text-white transition-colors cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-green-600">{stat.change}</p>
                    </div>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="lojistas" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="lojistas">Lojistas</TabsTrigger>
            <TabsTrigger value="suporte">Suporte</TabsTrigger>
            <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
            <TabsTrigger value="sistema">Sistema</TabsTrigger>
            <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
            <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
          </TabsList>

          <TabsContent value="lojistas">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Gestão de Lojistas</CardTitle>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Buscar lojista..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button 
                      variant="outline"
                      className="hover:bg-slate-700 hover:text-white transition-colors"
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      Filtros
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3">Lojista</th>
                        <th className="text-left py-3">Loja</th>
                        <th className="text-left py-3">CNPJ</th>
                        <th className="text-center py-3">Plano</th>
                        <th className="text-center py-3">Status</th>
                        <th className="text-center py-3">Último Acesso</th>
                        <th className="text-right py-3">Receita</th>
                        <th className="text-center py-3">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lojistas.map((lojista) => (
                        <tr key={lojista.id} className="border-b hover:bg-gray-50">
                          <td className="py-3">{lojista.name}</td>
                          <td className="py-3">{lojista.store}</td>
                          <td className="py-3 font-mono text-sm">{lojista.cnpj}</td>
                          <td className="text-center py-3">
                            <Badge variant="outline">
                              {lojista.plan === 'single' ? 'Única' : 'Multi'}
                            </Badge>
                          </td>
                          <td className="text-center py-3">
                            <Badge className={getStatusBadge(lojista.status)}>
                              {getStatusLabel(lojista.status)}
                            </Badge>
                          </td>
                          <td className="text-center py-3">{lojista.lastLogin}</td>
                          <td className="text-right py-3 font-semibold">{lojista.revenue}</td>
                          <td className="text-center py-3">
                            <div className="flex justify-center space-x-2">
                              <StoreProfile 
                                lojista={lojista} 
                                onUpdate={handleUpdateLojista} 
                              />
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
          </TabsContent>

          <TabsContent value="suporte">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Sistema de Suporte</CardTitle>
                  <TicketManager isNew />
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3">ID</th>
                        <th className="text-left py-3">Lojista</th>
                        <th className="text-left py-3">Assunto</th>
                        <th className="text-center py-3">Categoria</th>
                        <th className="text-center py-3">Status</th>
                        <th className="text-center py-3">Prioridade</th>
                        <th className="text-center py-3">Criado em</th>
                        <th className="text-center py-3">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tickets.map((ticket) => (
                        <tr key={ticket.id} className="border-b hover:bg-gray-50">
                          <td className="py-3">#{ticket.id}</td>
                          <td className="py-3">{ticket.lojista}</td>
                          <td className="py-3">{ticket.subject}</td>
                          <td className="text-center py-3">
                            <Badge variant="outline">{ticket.category}</Badge>
                          </td>
                          <td className="text-center py-3">
                            <Badge className={getStatusBadge(ticket.status)}>
                              {getStatusLabel(ticket.status)}
                            </Badge>
                          </td>
                          <td className="text-center py-3">
                            <Badge 
                              className={
                                ticket.priority === 'high' ? 'bg-red-100 text-red-700' :
                                ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-green-100 text-green-700'
                              }
                            >
                              {ticket.priority === 'high' ? 'Alta' : 
                               ticket.priority === 'medium' ? 'Média' : 'Baixa'}
                            </Badge>
                          </td>
                          <td className="text-center py-3 text-sm">{ticket.created}</td>
                          <td className="text-center py-3">
                            <TicketManager ticket={ticket} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financeiro">
            <FinancialManager />
          </TabsContent>

          <TabsContent value="sistema">
            <SystemMonitoring />
          </TabsContent>

          <TabsContent value="configuracoes">
            <SystemConfig />
          </TabsContent>

          <TabsContent value="relatorios">
            <ReportsManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

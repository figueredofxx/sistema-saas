
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminStats } from '@/components/admin/AdminStats';
import { LojistasTab } from '@/components/admin/LojistasTab';
import { SuporteTab } from '@/components/admin/SuporteTab';
import { FinancialManager } from '@/components/admin/FinancialManager';
import { SystemMonitoring } from '@/components/admin/SystemMonitoring';
import { SystemConfig } from '@/components/admin/SystemConfig';
import { ReportsManager } from '@/components/admin/ReportsManager';

export default function AdminDashboard() {
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

  const handleUpdateLojista = (id: number, data: any) => {
    setLojistas(lojistas.map(lojista => 
      lojista.id === id ? { ...lojista, ...data } : lojista
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminStats />

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
            <LojistasTab 
              lojistas={lojistas} 
              onUpdateLojista={handleUpdateLojista} 
            />
          </TabsContent>

          <TabsContent value="suporte">
            <SuporteTab tickets={tickets} />
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

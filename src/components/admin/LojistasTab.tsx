
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter } from 'lucide-react';
import { StoreProfile } from './StoreProfile';

interface Lojista {
  id: number;
  name: string;
  store: string;
  cnpj: string;
  email?: string;
  phone?: string;
  plan: string;
  status: string;
  lastLogin: string;
  revenue: string;
}

interface LojistasTabProps {
  lojistas: Lojista[];
  onUpdateLojista: (id: number, data: any) => void;
}

export function LojistasTab({ lojistas, onUpdateLojista }: LojistasTabProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-700 hover:bg-gray-900 hover:text-white',
      trial: 'bg-orange-100 text-orange-700 hover:bg-gray-900 hover:text-white',
      expired: 'bg-red-100 text-red-700 hover:bg-gray-900 hover:text-white'
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-700 hover:bg-gray-900 hover:text-white';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      active: 'Ativo',
      trial: 'Teste',
      expired: 'Expirado'
    };
    return labels[status as keyof typeof labels] || status;
  };

  return (
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
                className="pl-10 w-64 hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white transition-colors"
              />
            </div>
            <Button 
              variant="outline"
              className="hover:bg-gray-900 hover:text-white transition-colors"
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
                <tr key={lojista.id} className="border-b hover:bg-gray-900 hover:text-white transition-colors group">
                  <td className="py-3">{lojista.name}</td>
                  <td className="py-3">{lojista.store}</td>
                  <td className="py-3 font-mono text-sm">{lojista.cnpj}</td>
                  <td className="text-center py-3">
                    <Badge variant="outline" className="hover:bg-gray-900 hover:text-white transition-colors">
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
                        onUpdate={onUpdateLojista} 
                      />
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="hover:bg-gray-900 hover:text-white transition-colors"
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
  );
}

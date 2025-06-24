
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Activity, AlertTriangle, Plus, Settings, Wifi, Database, Server, MessageSquare } from 'lucide-react';

interface Service {
  name: string;
  status: 'online' | 'offline' | 'unstable';
  uptime: string;
  lastCheck: string;
  icon: any;
}

interface Incident {
  id: number;
  service: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  created: string;
  status: 'open' | 'investigating' | 'resolved';
}

export function SystemMonitoring() {
  const [services] = useState<Service[]>([
    {
      name: 'API Principal',
      status: 'online',
      uptime: '99.9%',
      lastCheck: '2024-06-24 15:30',
      icon: Server
    },
    {
      name: 'Banco de Dados',
      status: 'online',
      uptime: '99.8%',
      lastCheck: '2024-06-24 15:30',
      icon: Database
    },
    {
      name: 'Servidor de Arquivos',
      status: 'online',
      uptime: '99.9%',
      lastCheck: '2024-06-24 15:30',
      icon: Wifi
    },
    {
      name: 'WhatsApp API',
      status: 'unstable',
      uptime: '95.2%',
      lastCheck: '2024-06-24 15:25',
      icon: MessageSquare
    }
  ]);

  const [incidents, setIncidents] = useState<Incident[]>([
    {
      id: 1,
      service: 'WhatsApp API',
      description: 'Intermitências na integração com WhatsApp',
      severity: 'medium',
      created: '2024-06-24 14:30',
      status: 'investigating'
    }
  ]);

  const [newIncident, setNewIncident] = useState({
    service: '',
    description: '',
    severity: 'medium' as const
  });

  const { toast } = useToast();

  const getStatusBadge = (status: string) => {
    const styles = {
      online: 'bg-green-100 text-green-700',
      offline: 'bg-red-100 text-red-700',
      unstable: 'bg-yellow-100 text-yellow-700'
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-700';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      online: 'Online',
      offline: 'Offline',
      unstable: 'Instável'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getSeverityBadge = (severity: string) => {
    const styles = {
      low: 'bg-blue-100 text-blue-700',
      medium: 'bg-yellow-100 text-yellow-700',
      high: 'bg-orange-100 text-orange-700',
      critical: 'bg-red-100 text-red-700'
    };
    return styles[severity as keyof typeof styles] || 'bg-gray-100 text-gray-700';
  };

  const getSeverityLabel = (severity: string) => {
    const labels = {
      low: 'Baixa',
      medium: 'Média',
      high: 'Alta',
      critical: 'Crítica'
    };
    return labels[severity as keyof typeof labels] || severity;
  };

  const handleCreateIncident = () => {
    if (!newIncident.service || !newIncident.description) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const incident: Incident = {
      id: incidents.length + 1,
      ...newIncident,
      created: new Date().toLocaleString('pt-BR'),
      status: 'open'
    };

    setIncidents([...incidents, incident]);
    setNewIncident({ service: '', description: '', severity: 'medium' });
    
    toast({
      title: "Avaria registrada",
      description: "A avaria foi registrada com sucesso no sistema."
    });
  };

  return (
    <div className="space-y-6">
      {/* Status dos Serviços */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-600" />
            Status dos Serviços em Tempo Real
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div 
                  key={index} 
                  className="p-4 border rounded-lg hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="w-5 h-5" />
                    <Badge className={getStatusBadge(service.status)}>
                      {getStatusLabel(service.status)}
                    </Badge>
                  </div>
                  <h3 className="font-medium">{service.name}</h3>
                  <div className="text-sm text-gray-600 mt-2 space-y-1">
                    <div>Uptime: {service.uptime}</div>
                    <div>Última verificação: {service.lastCheck}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Registrar Nova Avaria */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              Gerenciamento de Avarias
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="hover:bg-slate-700 hover:text-white transition-colors">
                  <Plus className="w-4 h-4 mr-2" />
                  Registrar Avaria
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Registrar Nova Avaria</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Serviço Afetado</Label>
                    <Select 
                      value={newIncident.service} 
                      onValueChange={(value) => setNewIncident({ ...newIncident, service: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.name} value={service.name}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Severidade</Label>
                    <Select 
                      value={newIncident.severity} 
                      onValueChange={(value: any) => setNewIncident({ ...newIncident, severity: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Baixa</SelectItem>
                        <SelectItem value="medium">Média</SelectItem>
                        <SelectItem value="high">Alta</SelectItem>
                        <SelectItem value="critical">Crítica</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Descrição da Avaria</Label>
                    <Textarea
                      value={newIncident.description}
                      onChange={(e) => setNewIncident({ ...newIncident, description: e.target.value })}
                      placeholder="Descreva o problema identificado..."
                      rows={4}
                    />
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">
                      Cancelar
                    </Button>
                    <Button 
                      onClick={handleCreateIncident}
                      className="hover:bg-slate-700 hover:text-white transition-colors"
                    >
                      Registrar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">ID</th>
                  <th className="text-left py-3">Serviço</th>
                  <th className="text-left py-3">Descrição</th>
                  <th className="text-center py-3">Severidade</th>
                  <th className="text-center py-3">Status</th>
                  <th className="text-center py-3">Criado em</th>
                  <th className="text-center py-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {incidents.map((incident) => (
                  <tr key={incident.id} className="border-b hover:bg-gray-50">
                    <td className="py-3">#{incident.id}</td>
                    <td className="py-3">{incident.service}</td>
                    <td className="py-3 max-w-xs truncate">{incident.description}</td>
                    <td className="text-center py-3">
                      <Badge className={getSeverityBadge(incident.severity)}>
                        {getSeverityLabel(incident.severity)}
                      </Badge>
                    </td>
                    <td className="text-center py-3">
                      <Badge variant="outline">
                        {incident.status === 'open' ? 'Aberto' : 
                         incident.status === 'investigating' ? 'Investigando' : 'Resolvido'}
                      </Badge>
                    </td>
                    <td className="text-center py-3 text-sm">{incident.created}</td>
                    <td className="text-center py-3">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="hover:bg-slate-700 hover:text-white transition-colors"
                      >
                        <Settings className="w-4 h-4 mr-1" />
                        Gerenciar
                      </Button>
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

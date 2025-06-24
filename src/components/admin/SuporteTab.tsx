
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TicketManager } from './TicketManager';

interface Ticket {
  id: number;
  lojista: string;
  subject: string;
  category: string;
  status: string;
  created: string;
  priority: string;
}

interface SuporteTabProps {
  tickets: Ticket[];
}

export function SuporteTab({ tickets }: SuporteTabProps) {
  const getStatusBadge = (status: string) => {
    const styles = {
      open: 'bg-red-100 text-red-700',
      in_progress: 'bg-yellow-100 text-yellow-700',
      resolved: 'bg-green-100 text-green-700'
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-700';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      open: 'Aberto',
      in_progress: 'Em Andamento',
      resolved: 'Resolvido'
    };
    return labels[status as keyof typeof labels] || status;
  };

  return (
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
  );
}

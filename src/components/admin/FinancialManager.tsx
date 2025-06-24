
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle, CheckCircle, XCircle, DollarSign, Calendar } from 'lucide-react';

interface Invoice {
  id: number;
  lojista: string;
  valor: string;
  vencimento: string;
  status: 'vencida' | 'pendente' | 'paga';
  dias_vencido: number;
}

interface Payment {
  id: number;
  lojista: string;
  valor: string;
  data: string;
  forma: string;
  status: 'pendente' | 'aprovado' | 'rejeitado';
}

export function FinancialManager() {
  const [invoices] = useState<Invoice[]>([
    {
      id: 1,
      lojista: 'João Silva',
      valor: 'R$ 97,00',
      vencimento: '2024-06-20',
      status: 'vencida',
      dias_vencido: 4
    },
    {
      id: 2,
      lojista: 'Maria Santos',
      valor: 'R$ 197,00',
      vencimento: '2024-06-22',
      status: 'vencida',
      dias_vencido: 2
    },
    {
      id: 3,
      lojista: 'Pedro Costa',
      valor: 'R$ 97,00',
      vencimento: '2024-06-25',
      status: 'pendente',
      dias_vencido: 0
    }
  ]);

  const [payments] = useState<Payment[]>([
    {
      id: 1,
      lojista: 'Ana Paula',
      valor: 'R$ 97,00',
      data: '2024-06-24',
      forma: 'PIX',
      status: 'pendente'
    },
    {
      id: 2,
      lojista: 'Carlos Lima',
      valor: 'R$ 197,00',
      data: '2024-06-23',
      forma: 'Transferência',
      status: 'pendente'
    }
  ]);

  const [rejectionReason, setRejectionReason] = useState('');
  const { toast } = useToast();

  const handleApprovePayment = (paymentId: number) => {
    toast({
      title: "Pagamento aprovado",
      description: "O pagamento foi aprovado com sucesso."
    });
  };

  const handleRejectPayment = (paymentId: number, reason: string) => {
    if (!reason.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, informe a justificativa para rejeição.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Pagamento rejeitado",
      description: "O pagamento foi rejeitado com a justificativa fornecida."
    });
    setRejectionReason('');
  };

  const getInvoiceStatusBadge = (status: string) => {
    const styles = {
      vencida: 'bg-red-100 text-red-700',
      pendente: 'bg-yellow-100 text-yellow-700',
      paga: 'bg-green-100 text-green-700'
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-700';
  };

  const getPaymentStatusBadge = (status: string) => {
    const styles = {
      pendente: 'bg-yellow-100 text-yellow-700',
      aprovado: 'bg-green-100 text-green-700',
      rejeitado: 'bg-red-100 text-red-700'
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      {/* Faturas Vencidas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Faturas Vencidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Lojista</th>
                  <th className="text-center py-3">Valor</th>
                  <th className="text-center py-3">Vencimento</th>
                  <th className="text-center py-3">Dias em Atraso</th>
                  <th className="text-center py-3">Status</th>
                  <th className="text-center py-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b hover:bg-gray-50">
                    <td className="py-3">{invoice.lojista}</td>
                    <td className="text-center py-3 font-semibold">{invoice.valor}</td>
                    <td className="text-center py-3">{invoice.vencimento}</td>
                    <td className="text-center py-3">
                      {invoice.dias_vencido > 0 ? (
                        <span className="text-red-600 font-medium">
                          {invoice.dias_vencido} dias
                        </span>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                    <td className="text-center py-3">
                      <Badge className={getInvoiceStatusBadge(invoice.status)}>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="text-center py-3">
                      <div className="flex justify-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="hover:bg-slate-700 hover:text-white transition-colors"
                        >
                          <Calendar className="w-4 h-4 mr-1" />
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

      {/* Aprovação de Pagamentos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            Pagamentos Pendentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Lojista</th>
                  <th className="text-center py-3">Valor</th>
                  <th className="text-center py-3">Data</th>
                  <th className="text-center py-3">Forma de Pagamento</th>
                  <th className="text-center py-3">Status</th>
                  <th className="text-center py-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-gray-50">
                    <td className="py-3">{payment.lojista}</td>
                    <td className="text-center py-3 font-semibold">{payment.valor}</td>
                    <td className="text-center py-3">{payment.data}</td>
                    <td className="text-center py-3">{payment.forma}</td>
                    <td className="text-center py-3">
                      <Badge className={getPaymentStatusBadge(payment.status)}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="text-center py-3">
                      <div className="flex justify-center gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleApprovePayment(payment.id)}
                          className="bg-green-600 hover:bg-slate-700 hover:text-white transition-colors"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Aprovar
                        </Button>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="hover:bg-slate-700 hover:text-white transition-colors"
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Rejeitar
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Rejeitar Pagamento</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <p>
                                Rejeitar pagamento de <strong>{payment.lojista}</strong> no valor de <strong>{payment.valor}</strong>?
                              </p>
                              <div>
                                <label className="block text-sm font-medium mb-2">
                                  Justificativa (obrigatório):
                                </label>
                                <Textarea
                                  value={rejectionReason}
                                  onChange={(e) => setRejectionReason(e.target.value)}
                                  placeholder="Informe o motivo da rejeição..."
                                  rows={3}
                                />
                              </div>
                              <div className="flex justify-end gap-2">
                                <Button variant="outline">
                                  Cancelar
                                </Button>
                                <Button
                                  onClick={() => handleRejectPayment(payment.id, rejectionReason)}
                                  variant="destructive"
                                  className="hover:bg-slate-700 hover:text-white transition-colors"
                                >
                                  Confirmar Rejeição
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
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

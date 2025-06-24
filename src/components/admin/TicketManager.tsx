
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Plus, Upload, Send, CheckCircle } from 'lucide-react';

interface Ticket {
  id: number;
  lojista: string;
  subject: string;
  category: string;
  status: string;
  created: string;
  priority: string;
  description?: string;
}

interface TicketManagerProps {
  ticket?: Ticket;
  onUpdate?: (id: number, data: any) => void;
  isNew?: boolean;
}

export function TicketManager({ ticket, onUpdate, isNew = false }: TicketManagerProps) {
  const [formData, setFormData] = useState({
    lojista: ticket?.lojista || '',
    subject: ticket?.subject || '',
    category: ticket?.category || '',
    priority: ticket?.priority || 'medium',
    description: ticket?.description || '',
    response: ''
  });
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const { toast } = useToast();

  const handleSave = () => {
    if (isNew) {
      toast({
        title: "Ticket criado",
        description: "Novo ticket foi criado com sucesso."
      });
    } else if (onUpdate) {
      onUpdate(ticket!.id, { ...ticket, ...formData });
      toast({
        title: "Ticket atualizado",
        description: "As informações do ticket foram atualizadas."
      });
    }
  };

  const handleStatusChange = (newStatus: string) => {
    if (onUpdate) {
      onUpdate(ticket!.id, { ...ticket, status: newStatus });
      toast({
        title: "Status alterado",
        description: `Ticket marcado como ${getStatusLabel(newStatus)}.`
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
  };

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
    <Dialog>
      <DialogTrigger asChild>
        {isNew ? (
          <Button className="hover:bg-slate-700 hover:text-white transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Novo Ticket
          </Button>
        ) : (
          <Button 
            size="sm" 
            variant="outline"
            className="hover:bg-slate-700 hover:text-white transition-colors"
          >
            <MessageSquare className="w-4 h-4 mr-1" />
            Gerenciar
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            {isNew ? 'Novo Ticket' : `Ticket #${ticket?.id}`}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Status e Prioridade */}
          {!isNew && (
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Badge className={getStatusBadge(ticket!.status)}>
                  {getStatusLabel(ticket!.status)}
                </Badge>
                <span className="text-sm text-gray-600">
                  Criado em: {ticket!.created}
                </span>
              </div>
              <div className="flex gap-2">
                <Select onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Alterar status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Aberto</SelectItem>
                    <SelectItem value="in_progress">Em Andamento</SelectItem>
                    <SelectItem value="resolved">Resolvido</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  size="sm"
                  onClick={() => handleStatusChange('resolved')}
                  className="hover:bg-slate-700 hover:text-white transition-colors"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Resolver
                </Button>
              </div>
            </div>
          )}

          {/* Formulário */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Lojista</Label>
              <Input
                value={formData.lojista}
                onChange={(e) => setFormData({ ...formData, lojista: e.target.value })}
                disabled={!isNew}
              />
            </div>
            <div>
              <Label>Categoria</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Técnico">Técnico</SelectItem>
                  <SelectItem value="Financeiro">Financeiro</SelectItem>
                  <SelectItem value="Comercial">Comercial</SelectItem>
                  <SelectItem value="Suporte">Suporte</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <Label>Assunto</Label>
              <Input
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>
            <div>
              <Label>Prioridade</Label>
              <Select 
                value={formData.priority} 
                onValueChange={(value) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baixa</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Anexos</Label>
              <div className="relative">
                <Input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('file-upload')?.click()}
                  className="w-full hover:bg-slate-700 hover:text-white transition-colors"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Anexar Arquivos
                </Button>
              </div>
              {selectedFiles && (
                <div className="mt-2 text-sm text-gray-600">
                  {selectedFiles.length} arquivo(s) selecionado(s)
                </div>
              )}
            </div>
          </div>

          {/* Editor de Resposta */}
          <div>
            <Label>
              {isNew ? 'Descrição' : 'Resposta ao Ticket'}
            </Label>
            <Textarea
              value={isNew ? formData.description : formData.response}
              onChange={(e) => setFormData({ 
                ...formData, 
                [isNew ? 'description' : 'response']: e.target.value 
              })}
              placeholder="Digite aqui... Suporte a formatação: **negrito**, *itálico*, • listas"
              rows={6}
              className="mt-1"
            />
            <div className="mt-2 text-xs text-gray-500">
              Formatação suportada: **negrito**, *itálico*, • item de lista
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button 
              onClick={handleSave}
              className="hover:bg-slate-700 hover:text-white transition-colors"
            >
              <Send className="w-4 h-4 mr-1" />
              {isNew ? 'Criar Ticket' : 'Enviar Resposta'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

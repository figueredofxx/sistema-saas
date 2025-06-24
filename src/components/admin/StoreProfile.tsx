
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { User, Edit, Power, LogIn } from 'lucide-react';

interface StoreProfileProps {
  lojista: {
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
  };
  onUpdate: (id: number, data: any) => void;
}

export function StoreProfile({ lojista, onUpdate }: StoreProfileProps) {
  const [editData, setEditData] = useState({
    name: lojista.name,
    store: lojista.store,
    email: lojista.email || '',
    phone: lojista.phone || ''
  });
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    onUpdate(lojista.id, editData);
    toast({
      title: "Dados atualizados",
      description: "As informações do lojista foram atualizadas com sucesso."
    });
  };

  const handleToggleStatus = () => {
    const newStatus = lojista.status === 'active' ? 'expired' : 'active';
    onUpdate(lojista.id, { ...lojista, status: newStatus });
    setShowConfirmDialog(false);
    toast({
      title: `Lojista ${newStatus === 'active' ? 'ativado' : 'inativado'}`,
      description: `O cadastro foi ${newStatus === 'active' ? 'ativado' : 'inativado'} com sucesso.`
    });
  };

  const handleLoginAs = () => {
    toast({
      title: "Login realizado",
      description: `Logado como ${lojista.name} com sucesso.`
    });
  };

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
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          size="sm" 
          variant="outline"
          className="hover:bg-gray-900 hover:text-white transition-colors"
        >
          <User className="w-4 h-4 mr-1" />
          Perfil
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Perfil do Lojista
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Status e Ações */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-900 hover:text-white transition-colors group">
            <div className="flex items-center gap-3">
              <Badge className={getStatusBadge(lojista.status)}>
                {getStatusLabel(lojista.status)}
              </Badge>
              <span className="text-sm text-gray-600 group-hover:text-gray-300">CNPJ: {lojista.cnpj}</span>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleLoginAs}
                className="hover:bg-gray-900 hover:text-white transition-colors"
              >
                <LogIn className="w-4 h-4 mr-1" />
                Login como
              </Button>
              <Button
                size="sm"
                variant={lojista.status === 'active' ? 'destructive' : 'default'}
                onClick={() => setShowConfirmDialog(true)}
                className="hover:bg-gray-900 hover:text-white transition-colors"
              >
                <Power className="w-4 h-4 mr-1" />
                {lojista.status === 'active' ? 'Inativar' : 'Ativar'}
              </Button>
            </div>
          </div>

          {/* Formulário de Edição */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Nome do Lojista</Label>
              <Input
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                className="hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white transition-colors"
              />
            </div>
            <div>
              <Label>Nome da Loja</Label>
              <Input
                value={editData.store}
                onChange={(e) => setEditData({ ...editData, store: e.target.value })}
                className="hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white transition-colors"
              />
            </div>
            <div>
              <Label>E-mail</Label>
              <Input
                type="email"
                value={editData.email}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                className="hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white transition-colors"
              />
            </div>
            <div>
              <Label>Telefone</Label>
              <Input
                value={editData.phone}
                onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                className="hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white transition-colors"
              />
            </div>
          </div>

          {/* Informações adicionais */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-900 hover:text-white transition-colors group">
            <div>
              <Label className="text-sm text-gray-600 group-hover:text-gray-300">Plano</Label>
              <p className="font-medium">{lojista.plan === 'single' ? 'Loja Única' : 'Multiloja'}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600 group-hover:text-gray-300">Último Acesso</Label>
              <p className="font-medium">{lojista.lastLogin}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600 group-hover:text-gray-300">Receita</Label>
              <p className="font-medium text-green-600 group-hover:text-green-300">{lojista.revenue}</p>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button 
              onClick={handleSave}
              className="hover:bg-gray-900 hover:text-white transition-colors"
            >
              <Edit className="w-4 h-4 mr-1" />
              Salvar Alterações
            </Button>
          </div>
        </div>
      </DialogContent>

      {/* Modal de Confirmação */}
      {showConfirmDialog && (
        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent className="hover:bg-gray-900 hover:text-white transition-colors">
            <DialogHeader>
              <DialogTitle>Confirmar Ação</DialogTitle>
            </DialogHeader>
            <p>
              Tem certeza que deseja {lojista.status === 'active' ? 'inativar' : 'ativar'} o cadastro de {lojista.name}?
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowConfirmDialog(false)}
                className="hover:bg-gray-900 hover:text-white transition-colors"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleToggleStatus}
                className="hover:bg-gray-900 hover:text-white transition-colors"
              >
                Confirmar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  );
}

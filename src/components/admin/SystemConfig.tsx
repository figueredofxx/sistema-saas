
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Settings, Upload, Save, Image } from 'lucide-react';

export function SystemConfig() {
  const [config, setConfig] = useState({
    companyName: 'SaaS Platform',
    slogan: 'Solução completa para seu negócio',
    email: 'contato@saasplatform.com',
    phone: '(11) 99999-9999',
    address: 'Rua das Empresas, 123 - São Paulo, SP',
    logo: null as File | null
  });

  const { toast } = useToast();

  const handleSaveConfig = () => {
    toast({
      title: "Configurações salvas",
      description: "As configurações do sistema foram atualizadas com sucesso."
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setConfig({ ...config, logo: file });
      toast({
        title: "Logo selecionado",
        description: `Arquivo ${file.name} foi selecionado.`
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-600" />
            Configurações Gerais do Sistema
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Logo da Empresa */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Identidade Visual</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Logo da Empresa</Label>
                <div className="mt-2">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <Image className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        {config.logo ? config.logo.name : 'Clique para fazer upload do logo'}
                      </p>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                        id="logo-upload"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('logo-upload')?.click()}
                        className="hover:bg-slate-700 hover:text-white transition-colors"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Selecionar Arquivo
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label>Nome da Empresa</Label>
                  <Input
                    value={config.companyName}
                    onChange={(e) => setConfig({ ...config, companyName: e.target.value })}
                    placeholder="Nome da sua empresa"
                  />
                </div>
                <div>
                  <Label>Slogan</Label>
                  <Input
                    value={config.slogan}
                    onChange={(e) => setConfig({ ...config, slogan: e.target.value })}
                    placeholder="Slogan da empresa"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Informações de Contato */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Informações de Contato</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>E-mail de Contato</Label>
                <Input
                  type="email"
                  value={config.email}
                  onChange={(e) => setConfig({ ...config, email: e.target.value })}
                  placeholder="contato@empresa.com"
                />
              </div>
              <div>
                <Label>Telefone</Label>
                <Input
                  value={config.phone}
                  onChange={(e) => setConfig({ ...config, phone: e.target.value })}
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>
            <div>
              <Label>Endereço</Label>
              <Textarea
                value={config.address}
                onChange={(e) => setConfig({ ...config, address: e.target.value })}
                placeholder="Endereço completo da empresa"
                rows={3}
              />
            </div>
          </div>

          {/* Configurações de Sistema */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Configurações de Sistema</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="hover:bg-slate-700 hover:text-white transition-colors cursor-pointer">
                <CardContent className="p-4 text-center">
                  <Settings className="w-8 h-8 mx-auto mb-2" />
                  <h3 className="font-medium">Notificações</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Configurar alertas e notificações
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:bg-slate-700 hover:text-white transition-colors cursor-pointer">
                <CardContent className="p-4 text-center">
                  <Settings className="w-8 h-8 mx-auto mb-2" />
                  <h3 className="font-medium">Integrações</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    APIs e serviços externos
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:bg-slate-700 hover:text-white transition-colors cursor-pointer">
                <CardContent className="p-4 text-center">
                  <Settings className="w-8 h-8 mx-auto mb-2" />
                  <h3 className="font-medium">Segurança</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Políticas e permissões
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Botão de Salvar */}
          <div className="flex justify-end pt-4 border-t">
            <Button 
              onClick={handleSaveConfig}
              className="hover:bg-slate-700 hover:text-white transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar Configurações
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

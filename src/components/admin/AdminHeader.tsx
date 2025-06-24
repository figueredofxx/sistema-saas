
import { Button } from '@/components/ui/button';
import { Download, Settings } from 'lucide-react';

export function AdminHeader() {
  return (
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
  );
}

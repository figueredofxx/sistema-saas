
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function SubscriptionExpired() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <Clock className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl">Assinatura Expirada</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-gray-600">
            Seu período de teste gratuito expirou. Para continuar usando todas as funcionalidades do sistema, escolha um plano que atenda às suas necessidades.
          </p>
          
          <div className="space-y-3">
            <Button 
              className="w-full bg-orange-600 hover:bg-orange-700"
              onClick={() => navigate('/subscription')}
            >
              <Crown className="w-4 h-4 mr-2" />
              Ver Planos e Assinar
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                logout();
                navigate('/login');
              }}
            >
              Fazer Logout
            </Button>
          </div>
          
          <div className="text-sm text-gray-500">
            <p>Dúvidas? Entre em contato conosco:</p>
            <p className="font-medium">suporte@apexcomercio.com</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

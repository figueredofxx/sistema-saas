import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function TrialCounter() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user || user.subscriptionPlan !== 'trial') {
    return null;
  }

  const daysLeft = user.trialDaysLeft || 0;
  const isExpiringSoon = daysLeft <= 2;

  return (
    <div className={`p-3 rounded-lg border ${isExpiringSoon ? 'bg-red-50 border-red-200' : 'bg-purple-50 border-purple-200'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Clock className={`w-4 h-4 ${isExpiringSoon ? 'text-red-600' : 'text-purple-600'}`} />
          <span className={`text-sm font-medium ${isExpiringSoon ? 'text-red-700' : 'text-purple-700'}`}>
            Teste gratuito: {daysLeft} {daysLeft === 1 ? 'dia restante' : 'dias restantes'}
          </span>
        </div>
        <Button 
          size="sm" 
          className="bg-purple-600 hover:bg-purple-700"
          onClick={() => navigate('/subscription')}
        >
          <Crown className="w-4 h-4 mr-1" />
          Assinar
        </Button>
      </div>
    </div>
  );
}
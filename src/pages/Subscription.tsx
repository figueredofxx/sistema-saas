
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Store, Building2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function Subscription() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<'single' | 'multi' | null>(null);

  const plans = [
    {
      id: 'single' as const,
      name: 'Loja Única',
      price: 'R$ 79,90',
      period: '/mês',
      icon: Store,
      color: 'bg-blue-600',
      description: 'Perfeito para uma loja',
      features: [
        'PDV completo',
        'Controle de estoque',
        'Gestão financeira',
        'Relatórios básicos',
        'Suporte por email',
        'Uma loja'
      ]
    },
    {
      id: 'multi' as const,
      name: 'Multiloja',
      price: 'R$ 149,90',
      period: '/mês',
      icon: Building2,
      color: 'bg-orange-600',
      popular: true,
      description: 'Para múltiplas unidades',
      features: [
        'Tudo do plano Loja Única',
        'Múltiplas lojas',
        'Transferência entre lojas',
        'Relatórios consolidados',
        'Dashboard gerencial',
        'Suporte prioritário',
        'Gestão centralizada'
      ]
    }
  ];

  const handleSubscribe = (planId: 'single' | 'multi') => {
    setSelectedPlan(planId);
    // Aqui integraria com gateway de pagamento
    toast({
      title: "Redirecionando para pagamento",
      description: "Você será redirecionado para finalizar a assinatura"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Escolha seu plano
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Selecione o plano ideal para o crescimento do seu negócio
          </p>
          
          {user?.subscriptionPlan === 'trial' && (
            <div className="mt-6 inline-flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-lg">
              <Crown className="w-5 h-5 mr-2" />
              Você tem {user.trialDaysLeft} dias restantes no seu teste gratuito
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card key={plan.id} className={`relative ${plan.popular ? 'ring-2 ring-orange-600' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-orange-600 text-white px-4 py-1">
                      Mais Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${plan.color} text-white mx-auto mb-4`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <p className="text-gray-600">{plan.description}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-orange-600 hover:bg-orange-700' : 'bg-gray-900 hover:bg-gray-800'}`}
                    onClick={() => handleSubscribe(plan.id)}
                  >
                    Assinar {plan.name}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Ainda com dúvidas? Entre em contato conosco!
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <span>✓ Suporte técnico incluído</span>
            <span>✓ Atualizações gratuitas</span>
            <span>✓ Cancele quando quiser</span>
          </div>
        </div>
      </div>
    </div>
  );
}

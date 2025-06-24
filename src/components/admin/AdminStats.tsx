
import { Card, CardContent } from '@/components/ui/card';
import { Users, DollarSign, MessageSquare, TrendingUp } from 'lucide-react';

const stats = [
  {
    title: 'Lojistas Ativos',
    value: '1,234',
    change: '+12%',
    icon: Users,
    color: 'text-blue-600'
  },
  {
    title: 'Receita Mensal',
    value: 'R$ 45.678',
    change: '+8%',
    icon: DollarSign,
    color: 'text-green-600'
  },
  {
    title: 'Tickets Abertos',
    value: '23',
    change: '-15%',
    icon: MessageSquare,
    color: 'text-orange-600'
  },
  {
    title: 'Sistema',
    value: '99.9%',
    change: 'Uptime',
    icon: TrendingUp,
    color: 'text-purple-600'
  }
];

export function AdminStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="hover:bg-gray-900 hover:text-white transition-colors cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 group-hover:text-gray-300">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 group-hover:text-white">{stat.value}</p>
                  <p className="text-sm text-green-600 group-hover:text-green-300">{stat.change}</p>
                </div>
                <Icon className={`w-8 h-8 ${stat.color} group-hover:text-white`} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

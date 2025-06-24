import { Card, CardContent } from "@/components/ui/card";

export function QuickStats() {
  const stats = [
    {
      label: "Vendas Hoje",
      value: "25",
      subtitle: "Vendas realizadas",
      color: "bg-purple-500",
    },
    {
      label: "Receita Hoje",
      value: "R$ 3.240",
      subtitle: "Faturamento",
      color: "bg-green-500",
    },
    {
      label: "Produtos",
      value: "1.234",
      subtitle: "Em estoque",
      color: "bg-blue-500",
    },
    {
      label: "Clientes",
      value: "567",
      subtitle: "Cadastrados",
      color: "bg-orange-500",
    },
    {
      label: "Ticket Médio",
      value: "R$ 129,60",
      subtitle: "Por venda",
      color: "bg-indigo-500",
    },
    {
      label: "Meta Mensal",
      value: "78%",
      subtitle: "Atingida",
      color: "bg-pink-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
              <div className="flex-1">
                <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
                <p className="font-bold text-gray-900">{stat.value}</p>
                {stat.subtitle && (
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
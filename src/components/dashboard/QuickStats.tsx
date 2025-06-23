
import { Card, CardContent } from "@/components/ui/card";

export function QuickStats() {
  const stats = [
    {
      label: "Cartão de Crédito Visa",
      value: "R$ 2.709,00",
      subtitle: "Taxa: R$ 105,36",
      color: "bg-blue-500",
    },
    {
      label: "Pix Nubank",
      value: "R$ 6.078,90",
      subtitle: "",
      color: "bg-purple-500",
    },
    {
      label: "Cartão Master",
      value: "R$ 5.378,00",
      subtitle: "Taxa: R$ 71,77",
      color: "bg-orange-500",
    },
    {
      label: "Crediário",
      value: "R$ 2.899,00",
      subtitle: "",
      color: "bg-green-500",
    },
    {
      label: "Dinheiro",
      value: "R$ 5.048,00",
      subtitle: "",
      color: "bg-emerald-500",
    },
    {
      label: "Cartão de débito",
      value: "R$ 539,00",
      subtitle: "Taxa: R$ 16,17",
      color: "bg-gray-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
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

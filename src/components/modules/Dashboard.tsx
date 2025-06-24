
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SalesChart } from "@/components/charts/SalesChart";
import { SalesPieChart } from "@/components/charts/PieChart";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { QuickStats } from "@/components/dashboard/QuickStats";

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sistema ERP SaaS</h1>
          <p className="text-gray-600">Visão geral do seu negócio</p>
        </div>
      </div>

      {/* Quick Stats */}
      <QuickStats />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card className="md3-elevated-card">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900">
              <div className="w-2 h-2 bg-violet-500 rounded-full mr-3"></div>
              Total de Vendas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">25 Vendas</p>
                  <p className="text-2xl font-bold text-gray-900">R$ 32.973,40</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ticket Médio</p>
                  <p className="text-2xl font-bold text-gray-900">R$ 1.318,94</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Lucro (R$)</p>
                  <p className="text-xl font-bold text-gray-900">R$ 11.764,21</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Lucro (%)</p>
                  <p className="text-xl font-bold text-violet-600">35,68 %</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sales Pie Chart */}
        <Card className="md3-elevated-card">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900">
              <div className="w-2 h-2 bg-violet-500 rounded-full mr-3"></div>
              Resumo de Vendas do Dia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SalesPieChart />
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sellers Performance */}
        <Card className="md3-elevated-card">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900">
              <div className="w-2 h-2 bg-violet-500 rounded-full mr-3"></div>
              Vendedores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Ronei</span>
                <span className="font-bold text-violet-600">R$ 26.881,80</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Sem vendedor</span>
                <span className="font-bold text-gray-900">R$ 713,60</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Ronei Vendedor 3</span>
                <span className="font-bold text-gray-900">R$ 5.378,00</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <RecentTransactions />
      </div>
    </div>
  );
}

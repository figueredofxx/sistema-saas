import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SalesChart } from "@/components/charts/SalesChart";
import { SalesPieChart } from "@/components/charts/PieChart";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";

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

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Vendas Hoje</p>
                <p className="text-2xl font-bold text-gray-900">25</p>
                <p className="text-sm text-green-600">+12% vs ontem</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 text-xl">📊</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Receita Hoje</p>
                <p className="text-2xl font-bold text-gray-900">R$ 3.240</p>
                <p className="text-sm text-green-600">+8% vs ontem</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-xl">💰</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Produtos</p>
                <p className="text-2xl font-bold text-gray-900">1.234</p>
                <p className="text-sm text-gray-600">Em estoque</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xl">📦</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Clientes</p>
                <p className="text-2xl font-bold text-gray-900">567</p>
                <p className="text-sm text-gray-600">Cadastrados</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 text-xl">👥</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
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
                  <p className="text-xl font-bold text-purple-600">35,68 %</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sales Pie Chart */}
        <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
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
        <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              Vendedores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Ronei</span>
                <span className="font-bold text-purple-600">R$ 26.881,80</span>
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
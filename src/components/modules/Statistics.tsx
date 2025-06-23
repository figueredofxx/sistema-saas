
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SalesChart } from "@/components/charts/SalesChart";

export function Statistics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Estatísticas Detalhadas</h1>
        <p className="text-gray-600">Análise completa do desempenho da sua loja</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Vendas este mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-3xl font-bold text-gray-900">R$ 32.000,00</p>
              <p className="text-sm text-emerald-600">+12% vs mês anterior</p>
            </div>
            <SalesChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vendas por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Audio e Vídeo Portáteis</p>
                  <p className="text-sm text-gray-600">Lucro: R$ 23,55</p>
                </div>
                <p className="font-bold">R$ 48,55</p>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Celulares e Comunicação</p>
                  <p className="text-sm text-gray-600">Lucro: R$ 197,55</p>
                </div>
                <p className="font-bold">R$ 1.407,25</p>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Wearables</p>
                  <p className="text-sm text-gray-600">Lucro: R$ 7.526,00</p>
                </div>
                <p className="font-bold">R$ 21.516,00</p>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Iphones</p>
                  <p className="text-sm text-gray-600">Lucro: R$ 1.500,00</p>
                </div>
                <p className="font-bold">R$ 4.000,00</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

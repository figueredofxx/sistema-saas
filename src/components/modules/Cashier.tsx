
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Cashier() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Caixa</h1>
          <p className="text-gray-600">Controle financeiro e movimentações</p>
        </div>
        <Badge className="bg-emerald-100 text-emerald-700 text-lg px-4 py-2">
          Caixa Aberto!
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Saldo do Caixa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-4xl font-bold text-gray-900 mb-2">12.415,00</p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Entradas</p>
                  <p className="text-xl font-bold text-emerald-600">R$ 15.234,00</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Saídas</p>
                  <p className="text-xl font-bold text-red-600">R$ 2.819,00</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status do Caixa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center">
                  <div className="text-emerald-500 text-3xl">💰</div>
                </div>
              </div>
              <div className="text-center">
                <p className="font-bold text-gray-900 text-lg">Caixa Aberto!</p>
                <p className="text-sm text-gray-600 mt-2">Horário de abertura: 08:30</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

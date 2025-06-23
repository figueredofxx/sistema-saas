
export function PaymentMethodChart() {
  const paymentMethods = [
    { name: "Dinheiro", amount: "R$ 8.222,00", percentage: 35, color: "bg-emerald-500" },
    { name: "Pix", amount: "R$ 1.019,00", percentage: 15, color: "bg-purple-500" },
    { name: "Cartão crédito", amount: "R$ 1.055,00", percentage: 20, color: "bg-blue-500" },
    { name: "Cartão débito", amount: "R$ 2.119,00", percentage: 30, color: "bg-emerald-600" },
  ];

  return (
    <div className="space-y-4">
      {/* Donut Chart Representation */}
      <div className="flex justify-center mb-6">
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 rounded-full border-8 border-emerald-500" style={{ 
            background: `conic-gradient(#10b981 0% 35%, #8b5cf6 35% 50%, #3b82f6 50% 70%, #059669 70% 100%)` 
          }}></div>
          <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">12.415,00</p>
              <p className="text-xs text-gray-600">Saldo do caixa</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods List */}
      <div className="space-y-3">
        {paymentMethods.map((method, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${method.color}`}></div>
              <span className="text-sm text-gray-600">{method.name}</span>
            </div>
            <span className="font-medium text-gray-900">{method.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

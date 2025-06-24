
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Vendas Online', value: 2400, color: '#8B5CF6' },
  { name: 'Vendas Presencial', value: 4567, color: '#C4B5FD' },
  { name: 'Vendas Delivery', value: 1398, color: '#A855F7' },
  { name: 'Vendas WhatsApp', value: 980, color: '#DDD6FE' },
];

export function SalesPieChart() {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`R$ ${value.toLocaleString()}`, 'Vendas']}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

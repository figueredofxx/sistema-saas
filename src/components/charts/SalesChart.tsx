
export function SalesChart() {
  return (
    <div className="h-64 flex items-end justify-center space-x-2 p-4">
      {/* Simple bar chart representation */}
      {[20, 40, 30, 60, 80, 45, 70, 85, 65, 90, 75, 95].map((height, index) => (
        <div
          key={index}
          className="bg-emerald-500 rounded-t-sm w-6 transition-all hover:bg-emerald-600"
          style={{ height: `${height}%` }}
        ></div>
      ))}
    </div>
  );
}
